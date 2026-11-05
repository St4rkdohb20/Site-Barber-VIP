import { CinematicPreloader } from "@/components/animations/CinematicPreloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Essence } from "@/components/sections/Essence";
import { Club } from "@/components/sections/Club";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { Conversion } from "@/components/sections/Conversion";

export default function Home() {
  return (
    <>
      <CinematicPreloader />
      <Header />
      <main>
        <Hero />
        <Services />
        <Essence />
        <Club />
        <Team />
        <Portfolio />
        <Conversion />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
