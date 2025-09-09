import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Plus,
  Home,
  Bed,
  Bath,
  Square,
  Star,
  TrendingUp,
  Award,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import AddPropertyModal from "../components/AddPropertyModal";
import EditPropertyModal from "../components/EditPropertyModal";
import EditProfileModal from "../components/EditProfileModal";
import { getRequest } from "../Helpers";

export default function RealEstateProfile() {
  const [userProfile, setUserProfile] = useState({
    name: "Abhishek ",
    title: "Licensed Real Estate Agent",
    email: "Abhishek@email.com",
    phone: "+91 8975378578",
    location: "1090, Lucknow",
    memberSince: "January 2025",
    rating: 4.9,
    totalSales: "12.5M",
    propertiesSold: 47,
    avatar: "/api/placeholder/150/150",
  });

  const [properties, setProperties] = useState([]);
  // //   title: "",
  // //   location: "",
  // //   price: "₹",
  // //   bedrooms: "",
  // //   bathrooms: "",
  // //   area: "",
  // // });

  // // const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    getRequest("properties")
      .then((res) => setProperties(res.data?.data?.properties || []))
      .catch((err) => toast.error("Failed to load properties"));
  }, [updateStatus]);

  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action will delete the property permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e3342f",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      setProperties((prev) => prev.filter((prop) => prop._id !== id));
      Swal.fire("Deleted!", "The property has been deleted.", "success");
    }
  });
};

  
  const [showEdit, setShowEdit] = useState(false);

  const handleSave = (updatedUser) => {
    setUserProfile(updatedUser); // update profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header with Stats */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-[#004d88] p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="relative">
                <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User size={48} className="text-blue-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
              </div>

              <div className="flex-1 text-white">
                <h1 className="text-xl md:text-2xl  font-bold mb-1">
                  {userProfile?.name}
                </h1>
                <p className="text-blue-100 text-sm mb-4">{userProfile?.accountType}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-200" />
                    <span className="text-blue-100">{userProfile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-200" />
                    <span className="text-blue-100">{userProfile?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-200" />
                    <span className="text-blue-100">{userProfile?.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowEdit(true)}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star size={20} className="text-yellow-500 fill-current" />
                  <span className="text-xl font-bold text-gray-900">
                    {userProfile.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Client Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <TrendingUp size={20} className="text-green-500" />
                  <span className="text-xl font-bold text-gray-900">
                    {userProfile.totalSales}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Total Sales</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Home size={20} className="text-blue-500" />
                  <span className="text-xl font-bold text-gray-900">
                    {userProfile.propertiesSold}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Properties Sold</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Award size={20} className="text-purple-500" />
                  <span className="text-xl font-bold text-gray-900">
                    {properties.length}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Active Listings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Properties Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Property Portfolio
              </h2>
              <p className="text-gray-600 text-sm">
                Manage your real estate listings
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedProperty(null); 
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#059669] text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <Plus size={20} />
              Add Property
            </button>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <Home size={64} className="text-gray-400 mx-auto mb-6" />
              <p className="text-gray-600 text-xl font-medium mb-2">
                No Properties Listed
              </p>
              <p className="text-gray-500 mb-6">
                Start building your portfolio by adding your first property
              </p>
              <button
                onClick={() => {
                  setSelectedProperty(null); // Add mode
                  setIsModalOpen(true);
                }}
                className="px-6 py-3 bg-[#059669] text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Add Property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                    <Home size={40} className="text-blue-400" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <img src={property.image} alt="" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {property.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          property.status === "For Sale"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm">{property?.address}</span>
                    </div>

                    <div className="text-lg font-bold bg-[#059669] bg-clip-text text-transparent mb-4">
                      {property?.actualPrice}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedProperty(property); // Edit mode
                          setIsModalOpen(true);
                        }}
                        className="flex-1 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="flex-1 py-2.5 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AddPropertyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalData={selectedProperty}
          setUpdateStatus={setUpdateStatus}
        />
       
        <EditProfileModal
          show={showEdit}
          onClose={() => setShowEdit(false)}
          userProfile={userProfile}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
