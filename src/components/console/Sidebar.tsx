import Link from "next/link";

export type ConsoleTab =
  | "live-shipments"
  | "integrity-feed"
  | "certificates"
  | "trust-scored-carriers"
  | "insurer-data-feed";

const monitorLinks: { label: string; tab: ConsoleTab; icon: React.ReactNode }[] = [
  {
    label: "Live shipments",
    tab: "live-shipments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Integrity feed",
    tab: "integrity-feed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l3 8 4-16 3 8h4" />
      </svg>
    ),
  },
  {
    label: "Certificates",
    tab: "certificates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
  },
];

const marketLinks: { label: string; tab: ConsoleTab; icon: React.ReactNode }[] = [
  {
    label: "Trust-scored carriers",
    tab: "trust-scored-carriers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9 4 4h16l1 5" />
        <path d="M4 9v11h16V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    label: "Insurer data feed",
    tab: "insurer-data-feed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
];

interface SidebarProps {
  activeTab: ConsoleTab;
  onTabChange: (tab: ConsoleTab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="flex flex-col gap-[26px] bg-ink p-[22px_18px] text-white" aria-label="Console sidebar">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-yellow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0E0E0E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <div className="text-[15px] font-semibold leading-tight tracking-wide">
            Vouch
          </div>
          <div className="text-[11px] font-normal text-[#9FB2D4]">
            Operations console
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        <p className="mb-2 ml-1 text-[10.5px] uppercase tracking-[1px] text-grey">
          Monitor
        </p>
        {monitorLinks.map((link) => (
          <button
            key={link.tab}
            onClick={() => onTabChange(link.tab)}
            className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-[11px] py-[9px] text-left text-[13.5px] ${
              activeTab === link.tab
                ? "bg-white/10 font-medium text-white"
                : "text-[#C9D4EC] hover:bg-white/5"
            }`}
          >
            <span className="h-4 w-4 shrink-0 opacity-85">{link.icon}</span>
            {link.label}
          </button>
        ))}

        <p className="mb-2 ml-1 mt-[18px] text-[10.5px] uppercase tracking-[1px] text-grey">
          Marketplace
        </p>
        {marketLinks.map((link) => (
          <button
            key={link.tab}
            onClick={() => onTabChange(link.tab)}
            className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-[11px] py-[9px] text-left text-[13.5px] ${
              activeTab === link.tab
                ? "bg-white/10 font-medium text-white"
                : "text-[#C9D4EC] hover:bg-white/5"
            }`}
          >
            <span className="h-4 w-4 shrink-0 opacity-85">{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-[11px] leading-relaxed text-[#6E7FA8]">
        <Link
          href="/"
          className="mb-3 flex items-center gap-1.5 text-[12px] text-[#9FB2D4] transition-colors hover:text-white"
        >
          ← Back to site
        </Link>
        <span className="font-medium text-[#9FB2D4]">Prototype</span>
        simulated Geotab + xentag data.
        <br />
        Built for the ZenduIT venture assessment.
      </div>
    </aside>
  );
}
