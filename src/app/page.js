import HeroBanner from "@/components/HomeBanner";
import About from "./about/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <About />
      <Contact />
    </div>
  );
}
