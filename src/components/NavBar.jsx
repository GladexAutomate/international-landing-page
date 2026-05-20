import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Media", href: "#media" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-panel" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gladex-orange rounded-sm flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#080808]" />
            </div>
            <div className="leading-none">
              <span className="font-condensed text-2xl font-bold text-white tracking-widest">
                GLADEX
              </span>
              <div className="font-condensed text-[10px] font-semibold tracking-[0.25em] text-gladex-orange uppercase">
                International
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm font-medium text-chrome hover:text-white transition-colors duration-200 tracking-wider uppercase relative group focus-ring"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gladex-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="font-condensed font-semibold text-sm tracking-widest uppercase px-6 py-2.5 bg-gladex-orange text-[#080808] rounded-sm hover:bg-orange-400 transition-all duration-200 focus-ring min-h-[48px]"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white focus-ring p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-panel pt-20 px-6 flex flex-col"
            style={{ backgroundColor: "rgba(8,8,8,0.97)" }}
          >
            <div className="flex flex-col gap-6 pt-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="font-condensed text-4xl font-bold text-white text-left hover:text-gladex-orange transition-colors tracking-wider"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contact")}
                className="mt-4 font-condensed font-bold text-xl tracking-widest uppercase px-8 py-4 bg-gladex-orange text-[#080808] rounded-sm w-full min-h-[56px]"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}