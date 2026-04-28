import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { SwapCard } from "./components/SwapCard";
import { LiquidityCard } from "./components/LiquidityCard";
import { PriceChart } from "./components/PriceChart";
import { EventLog } from "./components/EventLog";
import { TOKENS } from "./config";
import { LayoutGrid, ArrowRightLeft, Droplets, PieChart as ChartIcon, Zap, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { usePool } from "./hooks/usePool";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"swap" | "pool">("swap");
  const { poolStats } = usePool();

  return (
    <div className="min-h-screen bg-background text-zinc-200 selection:bg-zinc-800 selection:text-white overflow-x-hidden font-sans">
      <Navbar />

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="space-y-12">
          
          {/* ─── Hero Section ─────────────────────────────── */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 text-[10px] font-medium uppercase tracking-widest">
              <Zap className="w-3 h-3 text-zinc-100" />
              Soroban Live on Testnet
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Liquid Assets, <br />
              <span className="text-zinc-400">Seamless Trading.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of AMM on MinSwap. Deep liquidity, ultra-low fees, and a minimalist interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ─── Left Column: Trading Core ─────────────────────────── */}
            <div className="lg:col-span-4 space-y-8">
              {/* Tab Switcher */}
              <div className="bg-zinc-950 p-1 rounded-xl flex border border-zinc-800">
                <button
                  onClick={() => setActiveTab("swap")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 text-xs tracking-wider ${
                    activeTab === "swap" 
                      ? "bg-zinc-100 text-zinc-950" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> SWAP
                </button>
                <button
                  onClick={() => setActiveTab("pool")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 text-xs tracking-wider ${
                    activeTab === "pool" 
                      ? "bg-zinc-100 text-zinc-950" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Droplets className="w-4 h-4" /> POOL
                </button>
              </div>

              {/* Active Panel */}
              <div className="animate-in fade-in duration-300">
                {activeTab === "swap" ? <SwapCard /> : <LiquidityCard />}
              </div>

              {/* Pool Stats Card */}
              <div className="crystal rounded-xl p-6 space-y-6 border border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-xs font-semibold tracking-wider text-zinc-300">Network Stats</h3>
                  </div>
                  <div className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[9px] font-medium rounded border border-zinc-700">LIVE</div>
                </div>
                
                <div className="space-y-3">
                  {[
                    ["Volume (24h)", poolStats?.volumeA || "0.00", "XLM", "text-zinc-100"],
                    ["Liquidity", poolStats?.tvlEstimate || "$0.00", "USD", "text-zinc-100"],
                    ["Swaps", poolStats?.swapCount || "0", "TXNS", "text-zinc-100"],
                  ].map(([label, value, unit, color]) => (
                    <div key={label} className="group cursor-default bg-zinc-950/40 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                      <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mb-1">{label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-xl font-semibold tracking-tight transition-all font-mono ${color}`}>{value}</span>
                        <span className="text-[9px] text-zinc-600 font-mono">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center gap-2 text-[9px] text-zinc-500 font-medium tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  SECURED BY SOROBAN PROTOCOL
                </div>
              </div>
            </div>

            {/* ─── Right Column: Insights ────────────────────────────── */}
            <div className="lg:col-span-8 space-y-8">
              {/* Analytics Dashboard */}
              <div className="crystal rounded-xl p-6 space-y-6 border border-zinc-800 bg-zinc-900/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
                      <ChartIcon className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white tracking-tight">Market Overview</h2>
                      <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest">{TOKENS.TOKEN_A.symbol} / {TOKENS.TOKEN_B.symbol} Pair</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {[TOKENS.TOKEN_A, TOKENS.TOKEN_B].map((token) => (
                      <div key={token.id} className="px-3 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-400" />
                        <span className="text-[10px] font-mono text-zinc-400">
                          {token.id.slice(0, 4)}...{token.id.slice(-4)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[450px] w-full">
                  <PriceChart />
                </div>
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="crystal rounded-xl p-8 space-y-6 border border-secondary/20 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5 text-secondary" />
                    <h2 className="text-sm font-medium uppercase tracking-widest text-white">Pool Depth</h2>
                  </div>
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-zinc-400" />
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] leading-relaxed">
                      Liquidity Visualization<br />Engine Loading...
                    </p>
                  </div>
                </div>
                
                <div className="crystal rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/30 p-6">
                  <EventLog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 relative z-10 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Activity className="text-zinc-100 w-4 h-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">MinSwap</span>
            </div>
            <p className="text-zinc-400 text-xs max-w-sm font-normal leading-relaxed">
              The premier liquidity protocol for the MinSwap ecosystem. High-fidelity trading powered by advanced Soroban logic.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-6 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
            <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.3em]">
              V1.0.0-MIN — MINSWAP GLOBAL 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
