/* eslint-disable no-unused-vars */
import { X } from "lucide-react";
import Addressform from "./Addressform";
import { useContext, useState, useEffect } from "react";
import { Select } from "antd";
import { ProfileContext } from "../context/ProfileContext";
import { fileUpload, postRequest, putRequest } from "../Helpers";

const AddPropertyModal = ({ show, onClose, modalData, setUpdateStatus }) => {
  const { user } = useContext(ProfileContext);

  const [newProperty, setNewProperty] = useState({
    addedBy: user?._id,
    name: "",
    propertyType: "",
    actualPrice: "",
    sellingPrice: "",
    description: "",
    facilities: [],
    services: [],
    address: "",
    location: { type: "Point", coordinates: [0, 0] },
    nearby: [{ name: "", distance: "" }],
    documents: [
      {
        name: "Registry",
        number: "DOC-1234",
        image: "https://example.com/docs/registry.jpg",
      },
    ],
    gallery: [
      "https://example.com/images/villa1.jpg",
      "https://example.com/images/villa2.jpg",
    ],
  });
  console.log("newProperty", newProperty);

  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const facilitiesOptions = ["Parking", "Lift", "Power Backup"];
  const servicesOptions = ["Water Supply", "Maintenance"];

  // ✅ modalData aayega to form ko prefill karo
  useEffect(() => {
    if (modalData) {
      setNewProperty({ ...modalData });
      setSelectedFacilities(modalData.facilities || []);
      setSelectedServices(modalData.services || []);
    }
  }, [modalData]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (data) => {
    setNewProperty((prev) => ({ ...prev, ...data }));
  };

  const addNearby = () => {
    setNewProperty((prev) => ({
      ...prev,
      nearby: [...prev.nearby, { name: "", distance: "" }],
    }));
  };

  const removeNearby = (index) => {
    const updatedNearby = [...newProperty.nearby];
    updatedNearby.splice(index, 1);
    setNewProperty((prev) => ({ ...prev, nearby: updatedNearby }));
  };

  const handleNearbyChange = (index, field, value) => {
    const updatedNearby = [...newProperty.nearby];
    updatedNearby[index][field] = value;
    setNewProperty((prev) => ({ ...prev, nearby: updatedNearby }));
  };

  const handleFacilitiesChange = (values) => {
    setSelectedFacilities(values);
    setNewProperty((prev) => ({ ...prev, facilities: values }));
  };

  const handleServicesChange = (values) => {
    setSelectedServices(values);
    setNewProperty((prev) => ({ ...prev, services: values }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (modalData?._id) {
        // ✅ Edit Mode → PUT API
        res = await putRequest({
          url: `properties/${modalData._id}`,
          cred: newProperty,
        });
        console.log("Property updated:", res?.data);
      } else {
        // ✅ Add Mode → POST API
        res = await postRequest({ url: `properties`, cred: newProperty });
        console.log("Property added:", res?.data);
      }

      setUpdateStatus((prev) => !prev);
      onClose();
    } catch (err) {
      console.error("Error saving property:", err);
    }
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    fileUpload({
      url: `upload/uploadImage`,
      cred: {
        file,
      },
    })
      .then((res) => {
        setNewProperty((prev) => ({
          ...prev,
          image: res.data?.data?.imageUrl,
        }));
        console.log("res data pic ", res?.data);
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      });
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-lg">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-900">
            {modalData ? "Edit Property" : "Add New Property"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-semibold">
                Property Title
              </label>
              <input
                type="text"
                name="name"
                value={newProperty?.name}
                onChange={handleInputChange}
                placeholder="Enter property title"
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold">
                Property Type
              </label>
              <select
                name="propertyType"
                value={newProperty?.propertyType}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              >
                <option value="">Select Property Type</option>
                {["Villa", "Apartment", "House", "Plot"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">
                Actual Price
              </label>
              <input
                type="text"
                name="actualPrice"
                value={newProperty?.actualPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Selling Price
              </label>
              <input
                type="text"
                name="sellingPrice"
                value={newProperty?.sellingPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </div>

          {/* Address + Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Location</label>
              <Addressform
                value={newProperty?.address}
                onSelect={handleLocationSelect}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                name="description"
                value={newProperty?.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </div>

          {/* Nearby */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold">
                Nearby Places
              </label>
              <button
                type="button"
                onClick={addNearby}
                className="text-blue-600 font-semibold"
              >
                + Add
              </button>
            </div>
            {newProperty.nearby.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) =>
                    handleNearbyChange(index, "name", e.target.value)
                  }
                  className="p-2 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Distance"
                  value={item.distance}
                  onChange={(e) =>
                    handleNearbyChange(index, "distance", e.target.value)
                  }
                  className="p-2 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeNearby(index)}
                  className="text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Facilities + Services */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Facilities</label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Facilities"
                value={newProperty.facilities}
                onChange={handleFacilitiesChange}
              >
                {facilitiesOptions.map((f) => (
                  <Select.Option key={f} value={f}>
                    {f}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Services</label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Services"
                value={newProperty.services}
                onChange={handleServicesChange}
              >
                {servicesOptions.map((s) => (
                  <Select.Option key={s} value={s}>
                    {s}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input
              type="file"
              className={"form-control"}
              name="image"
              onChange={handleChangeImage}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl"
            >
              {modalData ? "Update Property" : "Add Property"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyModal;
