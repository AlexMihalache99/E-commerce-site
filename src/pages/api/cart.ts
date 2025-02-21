import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;
    
    try {
      const cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity }
      });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  } else if (req.method === "DELETE") {
    const { cartItemId } = req.body;
    
    try {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}