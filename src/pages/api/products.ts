import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
