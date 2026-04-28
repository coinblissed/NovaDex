import React, { useState } from "react";
import { ArrowDown, Info, Loader2, Droplets, ExternalLink, CheckCircle2, AlertTriangle, Zap, Coins } from "lucide-react";
import { useSwap } from "../hooks/useSwap";
import { useWallet } from "../hooks/useWallet";
import { mintTestTokens, establishTrustline } from "../utils/faucet";

export const SwapCard: React.FC = () => {
  const { isConnected, connectWallet, publicKey, signTransaction } = useWallet();
  const {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    balanceIn,
    balanceOut,
    quote,
    isQuoteLoading,
    txStatus,
    setAmountIn,
    switchTokens,
    executeSwap,
    fetchBalances
  } = useSwap();

  const [faucetLoading, setFaucetLoading] = useState(false);

  const onFaucet = async () => {
    if (!publicKey) return;
    setFaucetLoading(true);
    try {
      const { needsTrustline } = await mintTestTokens(publicKey, signTransaction);
      if (needsTrustline) {
        if (confirm("You need to establish a trustline for SDKE. Proceed?")) {
          await establishTrustline(publicKey, signTransaction);
          await mintTestTokens(publicKey, signTransaction);
        }
      }
      fetchBalances();
    } catch (e) {
      console.error(e);
      alert("Faucet failed. Make sure your account is funded with XLM.");
    } finally {
      setFaucetLoading(false);
    }
  };



  return (
    <div className="crystal rounded-2xl p-6 border border-zinc-800 bg-zinc-900/30">
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Exchange Assets</span>
          </div>
          <button 
            onClick={switchTokens}
            className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl transition-all duration-200"
          >
            <Zap className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        {/* Input Sections */}
        <div className="space-y-3">
          {/* FROM */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 transition-all focus-within:border-zinc-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">You Pay</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-zinc-500">Balance: <span className="text-zinc-300 font-mono">{balanceIn}</span></span>
                {isConnected && (
                  <button
                    onClick={onFaucet}
                    disabled={faucetLoading}
                    className="flex items-center gap-1 text-[9px] font-medium text-zinc-400 hover:text-white transition-colors disabled:opacity-30 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 rounded-md bg-zinc-900"
                  >
                    {faucetLoading ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Droplets className="w-2.5 h-2.5" />}
                    Faucet
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                placeholder="0.00"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full placeholder:text-zinc-800 tracking-tight"
              />
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <div className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] text-zinc-950 bg-white">
                  {tokenIn.symbol[0]}
                </div>
                <span className="font-semibold text-xs tracking-wider text-zinc-200">{tokenIn.symbol}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center -my-5 relative z-20">
            <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors duration-200 cursor-pointer" onClick={switchTokens}>
              <ArrowDown className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          {/* TO */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 transition-all focus-within:border-zinc-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">You Receive (Est)</span>
              <span className="text-[10px] font-medium text-zinc-500">Balance: <span className="text-zinc-300 font-mono">{balanceOut}</span></span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountOut}
                  readOnly
                  className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full cursor-default placeholder:text-zinc-800 tracking-tight"
                />
                {isQuoteLoading && (
                  <div className="absolute left-0 top-0 w-24 h-full bg-zinc-800/20 animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <div className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] text-zinc-950 bg-white">
                  {tokenOut.symbol[0]}
                </div>
                <span className="font-semibold text-xs tracking-wider text-zinc-200">{tokenOut.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Intelligence */}
        {quote && (
          <div className="bg-zinc-950/50 rounded-xl p-4 space-y-2 border border-zinc-800">
            {[
              ["Execution Rate", parseFloat(quote.executionPrice) > 0 
                ? `1 ${tokenIn.symbol} = ${quote.executionPrice} ${tokenOut.symbol}`
                : "Empty Pool"],
              ["Price Impact", quote.priceImpactPercent],
              ["Liquidity Fee", `${quote.feePaid} ${tokenIn.symbol}`],
              ["Min. Received", `${quote.minimumReceived} ${tokenOut.symbol}`],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 flex items-center gap-1 uppercase tracking-widest text-[9px]">
                  {label} {label === "Price Impact" && <Info className="w-3 h-3 opacity-50 text-zinc-400" />}
                </span>
                <span className="font-mono text-zinc-300 font-medium">
                  {String(value)}
                </span>
              </div>
            ))}
            {parseFloat(quote.executionPrice) === 0 && (
              <div className="mt-2 p-2 bg-zinc-800 text-[9px] text-zinc-400 text-center font-medium uppercase tracking-wider leading-relaxed border border-zinc-700 rounded-lg">
                ⚠️ Empty Pool! Add liquidity in the pool tab first.
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={isConnected ? executeSwap : connectWallet}
          disabled={isConnected && (!amountIn || isQuoteLoading || txStatus.status === "pending" || !quote)}
          className="btn-nova w-full shadow-none"
        >
          {txStatus.status === "pending" && <Loader2 className="w-4 h-4 animate-spin" />}
          <span className="tracking-wide font-semibold text-xs">
            {!isConnected ? "CONNECT WALLET" : txStatus.status === "pending" ? txStatus.step.toUpperCase() : "EXECUTE SWAP"}
          </span>
        </button>
      </div>

      {/* ── Transaction Intelligence Overlay ── */}
      {txStatus.status !== "idle" && (
        <div className="absolute inset-0 crystal z-50 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
          <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
          
          <div className="relative z-10 w-full flex flex-col items-center">
            {txStatus.status === "pending" && (
              <>
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-zinc-800" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-white border-t-transparent animate-spin" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-1 text-white uppercase">{txStatus.step}</h3>
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest">TRANSMITTING TO MINSWAP NETWORK...</p>
                {txStatus.hash && (
                  <p className="mt-4 text-[10px] text-zinc-400 font-mono bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                    TX: {txStatus.hash.slice(0, 8)}...{txStatus.hash.slice(-8)}
                  </p>
                )}
              </>
            )}

            {txStatus.status === "success" && (
              <>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-2 text-white">SWAP COMPLETE</h3>
                <p className="text-xs text-zinc-400 font-normal max-w-[260px] leading-relaxed mb-8">
                  Your assets have been successfully exchanged. Wallet balances are reflecting the update.
                </p>
                
                <div className="flex flex-col w-full gap-2">
                  {txStatus.explorerUrl && (
                    <a
                      href={txStatus.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-medium tracking-wide hover:bg-zinc-800 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View on Explorer
                    </a>
                  )}
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-nova"
                  >
                    RETURN TO DASHBOARD
                  </button>
                </div>
              </>
            )}

            {txStatus.status === "fail" && (
              <>
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                  <AlertTriangle className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2 text-white">SWAP FAILED</h3>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-8 w-full">
                  <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Reason</p>
                  <p className="text-xs text-zinc-300 font-normal">{txStatus.error?.message || "Contract simulation failed. Check slippage or balance."}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-xs font-medium tracking-wide border border-zinc-800 transition-all"
                >
                  DISMISS & RETRY
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
