// components/AddPropertyModal.jsx
import { X } from "lucide-react";

export default function AddPropertyModal({
  show,
  onClose,
  newProperty,
  handleInputChange,
  handleFormSubmit,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40  bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-lg">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">Add New Property</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Property Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              value={newProperty.title}
              onChange={handleInputChange}
              placeholder="Enter property title"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newProperty.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={newProperty.price}
              onChange={handleInputChange}
              placeholder="e.g., ₹500,000"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={newProperty.bedrooms}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={newProperty.bathrooms}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Area
            </label>
            <input
              type="text"
              name="area"
              value={newProperty.area}
              onChange={handleInputChange}
              placeholder="e.g., 1,500 sq ft"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              Add Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
