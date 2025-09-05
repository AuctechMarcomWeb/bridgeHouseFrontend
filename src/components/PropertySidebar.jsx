import React from 'react';
import { MapPin, Check, Star, Home, Calendar } from 'lucide-react';

const PropertySidebar = () => {
  const agents = [
    {
      id: 1,
      name: "Deepak Pal",
      company: "Artelex Realty",
      operatingSince: "2013",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      isPreferred: true,
      features: [
        "Has maximum property options",
        "Is the top agent of the locality",
        "Is trusted by all users"
      ]
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Elite Properties",
      operatingSince: "2015",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      isPreferred: false,
      features: [
        "Specialist in luxury properties",
        "Quick response time",
        "Excellent customer reviews"
      ]
    }
  ];

  const properties = [
    {
      id: 1,
      title: "Sahu City Phase 2",
      developer: "Sahu Land Developers Pvt Ltd",
      location: "Sultanpur Road, Lucknow",
      type: "2, 3 BHK Flats",
      price: "₹57.9 Lac Onwards",
      marketedBy: "Sahu Land Developers",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Green Valley Residency",
      developer: "Metro Builders",
      location: "Gomti Nagar, Lucknow",
      type: "1, 2 BHK Apartments",
      price: "₹35.5 Lac Onwards",
      marketedBy: "Metro Builders",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"
    }
  ];

  const AgentCard = ({ agent }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 border border-gray-200 relative overflow-hidden">
      {agent.isPreferred && (
        <div className="absolute top-0 right-0">
          <div className="bg-gray-800 text-white px-3 py-1 text-xs font-bold transform rotate-12 translate-x-2 -translate-y-1">
            <Star className="w-3 h-3 inline mr-1" fill="white" />
            PREFERRED AGENT
          </div>
        </div>
      )}
      
      <div className="flex items-start space-x-3 mb-4">
        <img 
          src={agent.avatar} 
          alt={agent.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-blue-500 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold">{agent.company}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Operating since {agent.operatingSince}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="font-semibold text-gray-800 text-sm">About Agent</h4>
        {agent.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-white border-2 border-red-500 text-red-500 py-2 px-4 rounded-md font-semibold hover:bg-red-50 transition-colors">
        View Profile
      </button>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 border border-gray-200">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{property.developer}</p>
        
        <div className="flex items-start space-x-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{property.location}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">{property.type}</span>
          </div>
          <div className="text-lg font-bold text-green-600">{property.price}</div>
          <div className="text-xs text-gray-500">
            Marketed by <span className="font-semibold">{property.marketedBy}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="   w-80  bg-gray-50 min-h-screen overflow-y-auto shadow-xl z-10">
      <div className="mb-6">
       
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          Featured Properties
        </h2>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-center">
        <h3 className="font-bold mb-2">Looking to sell?</h3>
        <p className="text-sm mb-3">Get the best price for your property</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 transition-colors">
          Get Free Valuation
        </button>
      </div>
    </div>
  );
};

export default PropertySidebar;