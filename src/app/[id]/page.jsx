import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({params}){

  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store"
  });
  const product = await res.json();

    return {
        title: product.title,
        description: product.description,
        openGraph:{
            title: product.title,
            description: product.description,
        }
    }
}

export default async function ProductDetail({params}) {

  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    return <h1>Product not found</h1>;
  }

  const product = await res.json();

  return (
    <div className="product-detail">
      <img src={product.image}/>
      <h2>{product.title}</h2>
      <h4>{product.description}</h4>
      <h5>{product.rating.rate}</h5>
      <p>${product.price}</p>

      <button>Add to Cart</button>

      <br />
      <Link href="/">Back to shop</Link>
    </div>
  );
}
