import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, xlmBalance, connectWallet, disconnectWallet, isLoading } = useWallet();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="bg-[#030303]/90 backdrop-blur-xl border border-neutral-800 rounded-2xl px-6 py-4 flex justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#ff007a] to-[#7928ca] rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-white leading-none uppercase">Nova <span className="text-[#00f0ff]">DEX</span></h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              <span className="text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Nova Testnet</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-300 mr-8">
            <a href="#" className="hover:text-white transition-colors relative group">
              Trade
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Pools
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Analytics
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-4 bg-[#0a0a0a]/80 pl-4 pr-2 py-2 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all shadow-none">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-200 font-black tracking-tight leading-none">
                  {xlmBalance ? `${parseFloat(xlmBalance).toFixed(2)} XLM` : "0.00"}
                </span>
                <span className="text-[10px] font-mono font-bold text-neutral-400 leading-none mt-1">
                  {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-gradient-to-r from-[#ff007a] via-[#a21caf] to-[#7928ca] text-white font-bold rounded-2xl py-3 px-8 text-xs tracking-widest shadow-[0_0_20px_rgba(255,0,122,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase"
            >
              <Wallet className="w-4 h-4" />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
