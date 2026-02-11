import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TrackingForm } from "@/components/TrackingForm";
import { motion } from "framer-motion";

export default function Tracking() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">Rastreamento</h1>
              <p className="text-lg text-slate-600">
                Acompanhe o status da sua entrega em tempo real. Digite o código de rastreio fornecido no momento da contratação.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <TrackingForm />
              
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-400">
                  Dúvidas sobre seu rastreio? <a href="https://wa.me/5511999999999" className="text-secondary font-semibold hover:underline">Fale conosco</a>
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center opacity-60">
            <div className="p-6">
              <div className="text-4xl font-bold text-slate-300 mb-2">01</div>
              <h3 className="font-bold text-primary mb-2">Coleta</h3>
              <p className="text-sm text-slate-500">Retiramos sua encomenda no local combinado</p>
            </div>
            <div className="p-6 border-x border-slate-200">
              <div className="text-4xl font-bold text-slate-300 mb-2">02</div>
              <h3 className="font-bold text-primary mb-2">Transporte</h3>
              <p className="text-sm text-slate-500">Deslocamento rápido e seguro até o destino</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-slate-300 mb-2">03</div>
              <h3 className="font-bold text-primary mb-2">Entrega</h3>
              <p className="text-sm text-slate-500">Confirmação de recebimento no local</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
