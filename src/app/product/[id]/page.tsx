"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: { name: string };
  imageUrl: string;
}

export default function ProductPage() {
  const id = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  console.log(id);
  useEffect(() => {
    if(!id) return;
    fetch(`/api/products/${id.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
    <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
    <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
    <p className="text-gray-600 mt-2">${product.price}</p>
    <p className="mt-4">{product.description}</p>
  </div>
  );

}