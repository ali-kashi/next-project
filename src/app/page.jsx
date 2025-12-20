import ProductsList from "./components/ProductsList";

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

// 🔁 ISR: هر 60 ثانیه یک‌بار آپدیت
export const revalidate = 60;

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <div className="home">
      <ProductsList products={products} />
    </div>
  );
}
