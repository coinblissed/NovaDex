import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, xlmBalance, connectWallet, disconnectWallet, isLoading } = useWallet();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="crystal rounded-2xl px-6 py-4 flex justify-between items-center border border-zinc-800 bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-100 text-black rounded-xl flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-tight text-white leading-none">Aura <span className="text-zinc-400">DEX</span></h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-medium">Aura Testnet</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-zinc-400 mr-4">
            <a href="#" className="hover:text-white transition-colors relative group">
              Trade
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Pools
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Analytics
            </a>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-4 bg-zinc-900/80 pl-4 pr-2 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="flex flex-col items-end">
                <span className="text-xs text-zinc-100 font-semibold tracking-tight leading-none">
                  {xlmBalance ? `${parseFloat(xlmBalance).toFixed(2)} XLM` : "0.00"}
                </span>
                <span className="text-[10px] font-mono font-medium text-zinc-400 leading-none mt-1">
                  {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-lg transition-all"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="btn-nova !py-2.5 !px-5 text-xs font-medium tracking-wide shadow-none"
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
