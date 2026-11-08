const stats = [
  { value: "660", unit: "hp", label: "最大馬力（M70 xDrive）" },
  { value: "3.7", unit: "秒", label: "0–100 km/h（M70 xDrive）" },
  { value: "625", unit: "km", label: "WLTP 續航（eDrive50）" },
  { value: "10", unit: "分鐘", label: "快充約可補 160 km" },
];

export default function StatsBar() {
  return (
    <section id="performance" className="bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 border-y border-white/10 px-6 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-10 ${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-8" : ""}`}
          >
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light tracking-tight text-white">
                {s.value}
              </span>
              <span className="font-mono text-xs text-neutral-400">{s.unit}</span>
            </div>
            <p className="mt-2 font-mono text-xs text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
