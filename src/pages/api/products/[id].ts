import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const product = await prisma.product.findUnique({
        where: { id: String(id) },
      });
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
