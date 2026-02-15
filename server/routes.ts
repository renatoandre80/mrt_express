import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const contact = await storage.createContactRequest(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.orders.track.path, async (req, res) => {
    const code = req.params.code;
    const order = await storage.getOrderByTrackingCode(code);
    if (!order) {
      return res.status(404).json({ message: 'Encomenda não encontrada' });
    }
    res.json(order);
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingOrder = await storage.getOrderByTrackingCode("MRT123456");
  if (!existingOrder) {
    await storage.createOrder({
      trackingCode: "MRT123456",
      status: "Em trânsito",
      location: "São Paulo - SP",
    });
    await storage.createOrder({
      trackingCode: "MRT999999",
      status: "Entregue",
      location: "Rio de Janeiro - RJ",
    });
  }
}
