const feedItems = [
  {
    time: "12:04:22",
    ship: "VCH-4471",
    type: "exc" as const,
    msg: "Excursion detected: 12.1 °C, above 8 °C limit at minute 140.",
  },
  {
    time: "12:03:58",
    ship: "VCH-4471",
    type: "warn" as const,
    msg: "Predicted cause: dwell at distribution hub, reefer door open 11 min.",
  },
  {
    time: "11:58:10",
    ship: "VCH-4470",
    type: "ok" as const,
    msg: "Completed in spec. Full route within 2-8 °C.",
  },
  {
    time: "11:45:33",
    ship: "VCH-4469",
    type: "ok" as const,
    msg: "Completed in spec. Full route within 15-25 °C.",
  },
  {
    time: "11:32:17",
    ship: "VCH-4468",
    type: "info" as const,
    msg: "Monitoring started. Watching against spec 2-8 °C.",
  },
  {
    time: "11:20:05",
    ship: "VCH-4467",
    type: "ok" as const,
    msg: "Certificate generated and published. PASS: within spec.",
  },
  {
    time: "11:14:44",
    ship: "VCH-4466",
    type: "warn" as const,
    msg: "Temperature approaching upper limit. Currently 7.4 °C (limit 8 °C).",
  },
  {
    time: "10:58:31",
    ship: "VCH-4465",
    type: "ok" as const,
    msg: "Completed in spec. Certificate auto-generated.",
  },
];

const typeStyles: Record<string, { dot: string; label: string }> = {
  info: { dot: "bg-[#065A82]", label: "Info" },
  warn: { dot: "bg-[#C77A12]", label: "Warning" },
  exc: { dot: "bg-[#D64545]", label: "Excursion" },
  ok: { dot: "bg-[#1A8F6B]", label: "OK" },
};

export default function IntegrityFeedView() {
  return (
    <>
      <div className="mb-[22px]">
        <h2 className="text-[22px] font-semibold">Integrity feed</h2>
        <p className="mt-0.5 text-[13px] text-grey">
          Chronological event log across all monitored shipments.
        </p>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line bg-paper-2 px-[18px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.6px] text-grey">
          <span className="w-[80px]">Time</span>
          <span className="w-[90px]">Shipment</span>
          <span className="w-[80px]">Type</span>
          <span className="flex-1">Event</span>
        </div>
        {feedItems.map((item, i) => {
          const style = typeStyles[item.type];
          return (
            <div
              key={i}
              className="flex items-start gap-0 border-t border-line px-[18px] py-[13px] text-[13px] first:border-t-0"
            >
              <span className="w-[80px] shrink-0 font-mono text-[12px] text-grey">
                {item.time}
              </span>
              <span className="w-[90px] shrink-0 font-semibold">
                {item.ship}
              </span>
              <span className="flex w-[80px] shrink-0 items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <span className="text-[12px]">{style.label}</span>
              </span>
              <span className="flex-1 text-grey">{item.msg}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[12px] text-grey">
        Showing 8 most recent events from today's session.
      </p>
    </>
  );
}
