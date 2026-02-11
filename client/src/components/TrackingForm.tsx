import { useState } from "react";
import { useTrackOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TrackingForm() {
  const [code, setCode] = useState("");
  const [searchCode, setSearchCode] = useState<string | null>(null);
  
  const { data: order, isLoading, error, isFetched } = useTrackOrder(searchCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setSearchCode(code.trim());
    }
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'delivered':
        return { icon: PackageCheck, color: "text-green-500", bg: "bg-green-100", label: "Entregue" };
      case 'in_transit':
        return { icon: Truck, color: "text-blue-500", bg: "bg-blue-100", label: "Em Trânsito" };
      case 'pending':
        return { icon: Clock, color: "text-amber-500", bg: "bg-amber-100", label: "Pendente" };
      default:
        return { icon: PackageCheck, color: "text-gray-500", bg: "bg-gray-100", label: "Desconhecido" };
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Digite seu código de rastreio (ex: TRK12345)"
          className="pr-32 h-14 rounded-2xl shadow-lg border-2 border-transparent focus:border-secondary transition-all text-lg pl-6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !code}
          className="absolute right-2 top-2 h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
        >
          {isLoading ? "Buscando..." : "Rastrear"}
        </Button>
      </form>

      <AnimatePresence>
        {isFetched && order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Card className="p-6 border-l-4 border-l-secondary shadow-xl rounded-xl bg-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Search className="w-24 h-24" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-primary">Pedido #{order.trackingCode}</h3>
                    <p className="text-sm text-slate-500">Localização atual: {order.location || "N/A"}</p>
                  </div>
                  {(() => {
                    const config = getStatusConfig(order.status);
                    const Icon = config.icon;
                    return (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${config.bg} ${config.color}`}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    );
                  })()}
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Clock className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Última Atualização</p>
                      <p className="font-medium text-slate-700">
                        {order.updatedAt ? new Date(order.updatedAt).toLocaleString('pt-BR') : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {isFetched && !order && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 text-center text-sm font-medium border border-red-100"
          >
            Pedido não encontrado. Verifique o código e tente novamente.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
