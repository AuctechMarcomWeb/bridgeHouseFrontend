import React from "react";
import { Modal, Carousel } from "antd";
import {
  Home,
  FileText,
  MapPin,
  ClipboardCheck,
  Square,
  Bed,
  Bath,
  Layers,
  Compass,
  Calendar,
  IndianRupee,
  Hash,
  CheckCircle,
  XCircle,
  Wrench,
  Droplet,
  Star,
  Folder,
} from "lucide-react";

const PropertyDetailsModal = ({ open, onClose, property, width = 1000 }) => {
  if (!property) return null;

  const galleryImages = Array.isArray(property.gallery) ? property.gallery : [];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
      destroyOnClose
    >
      {/* ---------- 2-Column Layout ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ==== LEFT: Images + Badges ==== */}
        <div className="relative">
          {galleryImages.length > 0 ? (
            <Carousel autoplay className="rounded-xl overflow-hidden">
              {galleryImages.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded-xl">
              <Home className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* --- Verification Badge --- */}
          <div className="absolute top-4 left-4">
            {/* Verified Badge */}
            {property.isVerified && (
              <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            )}
          </div>

          {/* --- Approval Badge --- */}
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {property.approvalStatus ?? "Pending"}
            </span>
          </div>

          {/* --- Name & Address --- */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {property.name}
            </h2>
            <p className="flex items-center gap-2 text-gray-600 mt-1 text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              {property.address}
            </p>
          </div>
        </div>

        {/* ==== RIGHT: Details ==== */}

        <div className="space-y-4 text-sm text-gray-700">
          {property.description && (
            <p className="text-gray-700 mt-2 text-sm">
              <strong> Description:</strong> {property.description}
            </p>
          )}
          {/* Facilities */}
          {(property.facilities || []).length > 0 && (
            <div className="flex items-center gap-1 text-gray-700 mt-1 text-sm">
              <span className="text-blue-500">
                <Home className="w-4 h-4" />
              </span>
              {/* <h4 className="font-semibold m-0">Facilities:</h4> */}
              <strong>Facilities:</strong>
              <span>{property.facilities.join(", ")}</span>
            </div>
          )}

          {/* Services */}
          {(property.services || []).length > 0 && (
            <div className="flex items-center gap-1 text-gray-700 mt-1 text-sm">
              <span className="text-blue-500">
                <Layers className="w-4 h-4" />
              </span>
              {/* <h4 className="font-semibold m-0">Services:</h4> */}
              <strong>Services:</strong>
              <span>{property.services.join(", ")}</span>
            </div>
          )}

          {/* Nearby */}
          {property.nearby?.length > 0 && (
            <div className="flex items-center gap-1 text-gray-700 mt-1 text-sm">
              <span className="text-red-500">
                <MapPin className="w-4 h-4" />
              </span>
              {/* <h4 className="font-semibold m-0">Nearby:</h4> */}
              <strong>Nearby:</strong>
              <span>
                {property.nearby
                  .map((n) => `${n.name} — ${n.distance ?? "—"} Km`)
                  .join(", ")}
              </span>
            </div>
          )}

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Square className="w-4 h-4 text-blue-500" />
              <strong>Area:</strong> {property.propertyDetails?.area ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-blue-500" />
              <strong>Bedrooms:</strong>{" "}
              {property.propertyDetails?.bedrooms ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-blue-500" />
              <strong>Bathrooms:</strong>{" "}
              {property.propertyDetails?.bathrooms ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <strong>Floors:</strong> {property.propertyDetails?.floors ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-500" />
              <strong>Facing:</strong> {property.propertyDetails?.facing ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <strong>Built Year:</strong>{" "}
              {property.propertyDetails?.builtYear ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-blue-500" />
              <strong>Price:</strong> ₹{property.actualPrice ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-red-500" />
              <strong>Selling:</strong> ₹{property.sellingPrice ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-400" />
              <strong>Type:</strong> {property.propertyType ?? "—"}
            </p>
            <p className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-500" />
              <strong>Code:</strong> {property.propertyCode ?? "—"}
            </p>
          </div>

          {/* Documents */}
          {property.documents?.length > 0 && (
            <div className="flex items-start gap-2 text-gray-700 mt-2 text-sm">
              <h4 className="font-semibold flex items-center gap-1 m-0">
                <FileText className="w-4 h-4 text-blue-600" /> Documents:
              </h4>
              <span className="flex flex-wrap gap-2">
                {property.documents.map((doc, i) => (
                  <span key={doc._id}>
                    <strong>{doc.name}</strong> ({doc.number})
                    <a
                      href={doc.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 underline"
                    >
                      View File
                    </a>
                    {i < property.documents.length - 1 && ","}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PropertyDetailsModal;
