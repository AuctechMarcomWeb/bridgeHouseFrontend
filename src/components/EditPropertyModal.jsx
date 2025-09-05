
import { X } from "lucide-react";

export default function EditPropertyModal({ show, onClose, property, handleInputChange, handleFormSubmit }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Property</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleInputChange}
            placeholder="Property Title"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="bedrooms"
              value={property.bedrooms}
              onChange={handleInputChange}
              placeholder="Bedrooms"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <input
              type="number"
              name="bathrooms"
              value={property.bathrooms}
              onChange={handleInputChange}
              placeholder="Bathrooms"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <input
            type="text"
            name="area"
            value={property.area}
            onChange={handleInputChange}
            placeholder="Area (e.g. 1200 sq ft)"
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
