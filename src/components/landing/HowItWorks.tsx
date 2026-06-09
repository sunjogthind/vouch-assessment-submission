import Reveal from "./Reveal";

const steps = [
  {
    num: 1,
    title: "Monitor",
    desc: "The Integrity Agent watches live temperature, location and door events, fused with the xentag item identity, and flags excursions before product is lost.",
    featured: true,
  },
  {
    num: 2,
    title: "Certify",
    desc: "On completion it auto-drafts the compliance paperwork and issues a tamper-evident integrity certificate that travels with the goods.",
    featured: false,
  },
  {
    num: 3,
    title: "Trade",
    desc: "That verified record becomes transactable. Carriers earn trust scores, insurers price on real data, receivers scan to verify at handoff.",
    featured: false,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="border-t border-b border-line bg-paper-2 py-[84px]"
    >
      <div className="mx-auto max-w-[1180px] px-7">
        {/* Eyebrow */}
        <Reveal>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="h-0.5 w-[34px] bg-ink" />
            <span className="text-[12.5px] font-bold uppercase tracking-[0.1em]">
              How it works
            </span>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal>
          <h2
            className="disp max-w-[760px]"
            style={{ fontSize: "clamp(38px, 5vw, 62px)" }}
          >
            Monitor. Certify. Trade.
          </h2>
        </Reveal>

        {/* Lede */}
        <Reveal>
          <p className="mt-[18px] max-w-[560px] text-[18px] text-grey">
            An AI agent watches every load, drafts the paperwork, and turns
            verified handling into a tradable record.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
            <div
              className="relative overflow-hidden rounded-[16px] border border-line p-[30px]"
            >
              <div
                className={`disp mb-5 grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] text-[30px] ${
                  s.featured
                    ? "border-yellow bg-yellow"
                    : "border-ink bg-transparent"
                }`}
              >
                {s.num}
              </div>
              <h3 className="disp mb-2 text-[30px]">{s.title}</h3>
              <p className="text-[14.5px] text-grey">{s.desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
