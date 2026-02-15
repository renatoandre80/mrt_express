import { db } from "./db";
import {
  contactRequests,
  orders,
  type InsertContactRequest,
  type ContactRequest,
  type Order,
  type InsertOrder
} from "../shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactRequest(contact: InsertContactRequest): Promise<ContactRequest>;
  getOrderByTrackingCode(code: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>; // For seeding
}

export class DatabaseStorage implements IStorage {
  async createContactRequest(contact: InsertContactRequest): Promise<ContactRequest> {
    const [newContact] = await db.insert(contactRequests).values(contact).returning();
    return newContact;
  }

  async getOrderByTrackingCode(code: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.trackingCode, code));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
}

export const storage = new DatabaseStorage();
