import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/API";

const ProductPicker = ({ onAdd, onClose }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchProducts();
      setProducts(products);
    }

    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) => {
      const updatedSelectedProducts = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      if (!updatedSelectedProducts.includes(productId)) {
        const updatedSelectedVariants = { ...selectedVariants };
        delete updatedSelectedVariants[productId];
        setSelectedVariants(updatedSelectedVariants);
      }

      return updatedSelectedProducts;
    });
  };

  const handleVariantSelect = (productId, variantId) => {
    setSelectedVariants((prev) => {
      const updated = { ...prev };

      if (!updated[productId]) {
        updated[productId] = [];
      }

      if (updated[productId].includes(variantId)) {
        updated[productId] = updated[productId].filter((id) => id !== variantId);
      } else {
        updated[productId].push(variantId);
      }

      return updated;
    });
  };

  const handleAdd = () => {
    const finalSelection = selectedProducts.map((productId) => {
      const product = products.find((p) => p.id === productId);
  
      const selectedVariant = selectedVariants[productId]?.map((variantId) => {
        const variant = product.variants.find((v) => v.id === variantId);
        return variant ? variant : '';
      }) || [];
  
      return {
        ...product,
        selectedVariants: selectedVariant,
      };
    });
  
    console.log(finalSelection);
  
    onAdd?.(finalSelection);
    onClose?.();
  };

  const getSelectedCount = () => selectedProducts.length;

  return (
    <div className="relative bg-white rounded-lg shadow-lg max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Search Products</h2>
        <button onClick={onClose} className="p-1 bg-gray-300 rounded-full">
          ❌
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {displayedProducts.map((product) => (
          <div key={product.id} className="flex flex-col py-2 border-b">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleProductSelect(product.id)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="h-10 w-10 bg-gray-100 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{product.title}</p>
              </div>
            </div>
            {selectedProducts.includes(product.id) && (
              <div className="mt-2 ml-6">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedVariants[product.id]?.includes(variant.id) || false}
                      onChange={() => handleVariantSelect(product.id, variant.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label className="text-sm">
                      {variant.title} - Rs. {variant.price}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <p className="text-sm">{getSelectedCount()} Products selected</p>
        <div className="space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm text-white bg-teal-600 rounded hover:bg-teal-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
