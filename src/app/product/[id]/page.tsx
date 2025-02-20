export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Product {params.id}</h1>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add to Cart</button>
    </div>
  );
}
