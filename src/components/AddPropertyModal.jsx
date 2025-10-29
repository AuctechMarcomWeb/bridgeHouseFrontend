/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../context/ProfileContext";
import { fileUpload, getRequest, postRequest, putRequest } from "../Helpers";
import Addressform from "./Addressform";
import { X } from "lucide-react";
import { Select } from "antd";

const AddPropertyModal = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  setPropertyStatus,
  show,
  onClose,
}) => {
  const { user, setUser, setUpdateStatus } = useContext(ProfileContext);

  console.log("modalData===", modalData);
  const [type, setType] = useState([]);
  const [bhk, setBhk] = useState([]);
  const [services, setServices] = useState([]);
  const [facilites, setFacilites] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadingImages, setUploadingImages] = useState([]);
  // const [errors,setErrors]=useState("")

  const [formData, setFormData] = useState(
    modalData
      ? { ...modalData }
      : {
        address: "",
        addedBy: user?._id,
        name: "",
        propertyType: "",
        documents: [],
        description: "",
        propertyDetails: {
          area: "",
          bedrooms: "",
          bathrooms: "",
          floors: "",
          facing: "",
          builtYear: "",
        },
        status: "Available",
        isVerified: false,
        isAdopted: false,
        actualPrice: "",
        sellingPrice: "",
        facilities: [],
        services: [],
        nearby: [],
        gallery: [],
        propertyCode: "",
        bhk: "",
      }
  );

  console.log("formData===>", formData);

  useEffect(() => {
    getRequest(`category?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("Category", responseData);
        setType(responseData?.categories);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`bhk?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("bhk", responseData);
        setBhk(responseData?.bhks);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`facilites?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("facilites", responseData);
        setFacilites(responseData?.facilities);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`service?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("service", responseData);
        setServices(responseData?.services);
      })
      .catch((error) => {
        console.log("error", error);
      });
    getRequest(`documents?isPagination=false`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log("documents", responseData);
        setDocuments(responseData?.documents);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const typeOption = type?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });
  const bhkOption = bhk?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });
  const documentsOption = documents?.map((item, index) => {
    return (
      <>
        <option value={item?.name}>{item?.name}</option>
      </>
    );
  });

  const [loading, setLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [facilityInput, setFacilityInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [nearbyName, setNearbyName] = useState("");
  const [nearbyDistance, setNearbyDistance] = useState("");
  const [docName, setDocName] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [addedBy, setAddBy] = useState(null);
  const galleryInputRefs = React.useRef([]);
  const documentInputRefs = React.useRef([]);
  const [measurementUnit, setMeasurementUnit] = useState("sqft");


  React.useEffect(() => {
    if (user?._id) {
      setAddBy(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (modalData) {
      setFormData({
        ...modalData,
      });
    }
  }, [modalData]);

  // ✅ Reset + Close
  const handleCancel = () => {
    setFormData({
      address: "",
      location: {
        type: "Point",
        coordinates: [],
      },
      addedBy: user?._id,
      name: "",
      propertyType: "",
      documents: [],
      description: "",
      propertyDetails: {
        area: "",
        bedrooms: "",
        bathrooms: "",
        floors: "",
        facing: "",
        builtYear: "",
      },
      status: "Available",
      approvalStatus: "Published",
      isVerified: false,
      isAdopted: false,
      actualPrice: "",
      sellingPrice: "",
      facilities: [],
      services: [],
      nearby: [],
      gallery: [],
      propertyCode: "",
      bhk: "",
    });

    setModalData(null);
    setIsModalOpen(false);
  };
  //Location
  const handleLocationSelect = (data) => {
    setFormData({
      ...formData,
      address: data?.address,
      location: data?.location, // coordinates
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.nested) {
      const nestedKey = dataset.nested; // e.g., "propertyDetails"

      setFormData((prev) => {
        const updatedNested = {
          ...prev[nestedKey],
          [name]: type === "checkbox" ? checked : value,
        };

        // ✅ Auto-calculate area if length or width changed
        if (name === "length" || name === "width") {
          const length =
            parseFloat(name === "length" ? value : prev[nestedKey].length) || 0;
          const width =
            parseFloat(name === "width" ? value : prev[nestedKey].width) || 0;
          updatedNested.area = length * width;
        }

        return {
          ...prev,
          [nestedKey]: updatedNested,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setGalleryLoading(true); // ✅ Start loader

    Promise.all(
      files.map((file) =>
        fileUpload({ url: "upload/uploadImage", cred: { file } })
          .then((res) => res?.data?.data?.imageUrl)
          .catch((error) => {
            console.error("Image upload failed:", error);
            return null;
          })
      )
    )
      .then((uploadedUrls) => {
        const validUrls = uploadedUrls.filter((url) => !!url);
        if (validUrls.length > 0) {
          setFormData((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), ...validUrls],
          }));
        }
      })
      .finally(() => {
        setGalleryLoading(false); // ✅ Stop loader
        if (galleryInputRefs.current[0]) {
          galleryInputRefs.current[0].value = "";
        }
      });
  };


  // Helper function to generate random code
  const generatePropertyCode = () => {
    const prefix = "PROP"; // aap chahe to customize kar sakte ho
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    return `${prefix}-${randomNum}`;
  };

  // useEffect to set property code on modal open
  useEffect(() => {
    if (!modalData) {
      setFormData((prev) => ({
        ...prev,
        propertyCode: generatePropertyCode(),
      }));
    }
  }, [modalData]);

const isFieldRequired = (field) => {
  const type = formData.propertyType?.toLowerCase();

  if (type === "commercial") {
    if (["bhk", "bedrooms"].includes(field)) return false;
  }

  if (type === "apartment") {
    if (["floors", "length", "width", "area"].includes(field)) return false; // 👈 added area
  }

  return true;
};


  const validateForm = () => {
    let newErrors = {};
    const details = formData.propertyDetails || {};

    if (!formData.name.trim()) newErrors.name = "Property name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.propertyType.trim())
      newErrors.propertyType = "Property type is required";
    if (!formData.actualPrice || formData.actualPrice <= 0)
      newErrors.actualPrice = "Valid actual price is required";
    if (!formData.sellingPrice || formData.sellingPrice <= 0)
      newErrors.sellingPrice = "Valid selling price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.propertyCode.trim())
      newErrors.propertyCode = "Property code is required";

    if (formData.propertyType !== "Plot") {
      if (isFieldRequired("area") && !details.area)
        newErrors.area = "Area is required";
      if (isFieldRequired("bedrooms") && !details.bedrooms)
        newErrors.bedrooms = "Bedrooms required";
      if (isFieldRequired("bathrooms") && !details.bathrooms)
        newErrors.bathrooms = "Bathrooms required";
      if (isFieldRequired("floors") && !details.floors)
        newErrors.floors = "Floors required";
      if (isFieldRequired("builtYear")) {
        if (!details.builtYear) {
          newErrors.builtYear = "Built year required";
        } else if (details.builtYear < 1900) {
          newErrors.builtYear = "Built year cannot be less than 1900";
        }
      }

      if (isFieldRequired("bhk") && !formData.bhk)
        newErrors.bhk = "BHK is required";

    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // nearBY

  const handleNearByChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFacilities = [...formData.nearby];

    if (name.includes("Name")) {
      updatedFacilities[index].name = value;
    } else if (name.includes("Distance")) {
      updatedFacilities[index].distance = value;
    }

    setFormData((prev) => ({
      ...prev,
      nearby: updatedFacilities,
    }));
  };

  const addNearBy = () => {
    setFormData((prev) => ({
      ...prev,
      nearby: [...prev.nearby, { name: "", distance: "" }],
    }));
  };

  const removeNearBy = (index) => {
    const updatedFacilities = formData.nearby.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      nearby: updatedFacilities,
    }));
  };

  // document

  const handleDocumentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDocuments = [...formData.documents];

    if (name.includes("Name")) {
      updatedDocuments[index].name = value;
    } else if (name.includes("Number")) {
      updatedDocuments[index].number = value;
    }

    setFormData((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));
  };


  //   const file = e.target.files[0];
  //   if (!file) return;

  //   // Show loader
  //   setFormData((prev) => {
  //     const updatedDocs = [...prev.documents];
  //     updatedDocs[index] = { ...updatedDocs[index], loading: true };
  //     return { ...prev, documents: updatedDocs };
  //   });

  //   fileUpload({
  //     url: `upload/uploadImage`,
  //     cred: { file },
  //   })
  //     .then((res) => {
  //       const uploadedUrl = res.data?.data?.imageUrl;
  //       const updatedDocs = [...formData.documents];
  //       updatedDocs[index] = {
  //         ...updatedDocs[index],
  //         image: uploadedUrl,
  //         loading: false,
  //       };

  //       setFormData((prev) => ({
  //         ...prev,
  //         documents: updatedDocs,
  //       }));
  //     })
  //     .catch((error) => {
  //       console.error("Document image upload failed:", error);
  //       // Stop loader on error
  //       setFormData((prev) => {
  //         const updatedDocs = [...prev.documents];
  //         updatedDocs[index] = { ...updatedDocs[index], loading: false };
  //         return { ...prev, documents: updatedDocs };
  //       });
  //     })
  //     .finally(() => {
  //       if (documentInputRefs.current[index]) {
  //         documentInputRefs.current[index].value = "";
  //       }
  //     });
  // };
  const handleDocumentImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Start loader
    setFormData((prev) => {
      const updatedDocs = prev.documents.map((doc, i) =>
        i === index ? { ...doc, loading: true } : doc
      );
      return { ...prev, documents: updatedDocs };
    });

    fileUpload({
      url: `upload/uploadImage`,
      cred: { file },
    })
      .then((res) => {
        const uploadedUrl = res.data?.data?.imageUrl;
        setFormData((prev) => {
          const updatedDocs = prev.documents.map((doc, i) =>
            i === index
              ? { ...doc, image: uploadedUrl, loading: false }
              : doc
          );
          return { ...prev, documents: updatedDocs };
        });
      })
      .catch((error) => {
        console.error("Document image upload failed:", error);
        setFormData((prev) => {
          const updatedDocs = prev.documents.map((doc, i) =>
            i === index ? { ...doc, loading: false } : doc
          );
          return { ...prev, documents: updatedDocs };
        });
      })
      .finally(() => {
        if (documentInputRefs.current[index]) {
          documentInputRefs.current[index].value = "";
        }
      });
  };


  const removeDocumentImage = (index) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].image = "";
    setFormData((prev) => ({
      ...prev,
      documents: updatedDocuments,
    }));

    if (documentInputRefs.current[index]) {
      documentInputRefs.current[index].value = ""; // reset input field
    }
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { name: "", number: "", image: "" }],
    }));
  };

  const removeDocument = (index) => {
    const updatedFacilities = formData.documents.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      documents: updatedFacilities,
    }));
  };
  // 🔹 Submit handler for edit
  const handleEdit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    putRequest({ url: `properties/${modalData?._id}`, cred: formData })
      .then((res) => {
        toast.success(res?.data?.message || "Property updated successfully");
        setUpdateStatus((prev) => !prev);
        setPropertyStatus((prev) => !prev);
        handleCancel();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.message || "Update failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 🔹 Submit handler for create
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    postRequest({ url: `properties`, cred: formData })
      .then((res) => {
        toast.success(res?.data?.message || "Property added successfully");
        setUpdateStatus((prev) => !prev);
        setPropertyStatus((prev) => !prev);
        handleCancel();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.message || "Creation failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isAnyDocumentUploading = formData?.documents?.some(doc => doc?.loading);
  const isUploading = galleryLoading || isAnyDocumentUploading;

  // units measurent
  // useEffect(() => {
  //   if (!formData?.propertyDetails) return;

  //   const conversionRates = {
  //     length: {
  //       ft: { m: 0.3048, yd: 1 / 3 },
  //       m: { ft: 3.28084, yd: 1.09361 },
  //       yd: { ft: 3, m: 0.9144 },
  //     },
  //     area: {
  //       sqft: { sqm: 0.092903, sqyd: 0.1111, acre: 1 / 43560, hectare: 1 / 107639 },
  //       sqm: { sqft: 10.7639, sqyd: 1.19599, acre: 1 / 4046.86, hectare: 1 / 10000 },
  //       sqyd: { sqft: 9, sqm: 0.836127, acre: 1 / 4840, hectare: 1 / 11960 },
  //       acre: { sqft: 43560, sqm: 4046.86, sqyd: 4840, hectare: 0.404686 },
  //       hectare: { sqft: 107639, sqm: 10000, sqyd: 11960, acre: 2.47105 },
  //     },
  //   };

  //   setFormData((prev) => {
  //     const oldUnit = prev?.measurementUnit || "ft";
  //     const len = parseFloat(prev.propertyDetails.length) || 0;
  //     const wid = parseFloat(prev.propertyDetails.width) || 0;
  //     const area = parseFloat(prev.propertyDetails.area) || 0;

  //     // If switching to or from acre/hectare, reset all
  //     if (
  //       ["acre", "hectare"].includes(oldUnit) ||
  //       ["acre", "hectare"].includes(measurementUnit)
  //     ) {
  //       return {
  //         ...prev,
  //         measurementUnit,
  //         propertyDetails: { ...prev.propertyDetails, length: "", width: "", area: "" },
  //       };
  //     }

  //     // Convert length/width (linear) and area (square)
  //     return {
  //       ...prev,
  //       measurementUnit,
  //       propertyDetails: {
  //         ...prev.propertyDetails,
  //         length: len
  //           ? (len * (conversionRates.length[oldUnit]?.[measurementUnit] || 1)).toFixed(2)
  //           : "",
  //         width: wid
  //           ? (wid * (conversionRates.length[oldUnit]?.[measurementUnit] || 1)).toFixed(2)
  //           : "",
  //         area: area
  //           ? (area *
  //             (conversionRates.area[
  //               oldUnit === "ft"
  //                 ? "sqft"
  //                 : oldUnit === "m"
  //                   ? "sqm"
  //                   : oldUnit === "yd"
  //                     ? "sqyd"
  //                     : oldUnit
  //             ]?.[
  //               measurementUnit === "ft"
  //                 ? "sqft"
  //                 : measurementUnit === "m"
  //                   ? "sqm"
  //                   : measurementUnit === "yd"
  //                     ? "sqyd"
  //                     : measurementUnit
  //             ] || 1)
  //           ).toFixed(2)
  //           : "",
  //       },
  //     };
  //   });
  // }, [measurementUnit]);

  useEffect(() => {
    if (!formData?.propertyDetails) return;

    const conversionRates = {
      length: {
        ft: { m: 0.3048, yd: 1 / 3 },
        m: { ft: 3.28084, yd: 1.09361 },
        yd: { ft: 3, m: 0.9144 },
      },
      area: {
        sqft: { sqm: 0.092903, sqyd: 0.1111, acre: 1 / 43560, hectare: 1 / 107639 },
        sqm: { sqft: 10.7639, sqyd: 1.19599, acre: 1 / 4046.86, hectare: 1 / 10000 },
        sqyd: { sqft: 9, sqm: 0.836127, acre: 1 / 4840, hectare: 1 / 11960 },
        acre: { sqft: 43560, sqm: 4046.86, sqyd: 4840, hectare: 0.404686 },
        hectare: { sqft: 107639, sqm: 10000, sqyd: 11960, acre: 2.47105 },
      },
    };

    // 🧩 Helper to clean decimals like .00
    const formatNumber = (num) => {
      if (!num) return "";
      const rounded = parseFloat(num.toFixed(2));
      return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
    };

    setFormData((prev) => {
      const oldUnit = prev?.measurementUnit || "ft";
      const len = parseFloat(prev.propertyDetails.length) || 0;
      const wid = parseFloat(prev.propertyDetails.width) || 0;
      const area = parseFloat(prev.propertyDetails.area) || 0;

      // If switching to or from acre/hectare, reset all
      if (
        ["acre", "hectare"].includes(oldUnit) ||
        ["acre", "hectare"].includes(measurementUnit)
      ) {
        return {
          ...prev,
          measurementUnit,
          propertyDetails: { ...prev.propertyDetails, length: "", width: "", area: "" },
        };
      }

      // Convert length/width (linear) and area (square)
      return {
        ...prev,
        measurementUnit,
        propertyDetails: {
          ...prev.propertyDetails,
          length: len
            ? formatNumber(len * (conversionRates.length[oldUnit]?.[measurementUnit] || 1))
            : "",
          width: wid
            ? formatNumber(wid * (conversionRates.length[oldUnit]?.[measurementUnit] || 1))
            : "",
          area: area
            ? formatNumber(
              area *
              (conversionRates.area[
                oldUnit === "ft"
                  ? "sqft"
                  : oldUnit === "m"
                    ? "sqm"
                    : oldUnit === "yd"
                      ? "sqyd"
                      : oldUnit
              ]?.[
                measurementUnit === "ft"
                  ? "sqft"
                  : measurementUnit === "m"
                    ? "sqm"
                    : measurementUnit === "yd"
                      ? "sqyd"
                      : measurementUnit
              ] || 1)
            )
            : "",
        },
      };
    });
  }, [measurementUnit]);


  useEffect(() => {
    if (["acre", "hectare"].includes(measurementUnit)) return;

    const len = parseFloat(formData?.propertyDetails?.length);
    const wid = parseFloat(formData?.propertyDetails?.width);

    if (!len || !wid) return;

    const newArea = len * wid;

    const formatNumber = (num) => {
      if (!num) return "";
      const rounded = parseFloat(num.toFixed(2));
      return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
    };

    setFormData((prev) => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        area: formatNumber(newArea),
      },
    }));
  }, [formData?.propertyDetails?.length, formData?.propertyDetails?.width, measurementUnit]);


  return (
    <Modal
      title={modalData ? `Edit Property` : `Add Property`}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      width={1000}
      style={{ top: 20 }}
    >
      <div
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          paddingRight: "50px",
          marginBottom: "50px",
        }}
      >
        <form
          onSubmit={modalData ? handleEdit : handleSubmit}
          className="needs-validation"
        >
          <div className="row">
            <div className="container">
              <div className="grid grid-cols-2 gap-4">
                {/* Property Code */}
                <div>
                  <label className="form-label fw-bold">Property Code *</label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors?.propertyCode ? "is-invalid" : ""
                      }`}
                    name="propertyCode"
                    value={formData?.propertyCode || ""}
                    required
                    onChange={handleChange}
                    placeholder="Enter unique property code"
                  />
                  {errors?.propertyCode && (
                    <div className="invalid-feedback">
                      {errors.propertyCode}
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="form-label fw-bold">Property Type *</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="propertyType"
                    value={formData?.propertyType || ""}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Property Type</option>
                    {typeOption}
                  </select>
                </div>

                {/* Property Name */}
                <div>
                  <label className="form-label fw-bold">Property Name *</label>
                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors?.name ? "is-invalid" : ""
                      }`}
                    name="name"
                    required
                    value={formData?.name || ""}
                    onChange={handleChange}
                    placeholder="Enter property name (e.g., Luxury Villa)"
                  />
                  {errors?.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Actual Price */}
                <div>
                  <label className="form-label fw-bold">
                    Actual Price (₹) *
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="actualPrice"
                    value={formData?.actualPrice || ""}
                    required
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                {/* Selling Price */}
                <div>
                  <label className="form-label fw-bold">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="sellingPrice"
                    value={formData?.sellingPrice || ""}
                    required
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Address */}
                  <div>
                    <label className="form-label fw-bold">Address *</label>
                    <Addressform
                      className="w-full !p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      value={formData?.address || modalData?.address}
                      onSelect={handleLocationSelect}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="form-label fw-bold">Description *</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="description"
                    rows={3}
                    required
                    value={formData?.description || ""}
                    onChange={handleChange}
                    placeholder="Enter property description"
                  />
                </div>
              </div>
            </div>

            {/* =================== */}

            <hr className="m-0 p-0 my-3" />



            <div className="mb-6">
              <label className="form-label fw-bold">
                Property Details</label>

              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Dimensions */}

                {/* Unit Selector */}
                <div className="">
                  <label className="form-label fw-bold">Measurement Unit

                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}

                  >

                    <option value="sqft">Square Feet</option>
                    <option value="sqm">Square Meters</option>
                    <option value="sqyd">Square Yards</option>
                    <option value="acre">Acres</option>
                    <option value="hectare">Hectares</option>
                  </select>
                </div>

                {/* Length & Width — only for linear units */}
                {!["acre", "hectare"].includes(measurementUnit) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label fw-bold">

                        Length {isFieldRequired("length") ? ` *` : "(Optional)"}(
                        {measurementUnit === "sqm"
                          ? "m"
                          : measurementUnit === "sqyd"
                            ? "yd"
                            : "ft"}
                        )
                      </label>

                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="length"

                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.length || ""}
                        onChange={handleChange}
                        placeholder="Enter Length"
                        required={isFieldRequired("length")}
                    
                        min={1}
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold">
                        {/* if apartment its optional */}
                        Width     {isFieldRequired("width") ? ` *` : "(Optional)"}(
                        {measurementUnit === "sqm"
                          ? "m"
                          : measurementUnit === "sqyd"
                            ? "yd"
                            : "ft"}
                        )
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="width"

                        data-nested="propertyDetails"

                        value={formData?.propertyDetails?.width || ""}
                        onChange={handleChange}
                        placeholder="Enter Width"
                            required={isFieldRequired("width")}
                        min={1}
                      />
                    </div>
                  </div>
                )}

                {/* Area Field */}
                <div >
                  <label className="form-label fw-bold">
                    Area (
                    {measurementUnit === "sqm"
                      ? "m²"
                      : measurementUnit === "sqyd"
                        ? "sq.yd"
                        : measurementUnit === "acre"
                          ? "acres"
                          : measurementUnit === "hectare"
                            ? "hectares"
                            : "sq.ft"}
                    )
                  </label>

                  <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded-xl outline-none ${["acre", "hectare"].includes(measurementUnit)
                      ? ""
                      : "bg-gray-100 text-gray-700"
                      }`}
                    name="area"
                    data-nested="propertyDetails"
                    value={formData?.propertyDetails?.area || ""}
                    onChange={handleChange}
                    readOnly={!["acre", "hectare"].includes(measurementUnit)} // only editable if acre/hectare
                    placeholder={
                      ["acre", "hectare"].includes(measurementUnit)
                        ? `Enter area in ${measurementUnit}`
                        : "Auto-calculated"
                    }
                  />
                </div>


                {formData.propertyType !== "Plot" && (
                  <>
                    {/* Bedrooms */}

                    <div
                      className={` ${formData?.propertyType === "Plot" ? "opacity-40" : ""
                        }`}
                    >
                      <label className="form-label fw-bold">
                        Bedrooms{" "}
                        {isFieldRequired("bedrooms") ? "*" : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="bedrooms"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.bedrooms || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of bedrooms"
                        required={isFieldRequired("bedrooms")}
                        min={1}
                      />
                    </div>

                    {/* Bathrooms */}
                    <div
                      className={`  ${formData?.propertyType === "Plot" ? "opacity-40" : ""
                        }`}
                    >
                      <label className="form-label fw-bold">Bathrooms *</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="bathrooms"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.bathrooms || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of bathrooms"
                        required
                        min={1}
                      />
                    </div>

                    {/* Floors */}
                    <div
                      className={` ${formData?.propertyType === "Plot" ? "opacity-40" : ""
                        }`}
                    >
                      <label className="form-label fw-bold">
                        Floors
                        {isFieldRequired("floors") ? ` *` : "(Optional)"}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="floors"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.floors || ""}
                        disabled={formData?.propertyType === "Plot"}
                        onChange={(e) => {
                          if (e.target.value <= 100) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter number of floors"
                        required={isFieldRequired("floors")}
                        min={1}
                      />
                    </div>
                  </>
                )}

                {/* Facing */}
                <div>
                  <label className="form-label fw-bold">Facing *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    name="facing"
                    data-nested="propertyDetails"
                    value={formData?.propertyDetails?.facing || ""}
                    onChange={handleChange}
                    placeholder="Enter facing direction"
                    required
                  />
                </div>

                {formData.propertyType !== "Plot" && (
                  <>
                    {/* Built Year */}
                    <div
                      className={`space-y-3 ${formData?.propertyType === "Plot" ? "opacity-40" : ""
                        }`}
                    >
                      <label className="form-label fw-bold">Built Year *</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        name="builtYear"
                        data-nested="propertyDetails"
                        value={formData?.propertyDetails?.builtYear || ""}
                        disabled={formData?.propertyType === "Plot"}

                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 4) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter year built  above (1900)"
                        required
                        min={1900}

                      />
                    </div>
                  </>
                )}
              </div>
            </div>




            <hr className="m-0 p-0 my-3" />

            {/* ======================= */}

            <div className="grid grid-cols-2 gap-4">
              {formData.propertyType !== "Plot" && (
                <>
                  {/* Facilities */}
                  <div
                    className={`${formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                  >
                    <label className="form-label fw-bold">Facilities </label>
                    <Select
                      value={formData?.facilities}
                      mode="tags"
                      size="large"
                      style={{ width: "100%" }}
                      required
                      placeholder="Enter/Select Your Facilities"
                      disabled={formData?.propertyType === "Plot"}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          facilities: value,
                        });
                      }}
                      options={facilites?.map((service) => ({
                        label: service?.name,
                        value: service?.name,
                      }))}
                    />
                  </div>

                  {/* Services */}
                  <div
                    className={`${formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                  >
                    <label className="form-label fw-bold">Services </label>
                    <Select
                      value={formData?.services}
                      mode="tags"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Enter/Select Your Services"
                      required
                      disabled={formData?.propertyType === "Plot"}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          services: value,
                        });
                      }}
                      options={services?.map((service) => ({
                        label: service?.name,
                        value: service?.name,
                      }))}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {formData.propertyType !== "Plot" && (
                <>
                  {/*BHK*/}
                  <div
                    className={`space-y-3 ${formData?.propertyType === "Plot" ? "opacity-40" : ""
                      }`}
                  >
                    <label className="form-label fw-bold">
                      BHK
                      {isFieldRequired("bhk") ? ` *` : "(Optional)"}
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      name="bhk"
                      value={formData?.bhk || ""}
                      required={isFieldRequired("bhk")}
                      onChange={handleChange}
                      disabled={formData?.propertyType === "Plot"}
                    >
                      <option value="">Select BHK</option>
                      {bhkOption}
                    </select>
                  </div>
                </>
              )}
              {/* Property Images Upload */}

              <div className="relative">
                <label className="form-label fw-bold">Property Images *</label>

                {/* File Input */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  ref={(el) => (galleryInputRefs.current[0] = el)}
                  onChange={handleChangeImage}
                  required={!(formData?.gallery?.length > 0)}
                  disabled={galleryLoading}
                />

                {/* Image Preview + Loader Grid */}
                {(formData?.gallery?.length > 0 || galleryLoading) && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {/* Uploaded Images */}
                      {formData.gallery?.map((item, index) => (
                        <div
                          key={`uploaded-${index}`}
                          className="relative bg-gray-100 border border-gray-300 overflow-hidden rounded-md"
                          style={{ width: "70px", height: "70px" }}
                        >
                          <img
                            src={item}
                            alt={`gallery-${index}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, i) => i !== index),
                              }));
                              if (galleryInputRefs.current[0])
                                galleryInputRefs.current[0].value = "";
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer shadow-md"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Upload Loader (Animated Circle) */}
                      {galleryLoading && (
                        <div
                          className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md"
                          style={{ width: "70px", height: "70px" }}
                        >
                          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>


            </div>

            <hr className="m-0 p-0 my-3" />

            {/* Nearby */}
            <div className="col-span-2">
              <label className="form-label font-bold">Nearby Location</label>

              {formData?.nearby?.map((facility, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 border p-4 rounded mb-2 items-end"
                >
                  {/* Name */}
                  <div>
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      name={`facilityName_${index}`}
                      value={facility?.name || ""}
                      onChange={(e) => handleNearByChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter nearby name"
                      required
                    />
                  </div>

                  {/* Distance / Description */}
                  <div>
                    <label className="form-label">Distance *</label>
                    <input
                      type="number"
                      name={`facilityDistance_${index}`}
                      value={facility?.distance || ""}
                      onChange={(e) => handleNearByChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter distance"
                      required
                    />
                  </div>

                  {/* Remove Button */}
                  {formData?.nearby?.length > 0 && (
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all"
                        onClick={() => removeNearBy(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <div className="col-span-2 mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-all"
                  onClick={addNearBy}
                >
                  Add More
                </button>
              </div>
            </div>

            <hr className="m-0 p-0 my-3" />
            {/* Documents */}
            <div className="col-span-2">
              <label className="form-label font-bold">Documents</label>

              {formData?.documents?.map((doc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 border p-4 rounded mb-2 items-end"
                >
                  {/* Document Name */}
                  <div>
                    <label className="form-label">Document Name *</label>
                    <select
                      name={`documentName_${index}`}
                      value={doc?.name}
                      onChange={(e) => handleDocumentChange(e, index)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select Document</option>
                      {documentsOption}
                    </select>
                  </div>

                  {/* Document Number */}
                  <div>
                    <label className="form-label">Document Number *</label>
                    <input
                      type="text"
                      name={`documentNumber_${index}`}
                      value={doc?.number || ""}
                      onChange={(e) => handleDocumentChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter document number"
                      required
                    />
                  </div>

                  {/* Document Image Upload */}
                  <div className="relative">
                    <label className="form-label fw-bold">Document Image *</label>

                    {/* File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      onChange={(e) => handleDocumentImageChange(e, index)}
                      required={!doc?.image}
                      ref={(el) => (documentInputRefs.current[index] = el)}
                      disabled={doc?.loading} // ✅ Disable while uploading
                    />

                    {/* Image Preview + Loader */}
                    {(doc?.image || doc?.loading) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {/* Uploaded Image Preview */}
                        {doc?.image && (
                          <div
                            className="relative bg-gray-100 border border-gray-300 overflow-hidden rounded-md"
                            style={{ width: "70px", height: "70px" }}
                          >
                            <img
                              src={doc.image}
                              alt={`doc-${index}`}
                              className="w-full h-full object-cover"
                            />

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => removeDocumentImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer shadow-md"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Loader Spinner */}
                        {doc?.loading && (
                          <div
                            className="flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded-md"
                            style={{ width: "70px", height: "70px" }}
                          >
                            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Remove Document Button */}
                  {formData?.documents?.length > 0 && (
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all"
                        onClick={() => removeDocument(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <div className="col-span-2 mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-all"
                  onClick={addDocument}
                >
                  Add More
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 pt-4 w-full">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-4 py-3 mb-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium text-sm"
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isUploading}
              className={`w-full sm:w-auto px-4 py-3 mb-2 rounded-lg text-white font-medium text-sm transition-all duration-200
      ${loading || isUploading
                  ? "bg-[#004f8a] opacity-50 cursor-not-allowed"
                  : "bg-[#004f8a] hover:bg-[#0066b2]"
                }`}
            >
              {loading
                ? "Saving..."
                : isUploading
                  ? "Please wait, uploading images..."
                  : modalData
                    ? "Update Property"
                    : "Create Property"}
            </button>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default AddPropertyModal;
