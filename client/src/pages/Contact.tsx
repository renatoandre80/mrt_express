import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContact } from "@/hooks/use-contact";
import { insertContactSchema, type InsertContactRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Mail } from "lucide-react";

export default function Contact() {
  const form = useForm<InsertContactRequest>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const { mutate, isPending } = useCreateContact();

  const onSubmit = (data: InsertContactRequest) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navigation />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">Fale Conosco</h1>
            <p className="text-lg text-slate-600">
              Estamos prontos para atender sua demanda. Preencha o formulário abaixo ou nos chame diretamente no WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-primary mb-6 font-display">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-3 rounded-xl text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Telefone / WhatsApp</h4>
                      <p className="text-slate-600">(11) 94396-0008</p>
                      <p className="text-sm text-slate-400 mt-1">Atendimento comercial 08h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-3 rounded-xl text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Email</h4>
                      <p className="text-slate-600">marretamotoca09@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-3 rounded-xl text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Localização</h4>
                      <p className="text-slate-600">Rua das Entregas, 123 - Centro</p>
                      <p className="text-slate-600">São Paulo - SP, 01000-000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-2xl shadow-lg text-white relative overflow-hidden group cursor-pointer" onClick={() => window.open("https://wa.me/5511943960008", "_blank")}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-bold font-display mb-2 relative z-10">Precisa de urgência?</h3>
                <p className="text-white/90 mb-6 relative z-10">Nosso time está online no WhatsApp para te atender agora mesmo.</p>
                <Button variant="secondary" className="bg-white text-secondary hover:bg-white/90 font-bold rounded-full w-full">
                  Chamar no WhatsApp
                </Button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-primary mb-6 font-display">Envie uma mensagem</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone / WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Como podemos ajudar?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva sua necessidade..." 
                              className="min-h-[150px] resize-none rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors p-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                      disabled={isPending}
                    >
                      {isPending ? "Enviando..." : (
                        <>
                          Enviar Mensagem <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
