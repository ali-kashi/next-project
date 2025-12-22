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

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      return null;
    }

    // بررسی اینکه آیا response واقعاً JSON است
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Response is not JSON");
      return null;
    }

    const text = await res.text();
    
    // تلاش برای parse کردن
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Response text:", text.substring(0, 200));
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function Home() {
  const products = await getProducts();

  // اگر products null باشد، صفحه خالی یا fallback نشان دهید
  if (!products) {
    return (
      <div className="home">
        <h1>Welcome to Our Store</h1>
        <p>Currently unable to load products. Please try again later.</p>
        {/* میتوانید products خالی ارسال کنید */}
        <ProductsList products={[]} />
      </div>
    );
  }

  return (
    <div className="home">
      <ProductsList products={products} />
    </div>
  );
}