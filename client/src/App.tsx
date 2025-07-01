import React, { useState } from 'react';
import './App.css'; // 保留以便后续添加全局样式

function App() {
  const [formData, setFormData] = useState({
    address: '',
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    carPark: 0, // 改为 "car park" 更符合澳洲英语
    isNearWater: false,
  });
  const [prediction, setPrediction] = useState<{ salePrice?: string; rentalPrice?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate prediction result (to be replaced with API call later)
    const salePrice = (formData.area * 5000 + formData.bedrooms * 100000).toLocaleString();
    const rentalPrice = (formData.area * 20 + formData.bedrooms * 200).toLocaleString();
    setPrediction({ salePrice, rentalPrice });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Australian Property Price and Rent Prediction</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area (square metres)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter area"
              min="10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Car Parks</label>
            <input
              type="number"
              name="carPark" // 字段名改为 carPark
              value={formData.carPark}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Near Water (e.g., River or Sea)</label>
            <select
              name="isNearWater"
              value={formData.isNearWater ? 'true' : 'false'}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Predict Price
          </button>
        </form>
        {prediction && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Prediction Results</h2>
            <p>Predicted Sale Price: <span className="font-bold">${prediction.salePrice}</span></p>
            <p>Predicted Weekly Rent: <span className="font-bold">${prediction.rentalPrice}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;