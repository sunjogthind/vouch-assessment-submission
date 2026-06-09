import Reveal from "./Reveal";

export default function DataAdvantage() {
  return (
    <section id="data" className="py-[84px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-14">
          {/* Eyebrow */}
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="h-0.5 w-[34px] bg-yellow" />
            <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-yellow">
              Why it works
            </span>
          </div>

          {/* Title */}
          <h2
            className="disp max-w-[680px]"
            style={{ fontSize: "clamp(34px, 4.5vw, 54px)", lineHeight: "0.96" }}
          >
            Two platforms most cold-chain tools only see half of.
          </h2>

          {/* Fusion diagram */}
          <div className="mt-11 grid grid-cols-1 items-center gap-[18px] md:grid-cols-[1fr_auto_1fr_auto_1.1fr]">
            {/* Geotab */}
            <div className="rounded-[16px] border border-white/14 bg-white/6 p-[22px]">
              <div className="mb-3 text-[11px] uppercase tracking-[0.08em] text-[#9CA3AF]">
                Geotab / ZenduONE
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Live temperature telemetry",
                  "GPS, route & dwell time",
                  "Door-open & handling events",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px]"
                  >
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* + */}
            <div className="disp hidden text-center text-[40px] text-yellow md:block">
              +
            </div>

            {/* xentag */}
            <div className="rounded-[16px] border border-white/14 bg-white/6 p-[22px]">
              <div className="mb-3 text-[11px] uppercase tracking-[0.08em] text-[#9CA3AF]">
                xentag
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Item-level identity",
                  "Authentication",
                  "Chain-of-custody",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px]"
                  >
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-yellow" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* → */}
            <div className="disp hidden text-center text-[40px] text-yellow md:block">
              →
            </div>

            {/* Result */}
            <div className="rounded-[16px] bg-yellow p-[22px] text-ink">
              <div className="mb-2 text-[11px] uppercase tracking-[0.08em] text-[#5a5200]">
                The result
              </div>
              <h4 className="disp mb-2 text-[30px]" style={{ lineHeight: "0.95" }}>
                Verified integrity record
              </h4>
              <p className="text-[13.5px] text-[#4a4400]">
                Condition-accurate and item-authentic. Tamper-evident, portable,
                trusted by every party in the shipment.
              </p>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
