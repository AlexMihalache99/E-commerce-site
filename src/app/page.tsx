"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: { name: string };
  imageUrl: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md" />
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-500 mt-2">{product.category.name}</p>
          <p className="text-gray-600">${product.price}</p>
          <Link href={`/product/${product.id}`}>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md">View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
