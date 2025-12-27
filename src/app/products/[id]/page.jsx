import Link from "next/link";

export const revalidate = 60;

/* ---------- metadata ---------- */
export async function generateMetadata({ params }) { // ✅ بدون await
  const { id } = await params;
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) return { title: "Product" };

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return { title: "Product not found" };

  const product = await res.json();

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

/* ---------- page ---------- */
export default async function ProductDetail({ params }) { // ✅ بدون await
  const { id } = await params;
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) return <h1>Server misconfigured</h1>;

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return <h1>Product not found</h1>;

  const product = await res.json();

  return (
    <div className="product-detail">
      <img
        src={product.image}
        alt={product.title}
        style={{
        display: "block",
        width: "100%",      // عرض container
        height: "auto",     // نسبت تصویر حفظ شود
      }}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {product.rating && <p>⭐ {product.rating.rate}</p>}
      <p>${product.price}</p>
      <button>Add to Cart</button>
      <br />
      <Link href="/">Back to shop</Link>
    </div>
  );
}
