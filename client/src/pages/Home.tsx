import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Clock, Package, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Unsplash image for logistics background
// https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: "Agilidade Profissional",
      desc: "Entregas expressas com prazos cumpridos rigorosamente. Seu tempo é nossa prioridade."
    },
    {
      icon: ShieldCheck,
      title: "Segurança Total",
      desc: "Profissionais credenciados e segurados. Sua encomenda tratada com o máximo cuidado."
    },
    {
      icon: MapPin,
      title: "Rastreamento Real",
      desc: "Acompanhe cada etapa da sua entrega em tempo real através do nosso sistema."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 z-10" />
          {/* Warehouse/Logistics Image */}
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            alt="Logistics Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-secondary-foreground/90">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Disponível para entregas imediatas
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight text-balance">
              Entregas <span className="text-secondary">Rápidas</span> e <span className="text-secondary">Seguras</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Motofretista credenciado com anos de experiência. Garantimos confiança, eficiência e preços justos para suas encomendas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-whatsapp/25 hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.open("https://wa.me/5511943960008", "_blank")}
              >
                Chamar no WhatsApp
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/tracking">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-14 text-lg backdrop-blur-sm"
                >
                  Rastrear Pedido
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Contact Info Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-secondary/30 transition-all duration-700"></div>

              <h3 className="text-2xl font-bold text-white mb-6 font-display">Entre em Contato</h3>

              <div className="space-y-6 relative z-10">
                <a
                  href="https://wa.me/5511943960008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/80 hover:text-whatsapp transition-colors group/item"
                >
                  <div className="bg-whatsapp/20 p-3 rounded-xl group-hover/item:bg-whatsapp/30 transition-colors">
                    <Phone className="w-6 h-6 text-whatsapp" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">WhatsApp</p>
                    <p className="text-lg">(11) 94396-0008</p>
                  </div>
                </a>

                <a
                  href="mailto:marretamotoca09@gmail.com"
                  className="flex items-center gap-4 text-white/80 hover:text-secondary transition-colors group/item"
                >
                  <div className="bg-secondary/20 p-3 rounded-xl group-hover/item:bg-secondary/30 transition-colors">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Email</p>
                    <p className="text-lg">marretamotoca09@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-between text-white/60 text-sm">
                <span>Últimas entregas realizadas:</span>
                <span className="text-secondary font-bold text-lg">+12.5k</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs uppercase tracking-widest">Descubra Mais</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-secondary to-transparent"></div>
        </motion.div>
      </section>

      {/* Services/Features Section */}
      <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-primary">Por que escolher a MRT Express?</h2>
            <p className="text-slate-600">Compromisso com a excelência em cada entrega, garantindo a satisfação total de nossos parceiros.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Pronto para enviar?</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
            Solicite sua coleta agora mesmo pelo WhatsApp e tenha um motoboy parceiro à sua disposição em minutos.
          </p>
          <Button 
            size="lg" 
            className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground rounded-full px-10 h-16 text-xl font-bold shadow-2xl shadow-whatsapp/20 hover:scale-105 transition-all duration-300"
            onClick={() => window.open("https://wa.me/5511943960008", "_blank")}
          >
            Fazer Cotação Agora
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
