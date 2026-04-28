import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "00:00", price: 1.05 },
  { name: "04:00", price: 1.08 },
  { name: "08:00", price: 1.02 },
  { name: "12:00", price: 1.12 },
  { name: "16:00", price: 1.09 },
  { name: "20:00", price: 1.15 },
  { name: "23:59", price: 1.18 },
];

export const PriceChart: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">
            Current Rate
          </p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl font-black font-sans text-white tracking-tighter italic">1.1824</h2>
            <div className="px-2.5 py-1 bg-neutral-800 rounded-lg border border-neutral-700 shadow-none">
              <span className="text-white text-xs font-black">+2.45%</span>
            </div>
          </div>
        </div>
        <div className="flex bg-[#0a0a0a]/80 p-1 rounded-xl border border-neutral-800">
          {["1H", "24H", "7D", "1M"].map((range) => (
            <button 
              key={range}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                range === "24H" ? "bg-white text-black font-black" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(255, 255, 255, 0.03)" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 800 }}
              domain={['dataMin - 0.05', 'dataMax + 0.05']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(10, 10, 10, 0.95)", 
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                borderRadius: "1rem",
                boxShadow: "none",
                padding: "1rem"
              }}
              itemStyle={{ color: "#ffffff", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}
              labelStyle={{ color: "rgba(255,255,255,0.4)", fontWeight: 800, fontSize: "10px", marginBottom: "0.5rem", letterSpacing: "0.1em" }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#ffffff" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={2}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
