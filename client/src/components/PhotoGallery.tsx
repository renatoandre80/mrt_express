import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const photos = [
  {
    src: "/images/IMG-20260710-WA0047.jpg",
    alt: "Coleta profissional de encomendas com documentação de entrega",
    caption: "Coleta com Documentação",
    description: "Cada entrega começa com organização. Encomendas conferidas e documentadas antes de sair.",
  },
  {
    src: "/images/IMG-20260710-WA0048.jpg",
    alt: "Baú da moto carregado com pacotes organizados prontos para entrega",
    caption: "Carga Organizada",
    description: "Baú equipado e organizado para transportar suas encomendas com segurança.",
  },
  {
    src: "/images/IMG-20260710-WA0049.jpg",
    alt: "Motofretista realizando entrega de encomenda ao cliente na rua",
    caption: "Entrega no Endereço",
    description: "Chegamos até você. Entregas ágeis direto na porta do cliente.",
  },
  {
    src: "/images/IMG-20260710-WA0050.jpg",
    alt: "Moto de entregas MRT Express estacionada em frente à LATAM Cargo",
    caption: "Operação Cargo",
    description: "Atendemos embarques e coletas em terminais de carga como LATAM Cargo.",
  },
  {
    src: "/images/IMG-20260710-WA0051.jpg",
    alt: "Entrega realizada em cartório, mostrando diversidade de destinos atendidos",
    caption: "Todo Tipo de Destino",
    description: "Cartórios, clínicas, empresas — atendemos qualquer endereço com pontualidade.",
  },
];

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );

  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <section id="galeria" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            <Camera className="w-4 h-4" />
            Atividades Profissionais
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-primary">
            Nosso Trabalho em Ação
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Confiança se constrói com transparência. Veja como realizamos cada entrega com dedicação e profissionalismo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-slate-100 ${
                idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => openLightbox(idx)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white font-bold text-lg leading-tight">{photo.caption}</p>
                <p className="text-slate-200 text-sm mt-1 leading-snug">{photo.description}</p>
              </div>

              {/* Badge */}
              <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              aria-label="Fechar"
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              aria-label="Anterior"
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl w-full mx-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="text-center mt-4">
                <p className="text-white font-bold text-lg">{photos[lightboxIndex].caption}</p>
                <p className="text-slate-300 text-sm mt-1">{photos[lightboxIndex].description}</p>
                <p className="text-slate-500 text-xs mt-3">
                  {lightboxIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            <button
              aria-label="Próximo"
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
