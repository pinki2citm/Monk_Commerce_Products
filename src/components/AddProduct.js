import React, { useState } from "react";

const AddProducts = () => {
  const [products, setProducts] = useState([{ id: 1, name: "", discount: "" }]);

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, name: "", discount: "" }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-md">
      <h2 className="text-lg font-bold mb-4">Add Products</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b py-2 text-left"></th>
            <th className="border-b py-2 text-left">Product</th>
            <th className="border-b py-2 text-right">Discount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2">{product.id}.</td>
              <td className="py-2">
                <input
                  type="text"
                  placeholder="Select Product"
                  className="border p-2 w-full rounded"
                />
              </td>
              <td className="py-2 text-right">
                <button
                  className="text-white py-2 px-4 rounded"
                  style={{ backgroundColor: "#008060" }}
                >
                  Add Discount
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddProduct}
          className="py-2 px-4 rounded border"
          style={{ color: "#008060", borderColor: "#008060" }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
