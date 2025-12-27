"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContexts } from "@/app/contexts/CartContexts";

export default function ProductClient({ product }) {
  const { addToCart } = useContext(CartContexts);

  return (
    <div className="product-detail">
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "auto" }}
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {product.rating && <p>⭐ {product.rating.rate}</p>}
      <p>${product.price}</p>

      <button
        onClick={() => {
          addToCart(product);
          alert(`product add ${product.title}`);
        }}
      >
        Add to Cart
      </button>

      <br />
      <Link href="/">Back to shop</Link>
    </div>
  );
}
