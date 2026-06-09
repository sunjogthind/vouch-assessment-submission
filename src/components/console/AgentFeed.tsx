export interface AgentEvent {
  id: string;
  type: "info" | "warn" | "exc" | "ok";
  html: string;
}

interface AgentFeedProps {
  events: AgentEvent[];
  agentStatus: string;
  agentStatusColor: string;
  certEnabled: boolean;
  onGenerateCert: () => void;
}

const icons: Record<string, string> = {
  info: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  exc: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  ok: '<path d="m5 12 5 5L20 7"/>',
};

const dotColors: Record<string, string> = {
  info: "bg-[#EAF2F6] text-[#065A82]",
  warn: "bg-[#FBF1E2] text-[#C77A12]",
  exc: "bg-[#FBEAEA] text-danger",
  ok: "bg-[#E6F4EE] text-ok",
};

export default function AgentFeed({
  events,
  agentStatus,
  agentStatusColor,
  certEnabled,
  onGenerateCert,
}: AgentFeedProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-white">
      <h3 className="flex items-center justify-between border-b border-line px-[18px] py-[15px] text-[14px] font-semibold">
        Integrity Agent
        <span
          className="text-[11.5px] font-normal"
          style={{ color: agentStatusColor || "#6B6B6B" }}
        >
          {agentStatus}
        </span>
      </h3>

      {/* Feed */}
      <div className="max-h-[268px] overflow-y-auto">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex gap-[11px] border-t border-line px-[18px] py-[13px] first:border-t-0 animate-[slideIn_0.35s_ease]"
          >
            <div
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${dotColors[ev.type]}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[15px] w-[15px]"
                dangerouslySetInnerHTML={{ __html: icons[ev.type] }}
              />
            </div>
            <div
              className="flex-1 text-[13px] [&_b]:font-semibold [&_.meta]:mt-0.5 [&_.meta]:font-mono [&_.meta]:text-[11px] [&_.meta]:text-grey [&_.draft]:mt-2 [&_.draft]:rounded-lg [&_.draft]:border [&_.draft]:border-line [&_.draft]:bg-paper-2 [&_.draft]:p-[9px_11px] [&_.draft]:text-[12px] [&_.draft]:leading-relaxed [&_.draft]:text-grey [&_.draft_b]:text-ink"
              dangerouslySetInnerHTML={{ __html: ev.html }}
            />
          </div>
        ))}
      </div>

      {/* Generate cert button */}
      <div className="border-t border-line px-[18px] py-4">
        <button
          onClick={onGenerateCert}
          disabled={!certEnabled}
          className="inline-flex w-full items-center justify-center gap-[7px] rounded-[9px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#A9BDC9]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[15px] w-[15px]"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="m9 15 2 2 4-4" />
          </svg>
          Generate integrity certificate
        </button>
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-grey">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[13px] w-[13px]"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" />
          </svg>
          Receiver scans the xentag to verify at handoff.
        </div>
      </div>
    </div>
  );
}
