export const revalidate = 60;

/* ---------- helpers ---------- */

const APIS = [
  {
      name: "fakestoreapi-electronics",
      url: "https://fakestoreapi.com/products/category/electronics?limit=8",
      pick: (d) => d,
  },
  {
    name: "fakestoreapi",
    url: "https://fakestoreapi.com/products?limit=8",
    pick: (d) => d,
  },
];

const normalize = (p, source) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description || "",
  category: p.category || "",
  image: p.image || p.thumbnail || (Array.isArray(p.images) ? p.images[0] : ""),
  rating: p.rating || { rate: 0, count: 0 },
  _source: source,
  _fetchedAt: new Date().toISOString(),
});

async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  const res = await fetch(url, {
    signal: controller.signal,
    headers: { Accept: "application/json" },
  });

  clearTimeout(timer);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

/* ---------- handler ---------- */

export async function GET() {
  for (const api of APIS) {
    try {
      const data = await fetchWithTimeout(api.url);
      const products = api.pick(data).map((p) => normalize(p, api.name));

      return Response.json(products, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      });
    } catch (_) {
      continue;
    }
  }

  return Response.json(getFallbackProducts(), {
    headers: {
      "Cache-Control": "public, s-maxage=300",
      "X-Data-Source": "fallback",
    },
  });
}

/* ---------- fallback ---------- */

function getFallbackProducts() {
  return [
    {
      id: 1,
      title: "Premium Backpack",
      price: 49.99,
      description: "Water-resistant backpack with laptop compartment",
      category: "men's clothing",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: { rate: 4.5, count: 120 },
      _source: "fallback",
      _fetchedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Casual Cotton T-Shirt",
      price: 22.99,
      description: "Soft 100% cotton t-shirt",
      category: "men's clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      rating: { rate: 4.2, count: 89 },
      _source: "fallback",
      _fetchedAt: new Date().toISOString(),
    },
  ];
}
