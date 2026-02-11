import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Package, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/#services" },
    { name: "Rastrear", href: "/tracking" },
    { name: "Contato", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-secondary transition-colors duration-300">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl md:text-2xl font-bold font-display tracking-tight ${scrolled ? "text-primary" : "text-primary md:text-white"}`}>
              MRT <span className="text-secondary">EXPRESS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`font-medium text-sm transition-colors hover:text-secondary ${
                  scrolled ? "text-slate-600" : "text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              size="sm" 
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20 rounded-full px-6 font-semibold"
              onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
            >
              <Phone className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-slate-700 py-2 border-b border-gray-50 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl"
                onClick={() => {
                  window.open("https://wa.me/5511999999999", "_blank");
                  setIsOpen(false);
                }}
              >
                <Phone className="w-4 h-4 mr-2" /> Falar no WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
