import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import DestinationGrid from "../components/DestinationGrid";
import FeaturedExperiences from "../components/FeaturedExperiences";
import MediaShowcase from "../components/MediaShowcase";
import Testimonials from "../components/Testimonials";
import ContactFooter from "../components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808" }}>
      <NavBar />
      <HeroSection />
      <DestinationGrid />
      <FeaturedExperiences />
      <MediaShowcase />
      <Testimonials />
      <ContactFooter />
    </div>
  );
}