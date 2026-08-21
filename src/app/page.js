import HeroBanner from "@/components/HomeBanner";
import About from "./about/page";
import Contact from "./contact/page";
import WhyChooseUs from "@/components/WhyChooseUs";
import PageDivider from "@/components/PageDevider";
import Stats from "@/components/Stats";
import AdvertiseCard from "@/components/AdvertiseCard";
import LatestTickets from "@/components/LatestTickets";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PageDivider />
      <Stats />
      <PageDivider />
      <AdvertiseCard />
      <PageDivider />
      <WhyChooseUs />
      <PageDivider />
      <About />
      <PageDivider />
      <LatestTickets />
      <PageDivider />
      <Contact />
    </div>
  );
}
