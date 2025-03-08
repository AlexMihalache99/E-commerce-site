import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    try {
      const products = await prisma.product.findMany({
        include: { category: true }
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }
  res.status(405).json({ error: "Invalid request" });
}
