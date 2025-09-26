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
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import Addressform from "../components/Addressform"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    setIsSubmitted(true);

    postRequest({
      url: "bridgeHouseConatct",
      cred: formData,
    })
      .then((res) => {
        console.log("Form data of contact:", formData);
        console.log("Response from API:", res);

        toast.success("Message sent successfully!", { duration: 3000 });

        // Form reset
        setFormData({ name: "", phone: "", email: "", address: "", notes: "" });
      })
      .catch((err) => {
        console.error(err); // yahan console.error hona chahiye tha
        toast.error("Something went wrong. Please try again.", { duration: 3000 });
      })
      .finally(() => {
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
      description: "1090, Gomti Nagar, Lucknow, Uttar Pradesh ",
    },
  ];

  const handleAddressSelect = (data) => {
    setFormData({ ...formData, address: data.address, location: data.location });
  };
  return (
    <>
      <div className="min-h-screen bg-white text-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="text-5xl mt-10 font-bold mb-4 text-[#0B63F6]">
              Let's Connect
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Contact Info */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
            >
              <div className="p-8 rounded-3xl bg-gray-100 shadow-lg ">
                <h2 className="text-3xl font-bold text-[#0B63F6] mb-8 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#0B63F6]" />
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-[#0B63F6] text-white">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{info.title}</h3>
                          <p className="text-gray-800 font-medium">{info.content}</p>
                          <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[#0B63F6]/10 rounded-2xl border border-[#0B63F6]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-[#0B63F6]" />
                    <h3 className="text-lg font-semibold text-[#0B63F6]">Business Hours</h3>
                  </div>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
            >
              <div className="p-8 rounded-3xl bg-gray-100 shadow-lg ">
                <h2 className="text-3xl font-bold text-[#0B63F6] mb-8 flex items-center gap-3">
                  <Send className="w-8 h-8 text-[#0B63F6]" />
                  Send Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <CheckCircle className="w-16 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#0B63F6] mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-6 flex-1 flex flex-col" onSubmit={handleSubmit}>
                    {/* Name, Email, Phone */}
                    <div className="flex flex-col md:grid-cols-3 gap-3 ">
                      <div className="flex flex-col">
                        <label className="block font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                          placeholder="Phone Number"
                          required
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <label className="block font-medium mb-1">Address</label>
                      <Addressform value={formData.address} onSelect={handleAddressSelect} />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col flex-1">
                      <label className="block font-medium mb-2">Message</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6] resize-none"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#0B63F6] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
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
