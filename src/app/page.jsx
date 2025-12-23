import ProductsList from "./components/ProductsList";

export const revalidate = 60;

export function generateMetadata() {
  return {
    title: "Home | Your online shop",
    description: "Browse amazing products...",
    openGraph: {
      title: "Home | Your online shop social media",
      description: "Browse amazing products social media",
    },
  };
}

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error("❌ BASE_URL is not defined");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Home fetch error:", err.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="home">
      <ProductsList products={products} />
    </div>
  );
}
