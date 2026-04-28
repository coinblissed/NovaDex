import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, xlmBalance, connectWallet, disconnectWallet, isLoading } = useWallet();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="crystal rounded-2xl px-6 py-4 flex justify-between items-center shadow-[0_0_50px_rgba(0,240,255,0.15)] border-secondary/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform hover:scale-110 duration-300">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-white leading-none uppercase">Nova <span className="text-secondary">DEX</span></h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
              <span className="text-[9px] text-secondary uppercase tracking-widest font-black">Nova Testnet</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400 mr-4">
            <a href="#" className="hover:text-secondary transition-colors relative group">
              Trade
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors relative group">
              Pools
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors relative group">
              Analytics
              <span className="absolute bottom--1 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-4 bg-[#080711]/80 pl-4 pr-2 py-2 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-200 font-black tracking-tight leading-none">
                  {xlmBalance ? `${parseFloat(xlmBalance).toFixed(2)} XLM` : "0.00"}
                </span>
                <span className="text-[10px] font-mono font-bold text-secondary leading-none mt-1">
                  {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2 hover:bg-danger/20 text-slate-400 hover:text-danger rounded-lg transition-all"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="btn-nova !py-3 !px-6 text-xs font-black tracking-widest shadow-[0_0_20px_rgba(255,0,122,0.3)]"
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
