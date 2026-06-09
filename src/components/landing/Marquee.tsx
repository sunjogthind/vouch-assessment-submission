const items = [
  "Vaccines",
  "Biologics",
  "Cell & gene therapy",
  "Insulin",
  "Plasma",
  "Clinical trials",
];

function MarqueeContent() {
  return (
    <span className="inline-flex items-center gap-12">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-12">
          {item}
          <span className="h-2 w-2 rounded-full bg-yellow" />
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div
      className="mt-10 overflow-hidden whitespace-nowrap border-t border-b border-line py-[18px]"
      aria-hidden="true"
    >
      <div
        className="marquee-track disp inline-flex items-center gap-12 text-[26px] text-[#cfcfcf]"
        style={{ animation: "marquee-scroll 24s linear infinite" }}
      >
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
