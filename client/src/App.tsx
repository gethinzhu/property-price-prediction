import React, { useState } from 'react';
import './App.css'; // 保留以便添加自定义样式

function App() {
  const [formData, setFormData] = useState({
    category: 'Buy or Selling' as 'Buy or Selling' | 'Rent', // 默认选择 Buy or Selling
    propertyType: 'House' as 'House' | 'Apartment', // 默认选择 House
    address: '',
    landSize: 0,
    livingArea: 0,
    area: 0, // 用于 Apartment
    bedrooms: 0,
    bathrooms: 0,
    carParks: 0,
  });
  const [prediction, setPrediction] = useState<{ price?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟预测结果（根据 category 和 propertyType 计算）
    let basePrice = 0;
    if (formData.category === 'Buy or Selling') {
      basePrice = formData.propertyType === 'House'
        ? (formData.landSize * 3000 + formData.livingArea * 2000)
        : (formData.area * 4000);
    } else if (formData.category === 'Rent') {
      basePrice = formData.propertyType === 'House'
        ? (formData.landSize * 10 + formData.livingArea * 5)
        : (formData.area * 15);
    }
    const totalPrice = (basePrice + formData.bedrooms * 50000 + formData.bathrooms * 30000 + formData.carParks * 20000).toLocaleString();
    setPrediction({ price: totalPrice });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation (mimics realestate.com.au) */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-red-600 font-bold">realestate.com.au</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Buy</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Rent</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Sold</a>
            <a href="#" className="text-gray-700 hover:text-red-600">New Homes</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Find Agents</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Home Loans</a>
            <a href="#" className="text-gray-700 hover:text-red-600">News</a>
            <a href="#" className="text-gray-700 hover:text-red-600">Commercial</a>
          </div>
          <div>
            <button className="bg-red-600 text-white px-4 py-2 rounded">Sign in</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded ml-2">Join</button>
          </div>
        </div>
      </nav>

      {/* Main Search Section */}
      <div className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Properties to call home</h2>
        <div className="flex space-x-4 mb-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="Buy or Selling">Buy or Selling</option>
            <option value="Rent">Rent</option>
          </select>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded p-2 flex-1"
            placeholder="Search suburb, postcode or state"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded">Search</button>
        </div>

        {/* Property Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          {formData.propertyType === 'House' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Land Size (square metres)</label>
                <input
                  type="number"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter land size"
                  min="10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Living Area (square metres)</label>
                <input
                  type="number"
                  name="livingArea"
                  value={formData.livingArea}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter living area"
                  min="10"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">Area (square metres)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter total area"
                min="10"
                required
              />
            </div>
          )}

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
              name="carParks"
              value={formData.carParks}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 mt-4"
          >
            Predict Price
          </button>
        </form>
        {prediction && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Prediction Results</h2>
            <p>Predicted {formData.category === 'Rent' ? 'Weekly Rent' : 'Sale Price'}: <span className="font-bold">${prediction.price}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;