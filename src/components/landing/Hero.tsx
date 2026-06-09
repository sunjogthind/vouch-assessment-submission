import Link from "next/link";
import LiveMonitorCard from "./LiveMonitorCard";

export default function Hero() {
  return (
    <header className="relative overflow-hidden pt-12 pb-10 sm:pt-[78px] sm:pb-[60px]" id="top">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-9 px-7 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        {/* Left column */}
        <div>
          {/* Pill */}
          <span className="inline-flex items-center gap-[7px] rounded-[30px] border-[1.5px] border-ink px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.06em]">
            <span className="h-[7px] w-[7px] rounded-full bg-ok" />
            Built on Geotab + xentag
          </span>

          {/* Headline */}
          <h1 className="disp mt-5" style={{ fontSize: "clamp(56px, 8vw, 104px)" }}>
            Every shipment,
            <br />
            <span className="bg-[linear-gradient(180deg,transparent_58%,var(--yellow)_58%)] px-1">
              vouched&nbsp;for.
            </span>
          </h1>

          {/* Lede */}
          <p className="mt-[18px] mb-[24px] max-w-[520px] text-[16px] leading-[1.55] text-grey sm:mt-[22px] sm:mb-[30px] sm:text-[19px]">
            Vouch proves every temperature-sensitive shipment was handled
            correctly, automatically, and turns that proof into a record
            buyers, insurers, and regulators trust.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/console"
              className="inline-flex items-center gap-2 rounded-[30px] border-[1.5px] border-yellow bg-yellow px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              See it live
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[17px] w-[17px]"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-[30px] border-[1.5px] border-ink bg-transparent px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
            >
              How it works
            </a>
          </div>

          {/* Trust stats */}
          <div className="mt-[34px] flex flex-wrap gap-[26px]">
            <div>
              <div className="disp text-[40px]">$35B</div>
              <div className="mt-0.5 max-w-[140px] text-[12.5px] text-grey">
                lost yearly to cold-chain failures
              </div>
            </div>
            <div>
              <div className="disp text-[40px]">~12%</div>
              <div className="mt-0.5 max-w-[140px] text-[12.5px] text-grey">
                of pharma shipments hit an excursion
              </div>
            </div>
            <div>
              <div className="disp text-[40px]">&lt;5min</div>
              <div className="mt-0.5 max-w-[140px] text-[12.5px] text-grey">
                to an audit-ready certificate
              </div>
            </div>
          </div>
        </div>

        {/* Right column — live monitor card */}
        <LiveMonitorCard />
      </div>
    </header>
  );
}
