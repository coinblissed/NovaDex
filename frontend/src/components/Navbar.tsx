import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, xlmBalance, connectWallet, disconnectWallet, isLoading } = useWallet();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="crystal rounded-2xl px-6 py-4 flex justify-between items-center shadow-[0_0_50px_rgba(255,255,255,0.05)] border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-110 duration-300">
            <Activity className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-white leading-none uppercase">Noir <span className="text-neutral-400">DEX</span></h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-black">Noir Testnet</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400 mr-4">
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
              className="btn-nova !py-3 !px-6 text-xs font-black tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
