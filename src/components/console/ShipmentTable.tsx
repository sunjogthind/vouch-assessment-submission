import type { Shipment } from "@/lib/shipments";

interface ShipmentTableProps {
  shipments: Shipment[];
  selected: Shipment;
  onSelect: (s: Shipment) => void;
}

function statusPill(status: Shipment["status"]) {
  const map = {
    ok: { cls: "text-ok bg-[#E6F4EE]", label: "In spec" },
    transit: { cls: "text-[#1C7293] bg-[#EAF2F6]", label: "In transit" },
    exc: { cls: "text-danger bg-[#FBEAEA]", label: "Excursion" },
  };
  const { cls, label } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-[20px] px-[9px] py-[3px] text-[11px] font-semibold ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default function ShipmentTable({
  shipments,
  selected,
  onSelect,
}: ShipmentTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-white" role="region" aria-label="Active shipments">
      <h3 className="flex items-center justify-between border-b border-line px-[18px] py-[15px] text-[14px] font-semibold">
        Active loads
        <span className="text-[11.5px] font-normal text-grey">
          Geotab + xentag fused
        </span>
      </h3>
      <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Shipment", "Product", "Temp", "Status"].map((h) => (
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
          {shipments.map((s) => (
            <tr
              key={s.id}
              tabIndex={0}
              role="button"
              aria-current={s.id === selected.id ? "true" : undefined}
              onClick={() => onSelect(s)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(s); } }}
              className={`cursor-pointer border-t border-line transition-colors hover:bg-[#EAF2F6] ${
                s.id === selected.id ? "bg-[#EAF2F6]" : ""
              }`}
            >
              <td
                className={`px-[18px] py-[11px] text-[13px] ${
                  s.id === selected.id
                    ? "shadow-[inset_3px_0_0_var(--ink)]"
                    : ""
                }`}
              >
                <b className="font-semibold">{s.id}</b>
                <div className="font-mono text-[11.5px] text-grey">{s.sku}</div>
              </td>
              <td className="px-[18px] py-[11px] text-[13px]">
                {s.prod}
                <div className="font-mono text-[11.5px] text-grey">
                  {s.spec}
                </div>
              </td>
              <td className="px-[18px] py-[11px] text-[13px] font-semibold">
                {s.temp}
              </td>
              <td className="px-[18px] py-[11px]">{statusPill(s.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
