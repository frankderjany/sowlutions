import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
}

function ProductSorting() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const mapped: Product[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
      }));

      const saved = localStorage.getItem("products-order");

      if (saved) {
        const savedOrder: Product[] = JSON.parse(saved);

        const ordered = savedOrder
          .map(savedItem => mapped.find(p => p.id === savedItem.id))
          .filter(Boolean) as Product[];

        const remaining = mapped.filter(
          p => !ordered.find(o => o.id === p.id)
        );

        setProducts([...ordered, ...remaining]);
      } else {
        setProducts(mapped);
      }
    };

    fetchProducts();
  }, []);

  // Save order
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products-order", JSON.stringify(products));
    }
  }, [products]);

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) return;

    setProducts((items) => {
      const draggedIndex = items.findIndex((i) => i.id === draggedId);
      const targetIndex = items.findIndex((i) => i.id === targetId);

      const updated = [...items];
      const [draggedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, draggedItem);

      return updated;
    });

    setDraggedId(null);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          draggable
          onDragStart={() => handleDragStart(product.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(product.id)}
          onClick={() => setSelectedProduct(product)}
          style={{
            padding: "12px",
            marginBottom: "8px",
            background: "#f4f4f4",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: draggedId === product.id ? 0.5 : 1,
          }}
        >
          {product.title}
        </div>
      ))}

      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSorting;