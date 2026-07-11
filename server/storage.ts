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
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async createContactRequest(contact: InsertContactRequest): Promise<ContactRequest> {
    const [newContact] = await db!.insert(contactRequests).values(contact).returning();
    return newContact;
  }

  async getOrderByTrackingCode(code: string): Promise<Order | undefined> {
    const [order] = await db!.select().from(orders).where(eq(orders.trackingCode, code));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db!.insert(orders).values(order).returning();
    return newOrder;
  }
}

export class MemStorage implements IStorage {
  private contacts: ContactRequest[] = [];
  private orders: Order[] = [];
  private nextId = 1;

  async createContactRequest(contact: InsertContactRequest): Promise<ContactRequest> {
    const record: ContactRequest = { id: this.nextId++, createdAt: new Date(), ...contact } as ContactRequest;
    this.contacts.push(record);
    return record;
  }

  async getOrderByTrackingCode(code: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.trackingCode === code);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const record: Order = { id: this.nextId++, createdAt: new Date(), ...order } as Order;
    this.orders.push(record);
    return record;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemStorage();
