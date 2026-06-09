"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { SHIPMENTS, seriesFor } from "@/lib/shipments";
import type { Shipment } from "@/lib/shipments";
import Sidebar from "@/components/console/Sidebar";
import StatStrip from "@/components/console/StatStrip";
import ShipmentTable from "@/components/console/ShipmentTable";
import TempChart from "@/components/console/TempChart";
import AgentFeed from "@/components/console/AgentFeed";
import type { AgentEvent } from "@/components/console/AgentFeed";
import CertificateModal from "@/components/console/CertificateModal";

function makeLabels() {
  return Array.from({ length: 25 }, (_, i) =>
    i % 4 === 0 ? `${i * 10}m` : ""
  );
}

const LABELS = makeLabels();

export default function ConsolePage() {
  // Shipment state — use a mutable copy so we can update status/temp
  const [shipments, setShipments] = useState<Shipment[]>(() =>
    SHIPMENTS.map((s) => ({ ...s }))
  );
  const [selected, setSelected] = useState<Shipment>(shipments[0]);

  // Streaming state
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hint, setHint] = useState(
    "Press run to stream the live route for this load."
  );
  const idxRef = useRef(0);
  const alertedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Chart data
  const [fullSeries, setFullSeries] = useState<number[]>(() =>
    seriesFor(selected)
  );
  const [chartData, setChartData] = useState<
    { time: string; temp: number | null }[]
  >(() =>
    LABELS.map((l) => ({
      time: l,
      temp: selected.excursion ? null : fullSeries[LABELS.indexOf(l)] ?? null,
    }))
  );

  // Agent feed
  const [events, setEvents] = useState<AgentEvent[]>([
    {
      id: "init",
      type: "info",
      html: `<b>Watching ${selected.id}</b> against spec ${selected.spec}, fused with xentag item ID.<div class="meta">${selected.sku} · live Geotab trace</div>`,
    },
  ]);
  const [agentStatus, setAgentStatus] = useState("monitoring");
  const [agentStatusColor, setAgentStatusColor] = useState("");

  // Stats
  const [alertCount, setAlertCount] = useState(0);
  const [certCount, setCertCount] = useState(12);

  // Certificate
  const [certOpen, setCertOpen] = useState(false);
  const [certEnabled, setCertEnabled] = useState(false);
  const [certId, setCertId] = useState("");

  // Escape key closes modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && certOpen) setCertOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [certOpen]);

  // Clock
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---- helpers ----

  const addEvent = useCallback(
    (type: AgentEvent["type"], html: string) => {
      setEvents((prev) => [
        { id: `${Date.now()}-${Math.random()}`, type, html },
        ...prev,
      ]);
    },
    []
  );

  const resetRun = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setCompleted(false);
    idxRef.current = 0;
    alertedRef.current = false;
    setAlertCount(0);
    setCertEnabled(false);
    setAgentStatus("monitoring");
    setAgentStatusColor("");
    setHint("Press run to stream the live route for this load.");
  }, []);

  const selectShipment = useCallback(
    (s: Shipment) => {
      resetRun();
      // Reset excursion shipment status if needed
      setShipments((prev) =>
        prev.map((sh) =>
          sh.id === "VCH-4471"
            ? { ...sh, status: "transit" as const, temp: "5.2 \u00b0C" }
            : sh
        )
      );
      const series = seriesFor(s);
      setFullSeries(series);
      setSelected(s);

      // Pre-fill chart for non-excursion loads
      setChartData(
        LABELS.map((l, i) => ({
          time: l,
          temp: s.excursion ? null : series[i] ?? null,
        }))
      );

      setEvents([
        {
          id: "init",
          type: "info",
          html: `<b>Watching ${s.id}</b> against spec ${s.spec}, fused with xentag item ID.<div class="meta">${s.sku} · live Geotab trace</div>`,
        },
      ]);
    },
    [resetRun]
  );

  const onPlay = useCallback(() => {
    if (playing) return;
    if (completed) {
      selectShipment(selected);
      return;
    }
    setPlaying(true);
    setHint("Streaming live temperature from the Geotab sensor…");

    timerRef.current = setInterval(() => {
      const idx = idxRef.current;

      if (idx > fullSeries.length - 1) {
        // finish
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setPlaying(false);
        setCompleted(true);
        setCertEnabled(true);

        if (selected.excursion) {
          setHint(
            "Excursion captured. The agent drafted the report. Review and certify below."
          );
          addEvent(
            "ok",
            `<b>Load complete.</b> Integrity record assembled with the excursion flagged, ready for QA decision.`
          );
        } else {
          setHint("Completed in spec. Generate the verified certificate.");
          setAgentStatus("in spec");
          setAgentStatusColor("var(--ok)");
          addEvent(
            "ok",
            `<b>Completed in spec.</b> ${selected.id} stayed within ${selected.spec} for the full route.`
          );
        }
        return;
      }

      // Reveal next point
      setChartData((prev) =>
        prev.map((p, i) =>
          i === idx ? { ...p, temp: fullSeries[idx] } : p
        )
      );

      // Excursion detection
      if (
        selected.excursion &&
        fullSeries[idx] > selected.hi &&
        !alertedRef.current
      ) {
        alertedRef.current = true;
        setAlertCount(1);
        setAgentStatus("excursion detected");
        setAgentStatusColor("var(--danger)");

        addEvent(
          "exc",
          `<b>Excursion detected: ${fullSeries[idx].toFixed(
            1
          )} °C</b>, above the 8 °C limit at minute ${
            idx * 10
          }.<div class="meta">Alert routed to ops · ${selected.sku}</div>`
        );

        setTimeout(
          () =>
            addEvent(
              "warn",
              `<b>Predicted cause:</b> dwell at distribution hub, reefer door open 11 min.<div class="meta">Route + dwell model · confidence 0.86</div>`
            ),
          650
        );

        setTimeout(
          () =>
            addEvent(
              "info",
              `<b>Draft excursion report</b> prepared for QA review.<div class="draft"><b>GDP excursion summary:</b> VCH-4471 exceeded the 2–8 °C band for ~40 min, peak 12.1 °C. Affected: 14 pallets, item <b>8842-A</b>. Recommended action: quarantine pending stability assessment. Evidence: Geotab trace + xentag identity attached.</div>`
            ),
          1400
        );

        // Update shipment status in table
        setShipments((prev) =>
          prev.map((sh) =>
            sh.id === selected.id
              ? {
                  ...sh,
                  status: "exc" as const,
                  temp: `${fullSeries[idx].toFixed(1)} \u00b0C`,
                }
              : sh
          )
        );
      }

      idxRef.current = idx + 1;
    }, 180);
  }, [playing, completed, selected, fullSeries, addEvent, selectShipment]);

  const onReset = useCallback(() => {
    selectShipment(selected);
  }, [selected, selectShipment]);

  const onGenerateCert = useCallback(() => {
    const id = `${selected.id}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;
    setCertId(id);
    setCertOpen(true);
  }, [selected]);

  const onApproveCert = useCallback(() => {
    setCertOpen(false);
    setCertCount((prev) => prev + 1);
    addEvent(
      "ok",
      "<b>Certificate published</b> to the marketplace record. Visible to receiver, insurer, and auditor."
    );
  }, [addEvent]);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="max-h-screen overflow-y-auto bg-paper-2 px-4 py-5 sm:px-[30px] sm:py-6">
        {/* Top bar */}
        <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3.5">
          <div>
            <h2 className="text-[22px] font-semibold">Live shipments</h2>
            <p className="mt-0.5 text-[13px] text-grey">
              Real-time temperature integrity across active loads. Select a
              shipment to inspect.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white px-3 py-[7px] font-mono text-[12px] text-grey">
            Geotab feed · <b className="text-ink">{clock || "live"}</b>
          </div>
        </div>

        <StatStrip alertCount={alertCount} certCount={certCount} />

        <div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-[1.15fr_1fr]">
          {/* Left column */}
          <div className="flex flex-col gap-[18px]">
            <ShipmentTable
              shipments={shipments}
              selected={selected}
              onSelect={selectShipment}
            />
            <TempChart
              selected={selected}
              chartData={chartData}
              fullSeries={fullSeries}
              playing={playing}
              completed={completed}
              onPlay={onPlay}
              onReset={onReset}
              hint={hint}
            />
          </div>

          {/* Right column */}
          <AgentFeed
            events={events}
            agentStatus={agentStatus}
            agentStatusColor={agentStatusColor}
            certEnabled={certEnabled}
            onGenerateCert={onGenerateCert}
          />
        </div>

        {/* Mobile back link */}
        <div className="mt-6 text-center md:hidden">
          <a href="/" className="text-[13px] text-grey hover:text-ink">
            ← Back to site
          </a>
        </div>
      </main>

      <CertificateModal
        open={certOpen}
        shipment={selected}
        certId={certId}
        onClose={() => setCertOpen(false)}
        onApprove={onApproveCert}
      />
    </div>
  );
}
