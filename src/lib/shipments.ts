export interface Shipment {
  id: string;
  prod: string;
  sku: string;
  spec: string;
  hi: number;
  lo: number;
  status: "ok" | "transit" | "exc";
  temp: string;
  excursion: boolean;
}

export const SHIPMENTS: Shipment[] = [
  {
    id: "VCH-4471",
    prod: "mRNA vaccine",
    sku: "xentag \u00b7 8842-A",
    spec: "2\u20138 \u00b0C",
    hi: 8,
    lo: 2,
    status: "transit",
    temp: "5.2 \u00b0C",
    excursion: true,
  },
  {
    id: "VCH-4470",
    prod: "Insulin analog",
    sku: "xentag \u00b7 7710-C",
    spec: "2\u20138 \u00b0C",
    hi: 8,
    lo: 2,
    status: "ok",
    temp: "4.6 \u00b0C",
    excursion: false,
  },
  {
    id: "VCH-4468",
    prod: "Monoclonal antibody",
    sku: "xentag \u00b7 6029-B",
    spec: "2\u20138 \u00b0C",
    hi: 8,
    lo: 2,
    status: "transit",
    temp: "3.9 \u00b0C",
    excursion: false,
  },
  {
    id: "VCH-4465",
    prod: "Cell therapy",
    sku: "xentag \u00b7 5511-D",
    spec: "\u2013150 \u00b0C",
    hi: -120,
    lo: -196,
    status: "transit",
    temp: "\u2013152 \u00b0C",
    excursion: false,
  },
  {
    id: "VCH-4462",
    prod: "Blood plasma",
    sku: "xentag \u00b7 4406-E",
    spec: "\u201318 \u00b0C",
    hi: -15,
    lo: -25,
    status: "ok",
    temp: "\u201319 \u00b0C",
    excursion: false,
  },
];

export function seriesFor(s: Shipment): number[] {
  const pts: number[] = [];
  const mid = (s.hi + s.lo) / 2;
  for (let i = 0; i <= 24; i++) {
    let v =
      mid +
      Math.sin(i / 2.4) * (s.hi - s.lo) * 0.1 +
      (Math.random() - 0.5) * (s.hi - s.lo) * 0.06;
    if (s.excursion && i >= 13 && i <= 17) {
      const peak = [8.6, 10.4, 12.1, 11.0, 9.1];
      v = peak[i - 13];
    }
    pts.push(+v.toFixed(1));
  }
  return pts;
}
