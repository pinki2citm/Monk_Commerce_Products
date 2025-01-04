import React, { useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { PencilIcon } from "@heroicons/react/20/solid";
import ProductPicker from "./ProductPicker";
import AddDiscount from "./AddDiscount";

const ITEM_TYPE = 'product';
const VARIANT_TYPE = 'variant';

const AddProducts = () => {
  const [Dummyproducts, setDummyProducts] = useState([
    {
      id: 1,
      name: "",
      discount: "",
      selectedVariants: [],
      showDiscountInput: false,
    },
  ]);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [expandedVariants, setExpandedVariants] = useState({});

 
  const handleAddDummyProduct = () => {
    setDummyProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        name: "",
        discount: "",
        selectedVariants: [],
        showDiscountInput: false,
      },
    ]);
  };

  const handleRemoveVariant = (productIndex, variantIndex) => {
    setDummyProducts((prevProducts) =>
      prevProducts.map((product, index) =>
        index === productIndex
          ? {
              ...product,
              selectedVariants: product.selectedVariants.filter(
                (_, idx) => idx !== variantIndex
              ),
            }
          : product
      )
    );
  };

  const handleAddProducts = (selectedProducts) => {
    if (selectedProductIndex !== null) {
      const updatedProducts = [...Dummyproducts];

      selectedProducts.forEach((product, index) => {
        updatedProducts[selectedProductIndex + index] = {
          ...updatedProducts[selectedProductIndex + index],
          name: product.title,
          selectedVariants: product.selectedVariants,
        };
      });

      setDummyProducts(updatedProducts);
      setSelectedProductIndex(null);
    }
    setIsProductPickerOpen(false);
  };

  const toggleVariantVisibility = (index) => {
    setExpandedVariants((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleDiscountInput = (index) => {
    setDummyProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? { ...product, showDiscountInput: !product.showDiscountInput }
          : product
      )
    );
  };

  const moveProduct = (fromIndex, toIndex) => {
    const updatedProducts = [...Dummyproducts];
    const [movedProduct] = updatedProducts.splice(fromIndex, 1);
    updatedProducts.splice(toIndex, 0, movedProduct);
    setDummyProducts(updatedProducts);
  };

  const moveVariant = (productIndex, fromIndex, toIndex) => {
    const updatedProducts = [...Dummyproducts];
    const product = updatedProducts[productIndex];
    const [movedVariant] = product.selectedVariants.splice(fromIndex, 1);
    product.selectedVariants.splice(toIndex, 0, movedVariant);
    setDummyProducts(updatedProducts);
  };

  const ProductRow = ({ product, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ITEM_TYPE,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: ITEM_TYPE,
      hover: (item) => {
        if (item.index !== index) {
          moveProduct(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <tr
        ref={(node) => drag(drop(node))}
        key={product.id}
        className={`border-b ${isDragging ? "bg-gray-200" : ""}`}
      >
        <td className="text-bold">:::</td>
        <td className="py-2 px-2">{index + 1}.</td>
        <td className="py-2 px-4">
          <div className="relative w-full">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border w-full rounded"
              placeholder="Select Product"
              value={product.name}
              readOnly
            />
            <PencilIcon
              onClick={() => {
                setIsProductPickerOpen(true);
                setSelectedProductIndex(index);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
            />
          </div>

          {product.selectedVariants.length > 1 && (
            <button
              onClick={() => toggleVariantVisibility(index)}
              className="mt-2 text-blue-500 text-sm"
            >
              {expandedVariants[index] ? "Hide Variants" : "Show Variants"}
            </button>
          )}

          {expandedVariants[index] &&
            product.selectedVariants.map((variant, idx) => (
              <VariantRow
                key={idx}
                productIndex={index}
                variant={variant}
                variantIndex={idx}
                moveVariant={moveVariant}
              />
            ))}
        </td>

        <td className="py-2 text-right px-4">
          {product.showDiscountInput ? (
            <AddDiscount />
          ) : (
            <button
              className="text-white py-2 px-4 rounded"
              style={{ backgroundColor: "#008060" }}
              onClick={() => toggleDiscountInput(index)}
            >
              Add Discount
            </button>
          )}
        </td>
      </tr>
    );
  };

  const VariantRow = ({ productIndex, variant, variantIndex, moveVariant }) => {
    const [{ isDragging }, drag] = useDrag({
      type: VARIANT_TYPE,
      item: { productIndex, variantIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: VARIANT_TYPE,
      hover: (item) => {
        if (item.variantIndex !== variantIndex) {
          moveVariant(item.productIndex, item.variantIndex, variantIndex);
          item.variantIndex = variantIndex;
        }
      },
    });

    return (
      <>
      <div
        ref={(node) => drag(drop(node))}
        className={`flex items-center justify-between gap-3 border rounded-full p-2 ${isDragging ? "bg-gray-200" : ""}`}
      >
        <span className="text-sm p-1 m-2 font-semibold">{variant.title}</span>
        <span className="text-sm text-gray-500">Rs. {variant.price}</span>
        <button
          onClick={() => handleRemoveVariant(productIndex, variantIndex)}
          className="text-red-500 hover:text-red-700"
        >
          ✖
        </button>
      </div>
      </>
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-md">
      <h2 className="text-lg font-bold mb-4">Add Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <tbody>
            {Dummyproducts.map((product, index) => (
              <ProductRow key={product.id} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddDummyProduct}
          className="py-2 px-4 rounded border"
          style={{ color: "#008060", borderColor: "#008060" }}
        >
          Add Product
        </button>
      </div>

      {isProductPickerOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-[500px]">
            <ProductPicker
              onAdd={handleAddProducts}
              onClose={() => setIsProductPickerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
