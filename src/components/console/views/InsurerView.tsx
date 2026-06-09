const dataPoints = [
  {
    metric: "Total loads monitored (30d)",
    value: "1,247",
    trend: "+8.3%",
    up: true,
  },
  {
    metric: "Excursion rate (30d)",
    value: "2.1%",
    trend: "-0.4%",
    up: false,
  },
  {
    metric: "Avg. time to detection",
    value: "4.2 min",
    trend: "-12%",
    up: false,
  },
  {
    metric: "Certificates issued (30d)",
    value: "1,189",
    trend: "+7.1%",
    up: true,
  },
];

const recentClaims = [
  { id: "CLM-2291", ship: "VCH-4471", product: "mRNA Vaccine (Pfizer)", amount: "$142,000", status: "Under review" as const, evidence: "Vouch cert attached" },
  { id: "CLM-2287", ship: "VCH-4463", product: "Biologics (Humira)", amount: "$89,500", status: "Denied" as const, evidence: "Vouch cert: in spec" },
  { id: "CLM-2280", ship: "VCH-4451", product: "Blood Plasma Units", amount: "$67,200", status: "Approved" as const, evidence: "Vouch cert: excursion confirmed" },
  { id: "CLM-2274", ship: "VCH-4443", product: "Insulin (Humalog)", amount: "$34,800", status: "Denied" as const, evidence: "Vouch cert: in spec" },
  { id: "CLM-2269", ship: "VCH-4438", product: "Frozen Seafood", amount: "$21,400", status: "Approved" as const, evidence: "Vouch cert: excursion confirmed" },
];

const statusStyles: Record<string, string> = {
  "Under review": "text-[#C77A12] bg-[#FBF1E2]",
  "Denied": "text-[#6B6B6B] bg-[#F0F0F0]",
  "Approved": "text-ok bg-[#E6F4EE]",
};

export default function InsurerView() {
  return (
    <>
      <div className="mb-[22px]">
        <h2 className="text-[22px] font-semibold">Insurer data feed</h2>
        <p className="mt-0.5 text-[13px] text-grey">
          Aggregated cold-chain risk data for underwriting and claims decisions.
        </p>
      </div>

      {/* Metric cards */}
      <div className="mb-[18px] grid grid-cols-2 gap-[14px] lg:grid-cols-4">
        {dataPoints.map((d) => (
          <div
            key={d.metric}
            className="rounded-[12px] border border-line bg-white px-[18px] py-[15px]"
          >
            <div className="text-[11px] uppercase tracking-[0.6px] text-grey">
              {d.metric}
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-[28px] font-bold leading-none tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {d.value}
              </span>
              <span className={`mb-0.5 text-[12px] font-semibold ${d.up ? "text-ok" : "text-danger"}`}>
                {d.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Claims table */}
      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <h3 className="border-b border-line px-[18px] py-[15px] text-[14px] font-semibold">
          Recent claims with Vouch evidence
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Claim ID", "Shipment", "Product", "Amount", "Status", "Evidence"].map((h) => (
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
              {recentClaims.map((c) => (
                <tr key={c.id} className="border-t border-line">
                  <td className="px-[18px] py-[11px] text-[13px] font-semibold font-mono">
                    {c.id}
                  </td>
                  <td className="px-[18px] py-[11px] text-[13px]">{c.ship}</td>
                  <td className="px-[18px] py-[11px] text-[13px]">{c.product}</td>
                  <td className="px-[18px] py-[11px] text-[13px] font-semibold">{c.amount}</td>
                  <td className="px-[18px] py-[11px]">
                    <span className={`inline-block rounded-[20px] px-[9px] py-[3px] text-[11px] font-semibold ${statusStyles[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-[18px] py-[11px] text-[12px] text-grey">{c.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
