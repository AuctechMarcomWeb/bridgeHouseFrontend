/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { fileUpload, patchRequest } from "../Helpers";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import useCookie from "../Hooks/cookie";
import AddressForm from "../components/Addressform";
import { formatDateCreatedAt } from "../Utils";

export default function EditProfileModal({
  show,
  onClose,
  onSave,
  userProfile,
  setUpdate,
}) {
  const { user, setUser } = useContext(ProfileContext);
  console.log("user", user);
  const [formData, setFormData] = useState(
    user
      ? { ...user, dob: formatDateCreatedAt(user?.dob) }
      : {
          dob: "",
          profilepic: "",
          name: "",
          phone: "",
          email: "",
          gender: "",
          accountType: "",
          occupation: "",
          address: "",
        }
  );

  console.log("formdata", formData);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const { setCookie } = useCookie();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        console.log("Update edit profile response:", res?.data?.data);
        toast.success(res?.data?.message);
        // ✅ Context update karo
        setUser(res?.data?.data);
        if (res?.data?.token) {
          setCookie("token-bridge-house", res?.data?.token, 30);
          console.log("Token saved for new user:", res?.data?.token);
        }
        setUpdate((prev) => !prev);

        if (onSave) {
          onSave(res?.data?.data);
        }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // single file only
    if (!file) return;

    setImageUploading(true);

    fileUpload({
      url: "upload/uploadImage",
      cred: { file },
    })
      .then((res) => {
        const imageUrl = res.data?.data?.imageUrl;
        setFormData((prev) => ({
          ...prev,
          profilepic: imageUrl, // key is profilepic
        }));
        setImageUploading(false);
        toast.success("Profile image uploaded successfully");
      })
      .catch((error) => {
        console.error("Profile upload failed:", error);
        toast.error("Profile upload failed");
        setImageUploading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>
        <hr className="my-2 py-2" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Row: Full Name + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="block mb-2 font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
              />
            </div>
          </div>

          {/* Second Row: DOB + Occupation */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="block mb-2 font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData?.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="occupation"
                className="block mb-2 font-medium text-gray-700"
              >
                Occupation
              </label>
              <input
                id="occupation"
                type="text"
                name="occupation"
                value={formData?.occupation}
                onChange={handleChange}
                placeholder="Enter your occupation"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
              />
            </div>
          </div>

          {/* Third Row: Email + Address */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="E-mail"
                className="block mb-2 font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                id="E-mail"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-12"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 font-medium text-gray-700">
                Address
              </label>
              <div className="h-12">
                <AddressForm
                  value={user?.address}
                  onSelect={handleLocationSelect}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="block mb-2 font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData?.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* Account Type */}
            <div className="mb-4">
              <p className="mb-2 text-gray-700 font-medium">Account Type</p>
              <div className="flex items-center gap-6">
                {["Buyer", "Seller"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer "
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
                    <span className="ml-3 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="profilepic"
              className="block mb-2 font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              id="profilepic"
              type="file"
              name="profilepic"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />

            {imageUploading ? (
              <div className="mt-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-blue-500"
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
                Uploading...
              </div>
            ) : (
              formData?.profilepic && (
                <div className="mt-2 relative w-24 h-24">
                  <img
                    src={formData.profilepic}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilepic: "" }))
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              )
            )}
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
              disabled={loading || imageUploading} // disable until image uploaded
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
