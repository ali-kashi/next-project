export async function GET(_, { params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://dummyjson.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const p = await res.json();

    const product = {
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description || "",
      category: p.category || "",
      image: p.thumbnail || p.images?.[0] || "",
      rating: p.rating || { rate: 0, count: 0 },
    };

    return Response.json(product);
  } catch (err) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }
}
