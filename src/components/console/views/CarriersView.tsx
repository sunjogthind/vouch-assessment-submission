const carriers = [
  { name: "Arctic Express Logistics", score: 97, loads: 342, excRate: "0.3%", region: "Ontario / Quebec", tier: "Platinum" as const },
  { name: "PharmaRoute Canada", score: 94, loads: 218, excRate: "0.9%", region: "National", tier: "Platinum" as const },
  { name: "ColdLink Transport", score: 91, loads: 187, excRate: "1.2%", region: "BC / Alberta", tier: "Gold" as const },
  { name: "FreshHaul Inc.", score: 88, loads: 156, excRate: "1.8%", region: "Ontario", tier: "Gold" as const },
  { name: "MedFreight Solutions", score: 85, loads: 134, excRate: "2.4%", region: "National", tier: "Silver" as const },
  { name: "TempSafe Carriers", score: 82, loads: 98, excRate: "3.1%", region: "Atlantic", tier: "Silver" as const },
  { name: "NorthStar Cold Chain", score: 79, loads: 76, excRate: "3.7%", region: "Prairies", tier: "Bronze" as const },
  { name: "QuickChill Delivery", score: 74, loads: 52, excRate: "5.2%", region: "Ontario", tier: "Bronze" as const },
];

const tierColors: Record<string, string> = {
  Platinum: "bg-[#E8E0F0] text-[#6B21A8]",
  Gold: "bg-[#FBF1E2] text-[#C77A12]",
  Silver: "bg-[#EAF2F6] text-[#3B6B82]",
  Bronze: "bg-[#F5EDE4] text-[#8B6914]",
};

function scoreBar(score: number) {
  const color = score >= 90 ? "bg-ok" : score >= 80 ? "bg-[#C77A12]" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className="h-[6px] w-[60px] overflow-hidden rounded-full bg-[#EEF2F5]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[13px] font-semibold">{score}</span>
    </div>
  );
}

export default function CarriersView() {
  return (
    <>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3.5">
        <div>
          <h2 className="text-[22px] font-semibold">Trust-scored carriers</h2>
          <p className="mt-0.5 text-[13px] text-grey">
            Carrier performance based on verified Vouch integrity records.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white px-3 py-[7px] text-[12px] text-grey">
          <b className="text-ink">{carriers.length}</b> active carriers
        </div>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Carrier", "Trust Score", "Verified Loads", "Excursion Rate", "Region", "Tier"].map((h) => (
                  <th
                    key={h}
                    className="bg-paper-2 px-[18px] py-[9px] text-left text-[10.5px] font-semibold uppercase tracking-[0.6px] text-grey"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carriers.map((c) => (
                <tr key={c.name} className="border-t border-line transition-colors hover:bg-[#FAFAF7]">
                  <td className="px-[18px] py-[11px] text-[13px] font-semibold">
                    {c.name}
                  </td>
                  <td className="px-[18px] py-[11px]">{scoreBar(c.score)}</td>
                  <td className="px-[18px] py-[11px] text-[13px]">{c.loads}</td>
                  <td className="px-[18px] py-[11px] text-[13px]">
                    <span className={parseFloat(c.excRate) > 3 ? "text-danger font-medium" : ""}>
                      {c.excRate}
                    </span>
                  </td>
                  <td className="px-[18px] py-[11px] text-[13px] text-grey">{c.region}</td>
                  <td className="px-[18px] py-[11px]">
                    <span className={`inline-block rounded-[20px] px-[9px] py-[3px] text-[11px] font-semibold ${tierColors[c.tier]}`}>
                      {c.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-[12px] text-grey">
        Trust scores are computed from verified Vouch integrity records across all shipments.
      </p>
    </>
  );
}
