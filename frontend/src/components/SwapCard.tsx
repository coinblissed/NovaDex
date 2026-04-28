import React, { useState } from "react";
import { ArrowDown, Info, Loader2, Droplets, ExternalLink, CheckCircle2, AlertTriangle, Zap, Coins } from "lucide-react";
import { useSwap } from "../hooks/useSwap";
import { useWallet } from "../hooks/useWallet";
import { cn } from "../lib/utils";
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
    <div className="crystal rounded-2xl p-8 relative overflow-hidden group border-neutral-800 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Exchange Assets</span>
          </div>
          <button 
            onClick={switchTokens}
            className="p-2.5 bg-[#0a0a0a]/80 hover:bg-white/10 border border-neutral-800 rounded-xl transition-all duration-300"
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Input Sections */}
        <div className="space-y-3">
          {/* FROM */}
          <div className="bg-[#0a0a0a]/60 border border-neutral-800 rounded-xl p-6 transition-all focus-within:border-neutral-700 group/input">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">You Pay</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400">Balance: <span className="text-slate-200 font-mono">{balanceIn}</span></span>
                {isConnected && (
                  <button
                    onClick={onFaucet}
                    disabled={faucetLoading}
                    className="flex items-center gap-1 text-[10px] font-black text-neutral-400 hover:text-white transition-colors disabled:opacity-30 uppercase tracking-widest border border-neutral-800 hover:border-neutral-600 px-2 py-0.5 rounded-md bg-neutral-900/40"
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
                className="bg-transparent text-4xl font-black text-white focus:outline-none w-full placeholder:text-slate-800 tracking-tight"
              />
              <div className="flex items-center gap-2.5 bg-[#141414] pl-2.5 pr-4 py-2 rounded-xl border border-neutral-800 shadow-lg">
                <div className="w-6 h-6 rounded-md shadow-lg flex items-center justify-center font-black text-[10px] text-white bg-neutral-700">
                  {tokenIn.symbol[0]}
                </div>
                <span className="font-black text-xs tracking-wider text-slate-200">{tokenIn.symbol}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center -my-6 relative z-20">
            <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center shadow-none hover:border-white/50 transition-colors duration-300 cursor-pointer" onClick={switchTokens}>
              <ArrowDown className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* TO */}
          <div className="bg-[#0a0a0a]/60 border border-neutral-800 rounded-xl p-6 transition-all focus-within:border-neutral-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">You Receive (Est)</span>
              <span className="text-[10px] font-bold text-slate-400">Balance: <span className="text-slate-200 font-mono">{balanceOut}</span></span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountOut}
                  readOnly
                  className="bg-transparent text-4xl font-black text-white focus:outline-none w-full cursor-default placeholder:text-slate-800 tracking-tight"
                />
              </div>
              <div className="flex items-center gap-2.5 bg-[#141414] pl-2.5 pr-4 py-2 rounded-xl border border-neutral-800 shadow-lg">
                <div className="w-6 h-6 rounded-md shadow-lg flex items-center justify-center font-black text-[10px] text-white bg-neutral-700">
                  {tokenOut.symbol[0]}
                </div>
                <span className="font-black text-xs tracking-wider text-slate-200">{tokenOut.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Intelligence */}
        {quote && (
          <div className="bg-[#050505]/40 rounded-xl p-5 space-y-3 border border-neutral-800 shadow-inner">
            {[
              ["Execution Rate", parseFloat(quote.executionPrice) > 0 
                ? `1 ${tokenIn.symbol} = ${quote.executionPrice} ${tokenOut.symbol}`
                : "Empty Pool"],
              ["Price Impact", quote.priceImpactPercent, quote.isHighImpact],
              ["Liquidity Fee", `${quote.feePaid} ${tokenIn.symbol}`],
              ["Min. Received", `${quote.minimumReceived} ${tokenOut.symbol}`],
            ].map(([label, value, isWarning]) => (
              <div key={String(label)} className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400 flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                  {label} {label === "Price Impact" && <Info className="w-3.5 h-3.5 opacity-50 text-neutral-400" />}
                </span>
                <span className={cn(
                  "font-mono font-black", 
                  isWarning || (label === "Rate" && parseFloat(quote.executionPrice) === 0) ? "text-neutral-400" : "text-white"
                )}>
                  {String(value)}
                </span>
              </div>
            ))}
            {parseFloat(quote.executionPrice) === 0 && (
              <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] text-white text-center font-black uppercase tracking-wider leading-relaxed">
                ⚠️ Empty Pool! Add liquidity in the pool tab first.
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={isConnected ? executeSwap : connectWallet}
          disabled={isConnected && (!amountIn || isQuoteLoading || txStatus.status === "pending" || !quote)}
          className="btn-nova w-full group/btn shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
        >
          {txStatus.status === "pending" && <Loader2 className="w-5 h-5 animate-spin" />}
          <span className="tracking-widest font-black">
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
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full border-[3px] border-primary/20" />
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
                  <Zap className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-2 text-white uppercase">{txStatus.step}</h3>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest animate-pulse">TRANSMITTING TO NOVA NETWORK...</p>
                {txStatus.hash && (
                  <p className="mt-6 text-[10px] text-primary font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    TX: {txStatus.hash.slice(0, 8)}...{txStatus.hash.slice(-8)}
                  </p>
                )}
              </>
            )}

            {txStatus.status === "success" && (
              <>
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-8 border border-success/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 text-white">SWAP COMPLETE</h3>
                <p className="text-sm text-slate-400 font-medium max-w-[280px] leading-relaxed mb-10">
                  Your assets have been successfully exchanged. Wallet balances are reflecting the update.
                </p>
                
                <div className="flex flex-col w-full gap-3">
                  {txStatus.explorerUrl && (
                    <a
                      href={txStatus.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> View on Explorer
                    </a>
                  )}
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-nova !shadow-success/20 !bg-success/80 hover:!bg-success"
                  >
                    RETURN TO DASHBOARD
                  </button>
                </div>
              </>
            )}

            {txStatus.status === "fail" && (
              <>
                <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mb-8 border border-danger/30">
                  <AlertTriangle className="w-10 h-10 text-danger" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-2 text-white">SWAP FAILED</h3>
                <div className="bg-black/40 p-4 rounded-2xl border border-danger/20 mb-10 w-full">
                  <p className="text-[10px] text-danger font-mono uppercase tracking-widest mb-1">Reason</p>
                  <p className="text-xs text-slate-300 font-medium">{txStatus.error?.message || "Contract simulation failed. Check slippage or balance."}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all"
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
