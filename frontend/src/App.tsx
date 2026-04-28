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
    <div className="min-h-screen bg-[#050508] text-slate-200 selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] animate-pulse rounded-full delay-1000" />
        <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-accent/5 blur-[120px] animate-pulse rounded-full delay-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Navbar />

      <main className="relative pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="space-y-12">
          
          {/* ─── Hero Section ─────────────────────────────── */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080711]/80 border border-secondary/30 rounded-lg text-secondary text-[10px] font-black uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Zap className="w-3 h-3 text-primary" />
              Soroban Live on Testnet
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
              Liquid Assets, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary shadow-sm">Seamless Trading.</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of AMM on NovaDEX. Deep liquidity, ultra-low fees, and a UI that feels like the future.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ─── Left Column: Trading Core ─────────────────────────── */}
            <div className="lg:col-span-4 space-y-8">
              {/* Tab Switcher */}
              <div className="bg-[#080711]/80 p-1 rounded-xl flex border border-secondary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                <button
                  onClick={() => setActiveTab("swap")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-black transition-all duration-300 text-xs uppercase tracking-widest ${
                    activeTab === "swap" 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(255,0,122,0.3)] scale-100" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-[#121026]/40"
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> SWAP
                </button>
                <button
                  onClick={() => setActiveTab("pool")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-black transition-all duration-300 text-xs uppercase tracking-widest ${
                    activeTab === "pool" 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(255,0,122,0.3)] scale-100" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-[#121026]/40"
                  }`}
                >
                  <Droplets className="w-4 h-4" /> POOL
                </button>
              </div>

              {/* Active Panel */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "swap" ? <SwapCard /> : <LiquidityCard />}
              </div>

              {/* Pool Stats Card */}
              <div className="crystal rounded-xl p-8 space-y-6 border border-secondary/20 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Network Stats</h3>
                  </div>
                  <div className="px-2.5 py-1 bg-success/20 text-success text-[10px] font-black rounded border border-success/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]">LIVE</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    ["Volume (24h)", poolStats?.volumeA || "0.00", "XLM", "text-primary"],
                    ["Liquidity", poolStats?.tvlEstimate || "$0.00", "USD", "text-secondary"],
                    ["Swaps", poolStats?.swapCount || "0", "TXNS", "text-accent"],
                  ].map(([label, value, unit, color]) => (
                    <div key={label} className="group cursor-default bg-[#080711]/40 p-4 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-black tracking-tight transition-all font-mono ${color}`}>{value}</span>
                        <span className="text-[10px] text-slate-500 font-mono font-black">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-secondary/20 flex items-center gap-3 text-[10px] text-slate-400 font-black tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  SECURED BY SOROBAN PROTOCOL
                </div>
              </div>
            </div>

            {/* ─── Right Column: Insights ────────────────────────────── */}
            <div className="lg:col-span-8 space-y-8">
              {/* Analytics Dashboard */}
              <div className="crystal rounded-xl p-8 space-y-8 border border-secondary/20 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#080711] border border-secondary/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      <ChartIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Market Overview</h2>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{TOKENS.TOKEN_A.symbol} / {TOKENS.TOKEN_B.symbol} Pair</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {[TOKENS.TOKEN_A, TOKENS.TOKEN_B].map((token, i) => (
                      <div key={token.id} className="px-4 py-2 bg-[#080711]/80 rounded-xl border border-secondary/20 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: i === 0 ? '#ff007a' : '#00f0ff', backgroundColor: i === 0 ? '#ff007a' : '#00f0ff' }} />
                        <span className="text-xs font-mono font-black text-slate-300">
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
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Pool Depth</h2>
                  </div>
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-[#080711] border border-secondary/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        <Droplets className="w-8 h-8 text-secondary animate-pulse" />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">
                      Liquidity Visualization<br />Engine Loading...
                    </p>
                  </div>
                </div>
                
                <div className="crystal rounded-xl overflow-hidden border border-secondary/20 shadow-[0_0_40px_rgba(0,240,255,0.05)] p-8">
                  <EventLog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-secondary/20 relative z-10 bg-[#050508]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,0,122,0.3)]">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">NovaDEX</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">
              The premier liquidity protocol for the Nova ecosystem. High-fidelity trading powered by advanced Soroban logic.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Docs</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
            <p className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-[0.3em]">
              V1.0.0-NOVA — NOVA GLOBAL 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
