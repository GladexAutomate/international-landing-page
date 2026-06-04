import { ThemeProvider, useTheme } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import HeroSection from "../components/HeroSection";
import GdxSearchSection from "../components/GdxSearchSection";
import DestinationsGrid from "../components/DestinationsGrid";

function HomeContent() {
  const { isDark } = useTheme();
  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: isDark ? "#080808" : "#F5F5F5" }}
    >
      <ThemeToggle />
      <HeroSection />
      <GdxSearchSection isDark={isDark} />
      <DestinationsGrid />
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