import Link from "next/link";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section id="demo" className="py-[100px] text-center">
      <div className="mx-auto max-w-[1180px] px-7">
        {/* Pill */}
        <Reveal>
          <span className="inline-flex items-center gap-[7px] rounded-[30px] border-[1.5px] border-ink bg-ink px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
            Live prototype
          </span>
        </Reveal>

        {/* Title */}
        <Reveal>
          <h2
            className="disp mt-5"
            style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
          >
            See Vouch{" "}
            <span className="bg-[linear-gradient(180deg,transparent_60%,var(--yellow)_60%)]">
              vouch.
            </span>
          </h2>
        </Reveal>

        {/* Lede */}
        <Reveal>
          <p className="mx-auto mt-5 mb-8 max-w-[480px] text-[18px] text-grey">
            Open the operations console and watch the Integrity Agent catch a live
            excursion, draft the report, and issue a certificate, end to end.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            href="/console"
            className="inline-flex items-center gap-2 rounded-[30px] border-[1.5px] border-yellow bg-yellow px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Open the console
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
            href="#top"
            className="inline-flex items-center gap-2 rounded-[30px] border-[1.5px] border-ink bg-transparent px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
          >
            Back to top
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
