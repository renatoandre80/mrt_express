import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useState } from "react";

export function useTrackOrder(trackingCode: string | null) {
  return useQuery({
    queryKey: [api.orders.track.path, trackingCode],
    queryFn: async () => {
      if (!trackingCode) return null;
      
      const url = buildUrl(api.orders.track.path, { code: trackingCode });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      
      if (!res.ok) {
        throw new Error("Erro ao rastrear pedido");
      }
      
      return api.orders.track.responses[200].parse(await res.json());
    },
    enabled: !!trackingCode && trackingCode.length > 0,
    retry: false,
  });
}
