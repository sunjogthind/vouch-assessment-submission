import Reveal from "./Reveal";

const stats = [
  {
    n: "$35B",
    h: "Lost every year",
    d: "to cold-chain failures and temperature excursions across pharma.",
    hot: true,
  },
  {
    n: "~12%",
    h: "Of shipments affected",
    d: "still suffer a temperature excursion somewhere in transit.",
    hot: false,
  },
  {
    n: "40\u201360%",
    h: "Of all drugs",
    d: "now require temperature-controlled logistics, and the share keeps growing.",
    hot: false,
  },
];

export default function ProblemStats() {
  return (
    <section id="problem" className="py-[84px]">
      <div className="mx-auto max-w-[1180px] px-7">
        {/* Eyebrow */}
        <Reveal>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="h-0.5 w-[34px] bg-ink" />
            <span className="text-[12.5px] font-bold uppercase tracking-[0.1em]">
              The problem
            </span>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal>
          <h2
            className="disp max-w-[760px]"
            style={{ fontSize: "clamp(38px, 5vw, 62px)" }}
          >
            The cold chain is blind, and the cost is enormous.
          </h2>
        </Reveal>

        {/* Lede */}
        <Reveal>
          <p className="mt-[18px] max-w-[560px] text-[18px] text-grey">
            One undetected temperature excursion can spoil an entire pallet of
            vaccines or biologics. Today it&apos;s caught only on arrival, when
            it&apos;s already too late to act.
          </p>
        </Reveal>

        {/* Stat cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div
                className={`rounded-[16px] border p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] ${
                  s.hot
                    ? "border-yellow bg-yellow"
                    : "border-line bg-paper-2"
                }`}
              >
                <div className="disp text-[64px] leading-[0.9]">{s.n}</div>
                <div className="mt-3 text-[16px] font-semibold">{s.h}</div>
                <div
                  className={`mt-1.5 text-[14px] ${
                    s.hot ? "text-[#4a4400]" : "text-grey"
                  }`}
                >
                  {s.d}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
