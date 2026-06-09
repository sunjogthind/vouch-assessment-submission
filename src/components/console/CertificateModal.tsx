import type { Shipment } from "@/lib/shipments";

interface CertificateModalProps {
  open: boolean;
  shipment: Shipment;
  certId: string;
  onClose: () => void;
  onApprove: () => void;
}

export default function CertificateModal({
  open,
  shipment,
  certId,
  onClose,
  onApprove,
}: CertificateModalProps) {
  if (!open) return null;

  const isExcursion = shipment.excursion;
  const rows = [
    ["Product", shipment.prod],
    ["Item identity (xentag)", shipment.sku.replace("xentag \u00b7 ", "")],
    ["Required spec", shipment.spec],
    ["Route", "Toronto \u2192 Hamilton"],
    [
      "Excursions",
      isExcursion ? "1 flagged (peak 12.1 \u00b0C)" : "None",
    ],
    [
      "Handling verdict",
      isExcursion
        ? "Quarantine: QA review"
        : "PASS: within spec",
    ],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,28,40,0.55)] p-6 animate-[fade_0.2s]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Integrity certificate for ${shipment.id}`}
    >
      <div
        className="w-[480px] max-w-full overflow-hidden rounded-[14px] bg-white animate-[pop_0.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-ink px-[26px] py-[22px] text-white">
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="absolute left-[18px] top-[16px] border-0 bg-transparent text-[20px] leading-none text-[#9FB2D4] hover:text-white"
          >
            &times;
          </button>
          <div className="absolute right-[22px] top-[18px] grid h-[46px] w-[46px] place-items-center rounded-full bg-yellow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E0E0E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m9 12 2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div className="text-[10.5px] uppercase tracking-[1.5px] text-[#9FB2D4]">
            Certificate of integrity
          </div>
          <h4 className="mt-[5px] text-[19px] font-semibold">
            {shipment.id} · Verified handling
          </h4>
          <div className="mt-[7px] font-mono text-[11.5px] text-[#9FB2D4]">
            ID: {certId}
          </div>
        </div>

        {/* Rows */}
        <div className="px-[26px] pt-2 pb-1">
          {rows.map(([key, val]) => {
            const isPass =
              key === "Handling verdict" && !isExcursion;
            return (
              <div
                key={key}
                className="flex items-center justify-between border-b border-line py-[11px] text-[13px] last:border-b-0"
              >
                <span className="text-grey">{key}</span>
                <span
                  className={`text-right font-semibold ${
                    isPass ? "text-ok" : ""
                  }`}
                >
                  {val}
                </span>
              </div>
            );
          })}
        </div>

        {/* Verify note */}
        <div className="mx-[26px] mb-[22px] flex items-start gap-[9px] rounded-[9px] border border-[#BFE3D2] bg-[#E6F4EE] p-[12px_14px] text-[12px] text-[#0F5F46]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-4 w-4 shrink-0"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div>
            Tamper-evident record signed against the live Geotab trace and
            xentag item identity. Portable to the receiver, insurer, and
            auditor.
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 px-[26px] pb-6">
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-[9px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-grey"
          >
            Close
          </button>
          <button
            onClick={onApprove}
            className="flex flex-1 items-center justify-center gap-[7px] rounded-[9px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-ink-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[15px] w-[15px]"
            >
              <path d="m5 12 5 5L20 7" />
            </svg>
            Approve &amp; publish
          </button>
        </div>
      </div>
    </div>
  );
}
