import Link from "next/link";

const products = [
  { id: 1, name: "Custom Pillow", price: "$25" },
  { id: 2, name: "Modern Chair", price: "$150" }
];

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Our Products</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="p-4 border rounded-lg cursor-pointer hover:shadow-lg">
              <h2 className="text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
