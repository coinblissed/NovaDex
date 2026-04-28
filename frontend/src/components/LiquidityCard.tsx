import React, { useState } from "react";
import { TOKENS } from "../config";
import { Plus, Loader2, CheckCircle2, Droplets, PieChart } from "lucide-react";
import { usePool } from "../hooks/usePool";
import { useWallet } from "../hooks/useWallet";
import { cn } from "../lib/utils";

export const LiquidityCard: React.FC = () => {
  const [tab, setTab] = useState<"add" | "remove">("add");
  const { isConnected, connectWallet } = useWallet();
  const {
    poolStats,
    myPosition,
    txStatus,
    addLiquidity,
    removeLiquidity,
    clearStatus,
  } = usePool();

  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [lpToRemove, setLpToRemove] = useState("");

  const handleAdd = async () => {
    if (!amountA || !amountB) return;
    await addLiquidity(amountA, amountB);
    setAmountA("");
    setAmountB("");
  };

  const handleRemove = async () => {
    if (!lpToRemove) return;
    await removeLiquidity(lpToRemove);
    setLpToRemove("");
  };


  return (
    <div className="crystal rounded-2xl p-6 space-y-6 border border-zinc-800 bg-zinc-900/30">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Pool Management</span>
        </div>
        
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setTab("add")}
            className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider transition-all",
              tab === "add" ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Add
          </button>
          <button
            onClick={() => setTab("remove")}
            className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider transition-all",
              tab === "remove" ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Remove
          </button>
        </div>
      </div>

      {tab === "add" ? (
        <div className="space-y-6">
          <div className="space-y-3">
            {/* Input A */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 transition-all focus-within:border-zinc-700">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-3">Deposit {TOKENS.TOKEN_A.symbol}</p>
              <div className="flex items-center justify-between gap-4">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full placeholder:text-zinc-800"
                />
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <div className="w-3.5 h-3.5 rounded-full bg-white" />
                  <span className="font-semibold text-xs text-zinc-200">{TOKENS.TOKEN_A.symbol}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-5 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                <Plus className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Input B */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 transition-all focus-within:border-zinc-700">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-3">Deposit {TOKENS.TOKEN_B.symbol}</p>
              <div className="flex items-center justify-between gap-4">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full placeholder:text-zinc-800"
                />
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-400" />
                  <span className="font-semibold text-xs text-zinc-200">{TOKENS.TOKEN_B.symbol}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Predicted Share</span>
              <span className="text-white font-medium">
                {poolStats ? "0.01%" : "0.00%"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Current Rate</span>
              <span className="text-zinc-300 font-mono">1 {TOKENS.TOKEN_A.symbol} = {poolStats?.priceAtoB} {TOKENS.TOKEN_B.symbol}</span>
            </div>
          </div>

          <button
            onClick={isConnected ? handleAdd : connectWallet}
            disabled={isConnected && (!amountA || !amountB || txStatus.status === "pending")}
            className="btn-nova w-full shadow-none"
          >
            {txStatus.status === "pending" && <Loader2 className="w-4 h-4 animate-spin" />}
            <span className="tracking-wide font-semibold text-xs">
              {!isConnected ? "CONNECT WALLET" : txStatus.status === "pending" ? "PROCESSING..." : "PROVIDE LIQUIDITY"}
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Withdraw LP Assets</p>
              <span className="text-[10px] font-medium text-zinc-500">Available: <span className="font-mono text-zinc-300">{myPosition?.lpBalance || "0.00"}</span></span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                placeholder="0.00"
                value={lpToRemove}
                onChange={(e) => setLpToRemove(e.target.value)}
                className="bg-transparent text-3xl font-bold text-white focus:outline-none w-full placeholder:text-zinc-800"
              />
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-400" />
                <span className="font-semibold text-xs text-zinc-200">LP TOKENS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="crystal p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
              <p className="text-[9px] text-zinc-500 uppercase font-medium tracking-widest mb-1">Claim {TOKENS.TOKEN_A.symbol}</p>
              <p className="text-lg font-semibold text-white font-mono">0.00</p>
            </div>
            <div className="crystal p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
              <p className="text-[9px] text-zinc-500 uppercase font-medium tracking-widest mb-1">Claim {TOKENS.TOKEN_B.symbol}</p>
              <p className="text-lg font-semibold text-white font-mono">0.00</p>
            </div>
          </div>

          <button
            onClick={isConnected ? handleRemove : connectWallet}
            disabled={isConnected && (!lpToRemove || txStatus.status === "pending")}
            className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-100 border border-zinc-800 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {txStatus.status === "pending" && <Loader2 className="w-4 h-4 animate-spin" />}
            {!isConnected ? "CONNECT WALLET" : "BURN LP ASSETS"}
          </button>
        </div>
      )}

      {/* Stats Divider */}
      <div className="pt-6 border-t border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-3.5 h-3.5 text-zinc-500" />
          <h3 className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Inventory Details</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-500 uppercase font-medium tracking-wider">Total Reserves</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">{TOKENS.TOKEN_A.symbol}</span>
                <span className="text-zinc-200 font-medium">{poolStats?.reserveA || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">{TOKENS.TOKEN_B.symbol}</span>
                <span className="text-zinc-200 font-medium">{poolStats?.reserveB || "0.00"}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-500 uppercase font-medium tracking-wider">Your Inventory</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Share</span>
                <span className="text-zinc-200 font-medium">{myPosition?.poolShare || "0.00%"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">LP Tokens</span>
                <span className="text-zinc-200 font-medium">{myPosition?.lpBalance || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Fail Overlays */}
      {txStatus.status === "success" && (
        <div className="absolute inset-0 bg-zinc-950/95 z-50 flex flex-col items-center justify-center p-6 text-center rounded-2xl">
           <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
              <CheckCircle2 className="w-8 h-8 text-white" />
           </div>
           <p className="text-xl font-semibold text-white mb-1 uppercase tracking-tight">Inventory Updated</p>
           <p className="text-xs text-zinc-400 font-normal mb-6">Pool positions successfully adjusted.</p>
           <button onClick={() => window.location.reload()} className="btn-nova !py-2.5 !px-6 text-xs">CONTINUE</button>
        </div>
      )}

      {txStatus.status === "fail" && (
        <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
          <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Transaction Refused</p>
          <p className="text-xs text-zinc-400 font-normal mb-4 leading-relaxed">{txStatus.error?.message || "Unknown execution error."}</p>
          <button 
            onClick={clearStatus}
            className="text-[10px] font-medium text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors"
          >
            DISMISS & RETRY
          </button>
        </div>
      )}
    </div>
  );
};
