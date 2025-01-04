import React from "react";
import AddProducts from "./components/AddProduct";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white text-center py-4 shadow-lg">
        <h1 className="text-3xl font-bold">My E-Commerce Store</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="mb-6">
          <DndProvider backend={HTML5Backend}>
            <AddProducts />
          </DndProvider>
        </div>
      </main>

      <footer className="bg-gray-200 text-center py-3">
        <p className="text-sm text-gray-700">&copy; 2024 My E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default App;
