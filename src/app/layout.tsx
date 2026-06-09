import type { Metadata } from "next";
import { Darker_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vouch - Verified cold-chain integrity",
  description:
    "Prove every temperature-sensitive shipment was handled correctly, automatically, and turn that proof into a record buyers, insurers, and regulators trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${darkerGrotesque.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="main">{children}</div>
      </body>
    </html>
  );
}
