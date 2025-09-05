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
} from "lucide-react";

export default function PropertyDetailPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [showDescription, setShowDescription] = useState(true);
  const [showFeatures, setShowFeatures] = useState(true);
  const [showAbout, setShowAbout] = useState(true);
  const [showAmenities, setShowAmenities] = useState(true);
  const [showFloorPlan, setShowFloorPlan] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(15000);
  const [downPayment, setDownPayment] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(3);
  const [interestRate, setInterestRate] = useState(15);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    "https://i.pinimg.com/1200x/8e/cf/f7/8ecff71ffd6b62d82084f18cbe08f205.jpg",
    "https://i.pinimg.com/1200x/2b/76/cc/2b76cc89c6c9553288e83f48495a5357.jpg",
    "https://i.pinimg.com/1200x/4e/aa/83/4eaa8389a96a657e7f08c7ca52fc8e36.jpg",
    "https://i.pinimg.com/1200x/4e/aa/83/4eaa8389a96a657e7f08c7ca52fc8e36.jpg",
    "https://i.pinimg.com/1200x/e2/87/22/e28722ecaf7884ece3f2d56d025f17ad.jpg",
    "https://i.pinimg.com/1200x/5f/cf/18/5fcf18af55889a6328d7a9ba69b78b0e.jpg",
    "https://i.pinimg.com/1200x/1c/df/70/1cdf709620dbdb2b1abc1369d2c02d0e.jpg",
  ];

  const propertyFeatures = [
    { icon: <Bed className="w-5 h-5" />, label: "Bedrooms", value: "3" },
    { icon: <Bath className="w-5 h-5" />, label: "Bathrooms", value: "2" },
    { icon: <Car className="w-5 h-5" />, label: "Parking", value: "1" },
    { icon: <Home className="w-5 h-5" />, label: "Balcony", value: "Yes" },
    {
      icon: <Square className="w-5 h-5" />,
      label: "Floor",
      value: "5th of 12",
    },
    { icon: "👔", label: "Wardrobe", value: "1" },
    { icon: "📺", label: "TV", value: "4" },
    { icon: "💧", label: "Water Purifier", value: "2" },
    { icon: "🔥", label: "Microwave", value: "2" },
    { icon: "❄️", label: "AC", value: "4" },
    { icon: "🍽️", label: "Fridge", value: "1" },
    { icon: "🏠", label: "Curtains", value: "yes" },
  ];

  const amenities = [
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
                Luxury Hilltop Villa <br className="hidden md:block" /> with
                Valley Views
              </h1>
              <div className="flex items-center gap-2 text-gray-200 font-light">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-base">
                  Mohawk River Valley, Upstate NY
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-yellow-400 drop-shadow-md">
                  ₹850,000
                </div>
                <div className="text-sm text-gray-300">Total Visits: 45</div>
              </div>

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
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm  flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Trending
          </span>
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm  flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Fresh List
          </span>
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
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  {selectedImage + 1} / {images.length}
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Property view ${index + 1}`}
                      className={`w-24 h-20 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                        selectedImage === index
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
                    This exceptional property is mostly wooded and sits high on
                    a hilltop overlooking the breathtaking Mohawk River Valley.
                    Located right in the heart of Upstate NY's Amish farm
                    Country, this land is certified organic making it extremely
                    rare! Good road frontage on a paved county road with
                    utilities make it an amazing setting for your dream country
                    getaway! If you like views, you must see this property!
                  </p>
                </div>
              )}
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Property Features
                </h3>
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showFeatures ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>
              {showFeatures && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {propertyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="group p-2  rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-red-800 to-pink-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                          {typeof feature.icon === "string" ? (
                            <span className="text-sm">{feature.icon}</span>
                          ) : (
                            feature.icon
                          )}
                        </div>
                        <div>
                          <div className="text-sm  text-gray-600">
                            {feature.label}
                          </div>
                          <div className="text-sm  text-gray-600">
                            {feature.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Property */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  About Property
                </h3>
                <button
                  onClick={() => setShowAbout(!showAbout)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showAbout ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>
              {showAbout && (
                <div className="space-y-6">
                  <p className="text-base text-gray-500 leading-relaxed">
                    This property is mostly wooded and sits high on a hilltop
                    overlooking the Mohawk River Valley.
                  </p>
                  <div className="space-y-3">
                    {[
                      "100 meters from school, 3km away from bypass.",
                      "First floor - 2 large bedrooms with attached bathrooms.",
                      "Spacious and well-equipped kitchen.",
                      "Inviting living room with balcony.",
                      "Terrace with breathtaking views.",
                      "Independent electric and water connections.",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-3 flex-shrink-0"></div>
                        <span className="text-base text-gray-500">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Amenities</h3>
                <button
                  onClick={() => setShowAmenities(!showAmenities)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showAmenities ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>
              {showAmenities && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="group p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                          <span className="text-xs ">✓</span>
                        </div>
                        <span className="text-base text-gray-500">
                          {amenity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-96 space-y-6">
            {/* Enquiry Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6  top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Enquiry</h3>

              <div className="flex gap-2 mb-6">
                <button className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Get In Touch With Us
                </button>
                {/* <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Visit
                </button> */}
              </div>

              {/* Agent Info */}
              {/* <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  AH
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    Adrian Henriques
                  </div>
                  <div className="text-sm text-gray-600">Company Agent</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      4.9 (127)
                    </span>
                  </div>
                </div>
              </div> */}

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Send Message
                </button>
              </div>
            </div>

            {/* Listing Owner */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Property Owner
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  AS
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    Ali Sir
                    <Verified className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-gray-500 ml-2 text-sm">
                      (32 Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Phone", value: "+1 12545 45548" },
                  { label: "Email", value: "info@example.com" },
                  { label: "Listings", value: "05 Active" },
                  { label: "Bookings", value: "225 Total" },
                  { label: "Member Since", value: "Jan 2014" },
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
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  WhatsApp
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  Chat Now
                </button>
              </div>
            </div>

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
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
