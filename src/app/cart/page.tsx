"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
      <Link href="/">
        <button className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-md">Continue Shopping</button>
      </Link>
    </div>
  );
}
