import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { postRequest } from "../Helpers";
import { toast } from "react-hot-toast";
import Addressform from "../components/Addressform";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, phone, address, notes } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    if (!phone.trim()) return "Phone is required";
    if (!phoneRegex.test(phone)) return "Phone must be 10 digits";
    if (!address.trim()) return "Address is required";
    if (!notes.trim()) return "Message is required";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error, { duration: 3000 });
      return;
    }

    setIsSending(true);

    postRequest({
      url: "bridgeHouseConatct",
      cred: formData,
    })
      .then((res) => {
        console.log("Form data:", formData);
        console.log("API response:", res);

        toast.success("Message sent successfully!", { duration: 3000 });
        setFormData({ name: "", email: "", phone: "", address: "", notes: "" });
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong. Please try again.", { duration: 3000 });
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setIsSubmitted(false), 3000);
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@bridgehouse.com",
      description: "Send us an email anytime!",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+918707767805",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "Vibhuti Khand, Gomti Nagar, Lucknow",
      description: "1090, Gomti Nagar, Lucknow, Uttar Pradesh",
    },
  ];

  const handleAddressSelect = (data) => {
    setFormData({ ...formData, address: data.address, location: data.location });
  };

  return (
    <>

      <div className="min-h-screen bg-white text-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B63F6]">
              Let's Connect
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
            {/* Contact Info */}
            <div
              className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
            >
              <div className="p-4 sm:p-6 rounded-2xl bg-gray-100 shadow-md sm:shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B63F6] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#0B63F6]" />
                  Get in Touch
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="p-4 sm:p-6 rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-xl bg-[#0B63F6] text-white">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold">{info.title}</h3>
                          <p className="text-gray-800 font-medium text-xs sm:text-sm">{info.content}</p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-[#0B63F6]/10 rounded-xl border border-[#0B63F6]/20 text-sm sm:text-base">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B63F6]" />
                    <h3 className="font-semibold text-[#0B63F6]">Business Hours</h3>
                  </div>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                }`}
            >
              <div className="p-4 sm:p-6 rounded-2xl bg-gray-100 shadow-md sm:shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B63F6] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                  <Send className="w-6 h-6 sm:w-8 sm:h-8 text-[#0B63F6]" />
                  Send Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12 flex flex-col justify-center items-center">
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B63F6] mb-2">Message Sent!</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                      placeholder="Your Name"
                      required
                    />
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                      placeholder="Email Address"
                      required
                    />
                    <label className="block font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                      placeholder="Phone Number"
                      required
                      maxLength={10}
                    />
                    <label className="block font-medium mb-2">Address</label>
                    <Addressform
                      value={formData.address}
                      onSelect={handleAddressSelect}
                     className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                      placeholder="Phone Number"
                    />
                    <label className="block font-medium mb-1">Message</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63F6] resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`w-full bg-[#004f8a] text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 transform flex items-center justify-center gap-2 sm:gap-3 ${isSending
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#004f8a] hover:scale-105"
                        }`}
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Contact;
