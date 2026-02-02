import { useEffect, useState } from "react";

// 1️⃣ Define the type of data you expect
interface Product {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 5️⃣ Render data
  return (
    <div>
      {products.map((products) => (
        <div key={products.id} style={{ marginBottom: "16px" }}>
          <h3>{products.title}</h3>
          <p>{products.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;