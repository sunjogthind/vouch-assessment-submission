export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-7">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[24px] no-underline"
        >
          <span className="grid h-[26px] w-[26px] place-items-center rounded-lg border-[1.5px] border-ink bg-yellow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E0E0E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[15px] w-[15px]"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="disp">Vouch</span>
        </a>

        {/* Muted text */}
        <div className="text-[13px] text-grey">
          Verified cold-chain integrity · Built on Geotab + xentag · Concept by
          Rana Thind
        </div>
      </div>
    </footer>
  );
}
