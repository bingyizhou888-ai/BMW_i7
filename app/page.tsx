import Hero from "./_components/Hero";
import StatsBar from "./_components/StatsBar";
import Features from "./_components/Features";
import Trims from "./_components/Trims";
import ParallaxBanner from "./_components/ParallaxBanner";
import Gallery from "./_components/Gallery";
import Finance from "./_components/Finance";
import BlogTeaser from "./_components/BlogTeaser";
import TestDriveSection from "./_components/TestDriveSection";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <StatsBar />
      <Features />
      <ParallaxBanner />
      <Trims />
      <Gallery />
      <Finance />
      <BlogTeaser />
      <TestDriveSection />
    </main>
  );
}
