import express, { type Request, Response, NextFunction } from "express";
import { storage } from "../server/storage";
import { api } from "../shared/routes";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact route
app.post(api.contact.create.path, async (req: Request, res: Response) => {
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
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Orders tracking route
app.get(api.orders.track.path, async (req: Request, res: Response) => {
  const code = req.params.code;
  const order = await storage.getOrderByTrackingCode(code);
  if (!order) {
    return res.status(404).json({ message: 'Encomenda não encontrada' });
  }
  res.json(order);
});

export default app;
