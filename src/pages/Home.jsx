import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import HeroSection from "../components/HeroSection";
import WhereToGoSection from "../components/WhereToGoSection";
import Testimonials from "../components/Testimonials";
import ContactFooter from "../components/ContactFooter";

function HomeContent() {
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: isDark ? "#080808" : "#FFF5E9" }}
    >
      <ThemeToggle />
      <HeroSection />
      <WhereToGoSection />
      <Testimonials />
      <ContactFooter />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}