"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Shipment } from "@/lib/shipments";

interface TempChartProps {
  selected: Shipment;
  chartData: { time: string; temp: number | null }[];
  fullSeries: number[];
  playing: boolean;
  completed: boolean;
  onPlay: () => void;
  onReset: () => void;
  hint: string;
}

export default function TempChart({
  selected,
  chartData,
  fullSeries,
  playing,
  completed,
  onPlay,
  onReset,
  hint,
}: TempChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const yMin = selected.lo - (selected.hi - selected.lo) * 0.5;
  const yMax = selected.hi + (selected.hi - selected.lo) * 0.8;

  return (
    <div className="rounded-[12px] border border-line bg-white">
      <h3 className="flex items-center justify-between border-b border-line px-[18px] py-[15px] text-[14px] font-semibold">
        Temperature trace - {selected.id}
        <span className="text-[11.5px] font-normal text-grey">
          Spec: {selected.spec}
        </span>
      </h3>
      <div className="px-[18px] py-4">
        <div className="h-[230px]">
          {mounted ? <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#EEF2F5"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[yMin, yMax]}
                tick={{ fontSize: 11, fill: "#6B6B6B" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}°`}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #E6E6E6",
                }}
                formatter={(value) => [`${value}°C`, "Temp"]}
              />
              <ReferenceArea
                y1={selected.lo}
                y2={selected.hi}
                fill="rgba(26,143,107,0.08)"
                strokeOpacity={0}
              />
              <ReferenceLine
                y={selected.hi}
                stroke="#D64545"
                strokeWidth={1.6}
                strokeDasharray="6 5"
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#0E0E0E"
                strokeWidth={2.4}
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer> : <div className="h-full w-full" />}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-4 text-[11.5px] text-grey">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-[3px] w-[14px] rounded-sm bg-ink" />
            Measured temp
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0 w-4 border-t-2 border-dashed border-danger" />
            Spec limit ({selected.hi}°C)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-[3px] w-[14px] rounded-sm bg-ok/30" />
            In-spec band
          </span>
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            onClick={onPlay}
            disabled={playing}
            className="inline-flex items-center gap-[7px] rounded-[9px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#A9BDC9]"
          >
            {playing ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-[15px] w-[15px]"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                Streaming…
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[15px] w-[15px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run live feed
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-[7px] rounded-[9px] border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-grey"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[15px] w-[15px]"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
          <span className="text-[12px] text-grey">{hint}</span>
        </div>
      </div>
    </div>
  );
}
