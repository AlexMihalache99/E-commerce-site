import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, items } = req.body;

    try {
      const order = await prisma.order.create({
        data: {
          userId,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to place order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
