/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Download,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Share2,
  Star,
  Heart,
  Camera,
  Calendar,
  User,
  Shield,
  Verified,
  TrendingUp,
  Sparkles,
  Home,
  Car,
  Bath,
  Bed,
  Square,
  Droplet,
  Wrench,
  LucideRuler,
  Layers,
  Compass,
  IndianRupee,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Helpers";
import EnquiryForm from "./EnquiryForm";
import { SiMercadopago } from 'react-icons/si';
import logo from "../assets/bridge-house.png";

export default function PropertyDetailPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showServices, setshowServices] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showNearby, setShowNearby] = useState(true);
  const [showFacilities, setshowFacilities] = useState(true);
  const [showFloorPlan, setShowFloorPlan] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);
  const [totalAmount, setTotalAmount] = useState(15000);
  const [downPayment, setDownPayment] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(3);
  const [interestRate, setInterestRate] = useState(15);
  const [isFavorite, setIsFavorite] = useState(false);
  const [properties, setProperties] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getRequest(`properties/${id}`)
      .then((res) => {
        console.log("Properties Details Pages ====", res?.data?.data);
        setProperties(res?.data?.data);
        console.log("dssssssssssssssssssssssssssss", res.data.data)
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);

  useEffect(() => {
    if (properties?.gallery) {
      setImages(properties?.gallery);
    }
  }, [properties]);

  //if (!images || images.length === 0) return null;

  // const images = [
  //   "https://i.pinimg.com/1200x/8e/cf/f7/8ecff71ffd6b62d82084f18cbe08f205.jpg",
  //   "https://i.pinimg.com/1200x/2b/76/cc/2b76cc89c6c9553288e83f48495a5357.jpg",
  //   "https://i.pinimg.com/1200x/4e/aa/83/4eaa8389a96a657e7f08c7ca52fc8e36.jpg",
  //   "https://i.pinimg.com/1200x/4e/aa/83/4eaa8389a96a657e7f08c7ca52fc8e36.jpg",
  //   "https://i.pinimg.com/1200x/e2/87/22/e28722ecaf7884ece3f2d56d025f17ad.jpg",
  //   "https://i.pinimg.com/1200x/5f/cf/18/5fcf18af55889a6328d7a9ba69b78b0e.jpg",
  //   "https://i.pinimg.com/1200x/1c/df/70/1cdf709620dbdb2b1abc1369d2c02d0e.jpg",
  // ];

  // const service = [
  //   { icon: <Bed className="w-5 h-5" />, label: "Bedrooms", value: "3" },
  //   { icon: <Bath className="w-5 h-5" />, label: "Bathrooms", value: "2" },
  //   { icon: <Car className="w-5 h-5" />, label: "Parking", value: "1" },
  //   {
  //     icon: <Droplet className="w-5 h-5" />,
  //     label: "Water Supply",
  //     value: "Yes",
  //   },
  //   {
  //     icon: <Square className="w-5 h-5" />,
  //     label: "Floor",
  //     value: "5th of 12",
  //   },
  //   { icon: "Wrench", label: "Maintenance", value: "1" },
  //   { icon: "📺", label: "TV", value: "4" },
  //   { icon: "💧", label: "Water Purifier", value: "2" },
  //   { icon: "🔥", label: "Microwave", value: "2" },
  //   { icon: "❄️", label: "AC", value: "4" },
  //   { icon: "🍽️", label: "Fridge", value: "1" },
  //   { icon: "🏠", label: "Curtains", value: "yes" },
  // ];

  const serviceIcons = {
    "Water Supply": <Droplet className="w-5 h-5" />,
    Maintenance: <Wrench className="w-5 h-5" />,
    Bedrooms: <Bed className="w-5 h-5" />,
    Bathrooms: <Bath className="w-5 h-5" />,
    Parking: <Car className="w-5 h-5" />,
    Floor: <Square className="w-5 h-5" />,
  };
  const facilities = [
    "Gym",
    "Swimming Pool",
    "Power Backup",
    "Clubhouse",
    "Visitor Parking",
    "Natural Light",
    "Airy Rooms",
    "Spacious Interior",
  ];

  const calculateMonthlyPayment = () => {
    const principal = totalAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) return (principal / numberOfPayments).toFixed(2);

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Hero Header */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://dreamsestate.dreamstechnologies.com/html/assets/img/bg/breadcrumb-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Content */}
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-lg mb-3">
                {/* <br className="hidden md:block" /> with
                Valley Views */}
                {properties?.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-200 font-light">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-base">{properties?.address}</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-yellow-400 drop-shadow-md">
                  <IndianRupee size={18} className="inline-block" />
                  {properties?.actualPrice}
                </div>
                {/* <div className="text-sm text-gray-300">Total Visits: 45</div> */}
              </div>
              {/* 
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full shadow-lg transition-all ${
                  isFavorite
                    ? "bg-red-500 text-white scale-110"
                    : "bg-white/90 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-current" : ""
                  } transition-transform`}
                />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 p-4">
        <div className="flex items-center gap-3 mb-2">
          {/* Status Badge */}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            {properties?.status}

          </span>
          {properties?.isAdopted && (
            <span className="bg-gradient-to-r from-blue-900 to-blue-900 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <SiMercadopago className="fs-4" />
              Adopted
            </span>
          )}

        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={images[selectedImage]}
                  alt="Property main view"
                  className="w-full h-140 object-cover"
                />
                {/* Top-right overlay: Camera + Verified */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {/* Verified Icon */}
                  {properties?.isVerified && (
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/color/48/verified-account--v1.png"
                      alt="verified-account"
                    />
                  )}

                  {/* Camera + counter */}
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {selectedImage + 1} / {images.length}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Property view ${index + 1}`}
                      className={`w-24 h-20 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0 ${selectedImage === index
                        ? "ring-3 ring-blue-500 shadow-md"
                        : "hover:shadow-md opacity-70 hover:opacity-100"
                        }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Description</h3>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showDescription ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>
              {showDescription && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-base text-gray-500 leading-relaxed">
                    {properties?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              {/* Header with toggle */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Details</h3>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showDetails ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>

              {showDetails && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Area */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <LucideRuler className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium">
                        {properties?.propertyDetails?.area ?? "—"} sq ft
                      </span>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Bed className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium">
                        {properties?.propertyDetails?.bedrooms ?? "—"} Bedrooms
                      </span>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Bath className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium">
                        {properties?.propertyDetails?.bathrooms ?? "—"}{" "}
                        Bathrooms
                      </span>
                    </div>
                  </div>

                  {/* Floors */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium">
                        {properties?.propertyDetails?.floors ?? "—"} Floors
                      </span>
                    </div>
                  </div>

                  {/* Facing */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium capitalize">
                        Facing {properties?.propertyDetails?.facing ?? "—"}
                      </span>
                    </div>
                  </div>

                  {/* Built Year */}
                  <div className="group p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-gray-600 text-base font-medium">
                        Built {properties?.propertyDetails?.builtYear ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* facilities */}
            {Array.isArray(properties?.facilities) &&
              properties.facilities.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Amenities
                    </h3>
                    <button
                      onClick={() => setshowFacilities(!showFacilities)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showFacilities ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                  {showFacilities && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {properties.facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="group p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                              <span className="text-xs">✓</span>
                            </div>
                            <span className="text-base text-gray-500">
                              {facility}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* Property Services services */}
            {Array.isArray(properties?.services) &&
              properties.services.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Services
                    </h3>
                    <button
                      onClick={() => setshowServices(!showServices)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showServices ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {showServices && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {properties.services.map((service, index) => (
                        <div
                          key={index}
                          className="group p-2 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-red-800 to-pink-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                              <span className="text-xs">✓</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {service}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* Nearby Section */}
            {Array.isArray(properties?.nearby) &&
              properties.nearby.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Nearby</h3>
                    <button
                      onClick={() => setShowNearby(!showNearby)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showNearby ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {showNearby && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {properties.nearby.map((place) => (
                        <div key={place._id} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                          <span className="text-base text-gray-500">
                            {place.distance} Km from {place.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-96 space-y-6">
            {/* Enquiry Form */}
            <EnquiryForm propertyId={properties?._id} />

            {/* Listing Owner */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Property Owner</h3>

              <div className="flex items-center gap-4 mb-6">
                {properties?.isAdopted ? (
                  // Adopted → BridgeHouse User
                  <>
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                      <img
                        src={logo}   // Public folder image
                        alt="Bridge House"
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        Bridge House User
                      </div>
                    </div>
                  </>
                ) : (
                  // Not Adopted → Seller Details
                  <>

                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg overflow-hidden">
                      {properties?.addedBy?.profilepic ? (
                        <img
                          src={properties.addedBy.profilepic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        properties?.addedBy?.name?.[0]?.toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {properties?.addedBy?.name || "Seller"}

                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {properties?.isAdopted ? (
                  // BridgeHouse contact info
                  <>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Phone</span>
                      <span className="font-medium text-sm text-gray-600">
                        1234567890
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Email</span>
                      <span className="font-medium text-sm text-gray-600">
                        bridgehouse@example.com
                      </span>
                    </div>
                  </>
                ) : (
                  // Seller contact info
                  <>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Phone</span>
                      <span className="font-medium text-sm text-gray-600">
                        {properties?.addedBy?.phone || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Email</span>
                      <span className="font-medium text-sm text-gray-600">
                        {properties?.addedBy?.email || "N/A"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>



            {/* <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg overflow-hidden">
                  {properties?.addedBy?.profilepic ? (
                    <img
                      src={properties.addedBy.profilepic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Fallback to first letter of name
                    properties?.addedBy?.name?.[0]?.toUpperCase() || "U"
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {properties?.addedBy?.name}
                    <Verified className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Phone", value: properties?.addedBy?.phone },
                  { label: "Email", value: properties?.addedBy?.email },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span className="font-medium text-sm text-gray-600">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div> */}

            {/* <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  WhatsApp
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  Chat Now
                </button>
              </div> */}


            {/* Mortgage Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Mortgage Calculator
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Total Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm  font-medium text-gray-700 mb-1">
                    Monthly Payment
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    ₹{calculateMonthlyPayment()}
                  </div>
                </div>
              </div>
            </div>

            {/* Share Property */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Share Property
              </h3>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Facebook, color: "bg-blue-600" },
                  { icon: Twitter, color: "bg-sky-500" },
                  { icon: Linkedin, color: "bg-blue-700" },
                  {
                    icon: Instagram,
                    color: "bg-gradient-to-br from-pink-500 to-orange-400",
                  },
                  { icon: Youtube, color: "bg-red-600" },
                  { icon: Share2, color: "bg-gray-600" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`p-3 ${social.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <social.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
