import ProductClient from "./ProductClient";

export const revalidate = 60;

/* ---------- metadata ---------- */
export async function generateMetadata({ params }) {
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
export default async function ProductDetail({ params }) {
  const { id } = await params;
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) return <h1>Server misconfigured</h1>;

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return <h1>Product not found</h1>;

  const product = await res.json();

  return <ProductClient product={product} />;
}
