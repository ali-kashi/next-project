"use client";
import Link from "next/link";
import { useContext } from "react";
import { CartContexts } from "../contexts/CartContexts";

export default function Product({product}){
    let {addToCart} = useContext(CartContexts)
    let context = useContext(CartContexts);
console.log("CartContexts in Cart.jsx:", context);

    return(
        <div className="product-item">
              <img src={product.image}/>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
              <button onClick={ ()=>{addToCart(product)
              alert("product add "+ product.title)
            }}>Add to Card</button>
              <Link href={`products/${product.id}`}>view more</Link>
        </div>
    )
}