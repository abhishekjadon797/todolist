import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  { id: 1, name: "Product 1", price: 50, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: 80, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", price: 100, image: "https://via.placeholder.com/150" }
];

export default function Ecommerce() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToWishlist = (product) => {
    if (!wishlist.includes(product)) {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 shadow-md border rounded-lg">
          <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 rounded flex items-center gap-2">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button onClick={() => addToWishlist(product)} className="border p-2 rounded flex items-center gap-2">
              <Heart size={16} /> Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}