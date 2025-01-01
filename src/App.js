import React from 'react';
import Products from './components/Products'; // Import the Products component
import AddProduct from './components/AddProduct';
import ProductPicker from './components/ProductPicker';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white text-center py-4 shadow-lg">
        <h1 className="text-3xl font-bold">My E-Commerce Store</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {/* Add Product */}
        <div className="mb-6">
          <AddProduct />
        </div>
        {/* Products List */}
        {/* <div className="mb-6">
          <Products />
        </div> */}

        {/* Product Picker */}
        {/* <div className="mb-6">
          <ProductPicker />
        </div> */}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-200 text-center py-3">
        <p className="text-sm text-gray-700">&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default App;
