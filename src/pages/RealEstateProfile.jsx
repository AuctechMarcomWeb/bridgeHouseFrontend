/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
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
  LogIn,
  Car,
  Building2,
  Zap,
  Droplet,
  Wrench,
  IdCard,
  Calendar,
  Ruler,
  LucideRuler,
  Layers,
  Compass,
} from "lucide-react";

import Swal from "sweetalert2";
import AddPropertyModal from "../components/AddPropertyModal";
import EditProfileModal from "../components/EditProfileModal";
import { deleteRequest, getRequest } from "../Helpers";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utils";
import { FaUser, FaBirthdayCake, FaIdBadge } from "react-icons/fa";
import CreatePasswordModal from "../components/CreatePasswordModal";

export default function RealEstateProfile() {
  const { user, isLoggedIn } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [update, setUpdate] = useState(false);
  // Redirect if not logged in
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/"); // redirect to home
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setLoading(true);
    getRequest(`auth/profile`)
      .then((res) => {
        if (res?.data) {
          setUserProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      })
      .finally(() => setLoading(false));
  }, [update]);

  const handleSave = (update) => {
    setUserProfile(update);
    console.log("updatedData", update);
    setShowEdit(false);
  };

  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const iconMap = {
    // Facilities
    Parking: Car,
    Lift: Building2,
    "Power Backup": Zap,

    // Services
    "Water Supply": Droplet,
    Maintenance: Wrench,
  };
  console.log("user", userProfile?._id);

  useEffect(() => {
    if (!userProfile?._id) return;
    getRequest(`properties?addedBy=${userProfile?._id}&approvalStatus`)
      .then((res) => {
        console.log(
          "user Properties API response:",
          res?.data?.data?.properties
        );
        setProperties(res?.data?.data?.properties || []);
      })
      .catch((err) => {
        console.error("Failed to load properties:", err);
        toast.error("Failed to load properties");
        setProperties([]); // fallback
      });
  }, [userProfile?._id, updateStatus]);

  const handleDelete = (id) => {
    console.log("id", id);
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
        deleteRequest(`properties/${id}`)
          .then((res) => {
            console.log("Delete response:", res?.data);
            Swal.fire("Deleted!", "The property has been deleted.", "success");
            setProperties((prev) => prev.filter((prop) => prop._id !== id));
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error", err?.response?.data?.message);
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header with Stats */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p className="text-gray-500 text-sm">Loading user profile...</p>
            </div>
          )}

          <div className="bg-[#004d88] p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="relative">
                <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  {userProfile?.profilepic ? (
                    <img
                      src={userProfile?.profilepic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-blue-600" />
                  )}
                </div>
              </div>

              <div className="flex-1 text-white">
                <h1 className="text-xl md:text-2xl  font-bold mb-1">
                  {userProfile?.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm item-start">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{userProfile?.gender || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(userProfile?.dob) || "-"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IdCard className="w-4 h-4" />
                    <span>{userProfile?.accountType || "-"}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm item-start">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-200" />
                    <span className="text-blue-100">{userProfile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-200" />
                    <span className="text-blue-100">{userProfile?.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={20} className="text-blue-200" />
                    <span className="text-blue-100">
                      {userProfile?.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  onClick={() => {
                    setShowPassword(true);
                    console.log("showPassword:", true);
                  }}
                >
                  Create Password
                </button>
                <button
                  onClick={() => setShowEdit(true)}
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
                >
                  Edit Profile
                </button>
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
                  key={property?.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden group rounded-xl">
                      {Array.isArray(property?.gallery) &&
                      property?.gallery?.length > 0 ? (
                        <>
                          <img
                            src={property?.gallery[0]}
                            alt={`${property?.title || "Listing"} image`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
                            }}
                          />
                          {/* Hidden fallback that shows if image fails to load */}
                          <div className="hidden absolute inset-0 items-center justify-center">
                            <Home size={50} className="text-blue-400" />
                          </div>
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </>
                      ) : (
                        <>
                          {/* Default fallback when no gallery images */}
                          <Home
                            size={50}
                            className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </>
                      )}
                    </div>

                    {property?.approvalStatus && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm shadow-lg text-white ${
                          property.approvalStatus === "Published"
                            ? "bg-green-500/90"
                            : property.approvalStatus === "Pending"
                            ? "bg-amber-500/90"
                            : property.approvalStatus === "Rejected"
                            ? "bg-red-500/90"
                            : "bg-blue-500/90" //
                        }`}
                      >
                        {property.approvalStatus}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {property?.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          property?.status === "For Sale"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {property?.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm">{property?.address}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LucideRuler className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {property?.propertyDetails?.area ?? "—"} sq ft
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bed className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {property?.propertyDetails?.bedrooms ?? "—"}{" "}
                            Bedrooms
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bath className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {property?.propertyDetails?.bathrooms ?? "—"}{" "}
                            Bathrooms
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Layers className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {property?.propertyDetails?.floors ?? "—"} Floors
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                          <Compass className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            Facing {property?.propertyDetails?.facing ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            Built {property?.propertyDetails?.builtYear ?? "—"}
                          </span>
                        </div>
                      </div>

                      {/* Facilities + Services */}
                      <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        {[
                          ...(property?.facilities || []),
                          ...(property?.services || []),
                        ].map((item, index) => {
                          const Icon = iconMap[item] || Star;
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <Icon className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{item}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Nearby */}
                      <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        {property.nearby?.map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="font-medium capitalize">
                              {place.name}
                            </span>{" "}
                            - <span>{place.distance}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      {/* Price - Left */}
                      <h3 className="text-lg font-bold bg-[#059669] bg-clip-text text-transparent">
                        {property?.actualPrice}
                      </h3>

                      {/* Property Type - Right */}
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {property?.propertyType}
                      </span>
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
          setModalData={setSelectedProperty}
          setUpdateStatus={setUpdateStatus}
        />

        {showEdit && (
          <EditProfileModal
            show={showEdit}
            onClose={() => setShowEdit(false)}
            onSave={handleSave} // <-- pass callback
            userProfile={userProfile}
            setUpdate={setUpdate}
          />
        )}

        {showPassword && (
          <CreatePasswordModal
            show={showPassword}
            onClose={() => setShowPassword(false)}
            setUpdate={setUpdate}
          />
        )}
      </div>
    </div>
  );
}
