import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import ProblemStats from "@/components/landing/ProblemStats";
import HowItWorks from "@/components/landing/HowItWorks";
import DataAdvantage from "@/components/landing/DataAdvantage";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <ProblemStats />
      <HowItWorks />
      <DataAdvantage />
      <FinalCta />
      <Footer />
    </>
  );
}
