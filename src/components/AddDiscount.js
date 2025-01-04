import React from 'react';

function AddDiscount() {
  return (
    <div className="flex items-center space-x-4 py-2 px-4 ">
    
      <input
        className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        type="number"
        placeholder="Value"
      />
      <select
        className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
      >
        <option value="%">Percentage Off</option>
        <option value="flat">Flat Off</option>
      </select>
    </div>
  );
}

export default AddDiscount;
