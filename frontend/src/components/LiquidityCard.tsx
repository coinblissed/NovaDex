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
    <div className="crystal rounded-2xl p-8 space-y-8 relative overflow-hidden border-neutral-800 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Pool Management</span>
        </div>
        
        <div className="flex bg-[#0a0a0a]/80 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setTab("add")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              tab === "add" ? "bg-white text-black" : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            Add
          </button>
          <button
            onClick={() => setTab("remove")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              tab === "remove" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
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
            <div className="bg-[#0a0a0a]/60 border border-neutral-800 rounded-xl p-6 transition-all focus-within:border-neutral-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Deposit {TOKENS.TOKEN_A.symbol}</p>
              <div className="flex items-center justify-between gap-4">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  className="bg-transparent text-3xl font-black text-white focus:outline-none w-full placeholder:text-slate-800"
                />
                <div className="flex items-center gap-2 bg-[#141414] px-3 py-1.5 rounded-xl border border-neutral-800">
                  <div className="w-4 h-4 rounded-full bg-white" />
                  <span className="font-black text-xs text-slate-200">{TOKENS.TOKEN_A.symbol}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-6 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#0d0d0d] border border-neutral-800 flex items-center justify-center shadow-none">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Input B */}
            <div className="bg-[#0a0a0a]/60 border border-neutral-800 rounded-xl p-6 transition-all focus-within:border-neutral-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Deposit {TOKENS.TOKEN_B.symbol}</p>
              <div className="flex items-center justify-between gap-4">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  className="bg-transparent text-3xl font-black text-white focus:outline-none w-full placeholder:text-slate-800"
                />
                <div className="flex items-center gap-2 bg-[#141414] px-3 py-1.5 rounded-xl border border-neutral-800">
                  <div className="w-4 h-4 rounded-full bg-neutral-400" />
                  <span className="font-black text-xs text-slate-200">{TOKENS.TOKEN_B.symbol}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="text-slate-400">Predicted Share</span>
              <span className="text-white font-black">
                {poolStats ? "0.01%" : "0.00%"}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="text-slate-400">Current Rate</span>
              <span className="text-slate-200 font-mono font-black">1 {TOKENS.TOKEN_A.symbol} = {poolStats?.priceAtoB} {TOKENS.TOKEN_B.symbol}</span>
            </div>
          </div>

          <button
            onClick={isConnected ? handleAdd : connectWallet}
            disabled={isConnected && (!amountA || !amountB || txStatus.status === "pending")}
            className="btn-nova w-full shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            {txStatus.status === "pending" && <Loader2 className="w-5 h-5 animate-spin text-black" />}
            <span className="tracking-widest font-black">
              {!isConnected ? "CONNECT WALLET" : txStatus.status === "pending" ? "PROCESSING..." : "PROVIDE LIQUIDITY"}
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#0a0a0a]/60 border border-neutral-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Withdraw LP Assets</p>
              <span className="text-[10px] font-bold text-slate-400">Available: <span className="font-mono font-black text-slate-200">{myPosition?.lpBalance || "0.00"}</span></span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="number"
                placeholder="0.00"
                value={lpToRemove}
                onChange={(e) => setLpToRemove(e.target.value)}
                className="bg-transparent text-3xl font-black text-white focus:outline-none w-full placeholder:text-slate-800"
              />
              <div className="flex items-center gap-2 bg-[#141414] px-3 py-1.5 rounded-xl border border-neutral-800">
                <div className="w-4 h-4 rounded-full bg-neutral-600" />
                <span className="font-black text-xs text-slate-200">LP TOKENS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="crystal p-4 rounded-xl bg-[#0a0a0a]/40 border border-neutral-800">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-2">Claim {TOKENS.TOKEN_A.symbol}</p>
              <p className="text-xl font-black text-white font-mono">0.00</p>
            </div>
            <div className="crystal p-4 rounded-xl bg-[#0a0a0a]/40 border border-neutral-800">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-2">Claim {TOKENS.TOKEN_B.symbol}</p>
              <p className="text-xl font-black text-white font-mono">0.00</p>
            </div>
          </div>

          <button
            onClick={isConnected ? handleRemove : connectWallet}
            disabled={isConnected && (!lpToRemove || txStatus.status === "pending")}
            className="w-full py-4 rounded-xl bg-danger/10 text-danger border border-danger/30 font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-danger/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.2)]"
          >
            {txStatus.status === "pending" && <Loader2 className="w-5 h-5 animate-spin" />}
            {!isConnected ? "CONNECT WALLET" : "BURN LP ASSETS"}
          </button>
        </div>
      )}

      {/* Stats Divider */}
      <div className="pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-4 h-4 text-slate-500" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Details</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Total Reserves</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{TOKENS.TOKEN_A.symbol}</span>
                <span className="text-white font-bold">{poolStats?.reserveA || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{TOKENS.TOKEN_B.symbol}</span>
                <span className="text-white font-bold">{poolStats?.reserveB || "0.00"}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Your Inventory</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Share</span>
                <span className="text-primary font-bold">{myPosition?.poolShare || "0.00%"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">LP Tokens</span>
                <span className="text-white font-bold">{myPosition?.lpBalance || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Fail Overlays */}
      {txStatus.status === "success" && (
        <div className="absolute inset-0 crystal z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
           <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6 border border-success/30">
              <CheckCircle2 className="w-8 h-8 text-success" />
           </div>
           <p className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Inventory Updated</p>
           <p className="text-xs text-slate-400 font-medium mb-8">Pool positions successfully adjusted.</p>
           <button onClick={() => window.location.reload()} className="btn-nova !py-3 !px-8 text-xs !shadow-success/20">CONTINUE</button>
        </div>
      )}

      {txStatus.status === "fail" && (
        <div className="mt-8 p-5 bg-danger/5 border border-danger/20 rounded-[2rem] text-center">
          <p className="text-[10px] font-black text-danger uppercase tracking-[0.2em] mb-2">Transaction Refused</p>
          <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">{txStatus.error?.message || "Unknown execution error."}</p>
          <button 
            onClick={clearStatus}
            className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
          >
            DISMISS & RETRY
          </button>
        </div>
      )}
    </div>
  );
};
