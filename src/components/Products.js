import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/API';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(); // Example call
       setProducts(data);
       console.log(data); // Assuming the API response has a `products` array
      } catch (err) {
        setError(err.message);
      }
    }

    loadProducts();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {products && products.map((product) => (
     <div>
      <li key={product.id}>{product.title}</li>
      </div>
      ))}
    </ul>
  );
}

export default Products;
