import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1.5 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">
                MRT <span className="text-secondary">EXPRESS</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Soluções logísticas rápidas e seguras para sua empresa e dia a dia. Entregamos confiança e eficiência em cada quilômetro.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-display">Links Rápidos</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-secondary transition-colors">Início</Link></li>
              <li><Link href="/tracking" className="hover:text-secondary transition-colors">Rastrear Pedido</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contato</Link></li>
              <li><a href="#services" className="hover:text-secondary transition-colors">Nossos Serviços</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-display">Serviços</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Entregas Rápidas</li>
              <li>Contratos Mensais</li>
              <li>Logística E-commerce</li>
              <li>Entregas Urgentes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-display">Contato</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>Rua das Entregas, 123<br />São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>contato@mrtexpress.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MRT Express. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
