import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-white/82 backdrop-blur-[12px]" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-7">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="Vouch home">
          <span className="grid h-[30px] w-[30px] place-items-center rounded-lg border-[1.5px] border-ink bg-yellow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E0E0E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px]"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="disp text-[30px]">Vouch</span>
        </Link>

        {/* Links */}
        <div className="hidden gap-[30px] text-[14.5px] font-medium text-ink-2 md:flex">
          <a href="#problem" className="py-1 hover:opacity-60 transition-opacity">
            The problem
          </a>
          <a href="#how" className="py-1 hover:opacity-60 transition-opacity">
            How it works
          </a>
          <a href="#data" className="py-1 hover:opacity-60 transition-opacity">
            Why it works
          </a>
          <a href="#demo" className="py-1 hover:opacity-60 transition-opacity">
            Live demo
          </a>
        </div>

        {/* CTA */}
        <Link
          href="/console"
          className="inline-flex items-center gap-2 rounded-[30px] border-[1.5px] border-ink bg-ink px-4 py-[11px] text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:px-[22px] sm:py-[13px] sm:text-[15px]"
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
      </div>
    </nav>
  );
}
