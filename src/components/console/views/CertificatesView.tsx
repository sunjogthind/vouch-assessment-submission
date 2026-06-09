const certs = [
  { id: "CERT-A7F2B1", ship: "VCH-4470", prod: "Insulin (Humalog)", verdict: "PASS", date: "Jun 9, 2026", status: "published" as const },
  { id: "CERT-K3D9E4", ship: "VCH-4469", prod: "Monoclonal Ab.", verdict: "PASS", date: "Jun 9, 2026", status: "published" as const },
  { id: "CERT-M1P6Q8", ship: "VCH-4468", prod: "mRNA Vaccine (Pfizer)", verdict: "PASS", date: "Jun 8, 2026", status: "published" as const },
  { id: "CERT-R4T7W2", ship: "VCH-4467", prod: "Fresh Produce Mix", verdict: "PASS", date: "Jun 8, 2026", status: "published" as const },
  { id: "CERT-X9Y1Z5", ship: "VCH-4466", prod: "Insulin (Humalog)", verdict: "PASS", date: "Jun 8, 2026", status: "published" as const },
  { id: "CERT-B2C4D6", ship: "VCH-4465", prod: "Blood Plasma Units", verdict: "PASS", date: "Jun 7, 2026", status: "published" as const },
  { id: "CERT-F8G0H3", ship: "VCH-4464", prod: "Frozen Seafood", verdict: "PASS", date: "Jun 7, 2026", status: "published" as const },
  { id: "CERT-J5L7N9", ship: "VCH-4463", prod: "mRNA Vaccine (Pfizer)", verdict: "QUARANTINE", date: "Jun 7, 2026", status: "flagged" as const },
  { id: "CERT-P1Q3S5", ship: "VCH-4462", prod: "Biologics (Humira)", verdict: "PASS", date: "Jun 6, 2026", status: "published" as const },
  { id: "CERT-T6U8V0", ship: "VCH-4461", prod: "Insulin (Humalog)", verdict: "PASS", date: "Jun 6, 2026", status: "published" as const },
  { id: "CERT-W2X4Y6", ship: "VCH-4460", prod: "Fresh Produce Mix", verdict: "PASS", date: "Jun 6, 2026", status: "published" as const },
  { id: "CERT-Z8A0B2", ship: "VCH-4459", prod: "Blood Plasma Units", verdict: "PASS", date: "Jun 5, 2026", status: "published" as const },
];

function verdictPill(verdict: string) {
  const isPass = verdict === "PASS";
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-[20px] px-[9px] py-[3px] text-[11px] font-semibold ${
        isPass ? "bg-[#E6F4EE] text-ok" : "bg-[#FBEAEA] text-danger"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {verdict}
    </span>
  );
}

export default function CertificatesView() {
  return (
    <>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3.5">
        <div>
          <h2 className="text-[22px] font-semibold">Certificates</h2>
          <p className="mt-0.5 text-[13px] text-grey">
            Tamper-evident integrity certificates issued by the Vouch agent.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white px-3 py-[7px] text-[12px] text-grey">
          <b className="text-ink">{certs.length}</b> certificates issued
        </div>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Certificate ID", "Shipment", "Product", "Verdict", "Date", "Status"].map((h) => (
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
              {certs.map((c) => (
                <tr key={c.id} className="border-t border-line">
                  <td className="px-[18px] py-[11px] text-[13px] font-semibold font-mono">
                    {c.id}
                  </td>
                  <td className="px-[18px] py-[11px] text-[13px]">{c.ship}</td>
                  <td className="px-[18px] py-[11px] text-[13px]">{c.prod}</td>
                  <td className="px-[18px] py-[11px]">{verdictPill(c.verdict)}</td>
                  <td className="px-[18px] py-[11px] text-[13px] text-grey">{c.date}</td>
                  <td className="px-[18px] py-[11px]">
                    <span className={`text-[12px] font-medium ${c.status === "published" ? "text-ok" : "text-danger"}`}>
                      {c.status === "published" ? "Published" : "Flagged"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
