/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { patchRequest } from "../Helpers";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import useCookie from "../Hooks/cookie";
import AddressForm from "../components/Addressform";

export default function EditProfileModal({
  show,
  onClose,
  onSave,
  userProfile,
}) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUpdateStatus } = useContext(ProfileContext);
  const { setCookie } = useCookie();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("user", user);

  useEffect(() => {
    if (show && user) {
      setFormData(user);
    }
  }, [show, user]);

  if (!show || !formData) return null;

  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    patchRequest({
      url: `auth/update/${user?._id}`,
      cred: formData,
    })
      .then((res) => {
        console.log("Update response:", res?.data?.data);
        toast.success(res?.data?.message);
        if (res?.data?.token) {
          setCookie("token-bridge-house", res.data.token, 30);
          console.log("Token saved for new user:", res.data.token);
        }
        setUpdateStatus((prev) => !prev);
        onSave(formData);
        onClose();
      })
      .catch((err) => {
        console.error("Update User API Error:", err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {/* <input
            type="dob"
            name="dob"
            value={formData?.dob}
            onChange={handleChange}
            placeholder="Enter Date of Birth"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          /> */}
          <AddressForm
            value={formData?.address}
            onSelect={handleLocationSelect}
          />
          <input
            type="text"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="mb-4">
            <p className="mb-2 text-gray-700 font-medium">Account Type</p>
            <div className="flex gap-6">
              {["Buyer", "Seller"].map((type) => (
                <label
                  key={type}
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="accountType"
                    value={type}
                    checked={formData?.accountType === type}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center">
                    {formData?.accountType === type && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="ml-3 text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block mb-2 text-gray-700 font-medium"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Buttons */}
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
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
