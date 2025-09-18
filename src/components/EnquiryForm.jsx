/* EnquiryForm.jsx */
import React, { useState } from "react";
import { Phone } from "lucide-react";
import { postRequest } from "../Helpers";
import toast from "react-hot-toast";

const EnquiryForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property: propertyId,
  });
  console.log("formData", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest({ url: `enquiry`, cred: formData })
      .then((res) => {
        console.log("Enquiry Form", res?.data);
        toast.success(res?.data?.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          property: propertyId,
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div></div>
      <div className="bg- rounded-2xl shadow-lg p-6 top-4">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Enquiry</h3>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {/* <Phone className="w-4 h-4" /> */}
            Get In Touch With Us
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            name="phone"
            type="tel"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            name="message"
            rows="4"
            value={formData?.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full text-sm p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default EnquiryForm;
