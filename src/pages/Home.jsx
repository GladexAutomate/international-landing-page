import { ThemeProvider } from "../lib/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import GdxSearchSection from "../components/GdxSearchSection";

export default function Home() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <GdxSearchSection />
    </ThemeProvider>
  );
}
