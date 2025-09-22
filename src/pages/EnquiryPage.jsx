import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Home, Users, Award, TrendingUp, Heart, Shield, Star, ArrowRight } from 'lucide-react';
import { ProfileContext } from "../context/ProfileContext";
import axios from "axios";
import { getRequest } from "../Helpers";
import EnquiryViewModal from "../components/EnquiryModals/EnquiryViewModal";
import EnquiryEditModal from "../components/EnquiryModals/EnquiryEditModal";
import { Eye, Edit } from "lucide-react";

const EnquiryPage = () => {



  const { user } = useContext(ProfileContext)
  console.log("user ka data context ke through=====", user)

  const [searchText, setSearchText] = useState("");
  const [enquiries, setEnquiries] = useState([])

  const [modalData, setModalData] = useState("")
  const [viewModalStatus, setViewModalStatus] = useState(false)
  const [editModalStatus, setEditModalStatus] = useState(false)




  console.log("modalData", modalData);

  const handleCancel = () => {
    setViewModalStatus(false);
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md", "lg"],
    },
    {
      title: "message",
      dataIndex: "notes",
      key: "notes",
      responsive: ["md", "lg"],
      render: (text) => <span className="line-clamp-2">{text}</span>,
    },
    {
      title: "Property Name",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: ((item) => {

        return (
          <>{item?.name}</>
        )
      })
    },
    {
      title: "Property Code",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: ((item) => {

        return (
          <>{item?.propertyCode}</>
        )
      })
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      render: ((_, item) => {

        console.log("item", item);

        return (
          <>{item?.status}</>
        )
      })
    },
    
    {
      title: "Action",
      dataIndex: "property",
      key: "property",
      responsive: ["lg"],
      render: ((_, item) => {


        return (
          <>

             <div className="flex gap-3">
    {/* View Button with Icon */}
    <button
      onClick={() => {
        setModalData(item);
        setViewModalStatus(true);
      }}
      className="p-2 rounded-full hover:bg-blue-100 transition"
    >
      <Eye className="text-blue-600 w-5 h-5" />
    </button>

    {/* Edit Button with Icon */}
    <button
      onClick={() => {
        setModalData(item);
        setEditModalStatus(true);
      }}
      className="p-2 rounded-full hover:bg-green-100 transition"
    >
      <Edit className="text-green-600 w-5 h-5" />
    </button>
  </div>
          </>
        )
      })
    },
  ];


  useEffect(() => {

      getRequest(`enquiry?addedBy=${user?._id}`).then((res) => {
      setEnquiries(res?.data?.data?.enquiries)
   
    }).catch((error) => {
      console.log("error", error);

    })



  }, [user])


  return (
    <>

      {/* Top Info Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 w-full shadow-lg mb-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:py-18 py-12">
          <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-lg">
              Property Enquiries
            </h1>

            {/* Subtitle */}
            <p className="md:text-xl text-base text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Manage and track all your property enquiries in a comprehensive table view
            </p>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400 opacity-15 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></div>
      </div>


      {/* Filter / Search Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#004d88]  mb-4">Filter Enquiries</h2>

          {/* Form Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <Input
              placeholder="Search by name, email, phone"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 min-w-[200px] md:min-w-[250px] rounded-xl border border-gray-300 
                   focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />

            {/* Status Dropdown */}
            <select className="min-w-[150px] rounded-xl border border-gray-300 p-2 
                         focus:ring-2 focus:ring-cyan-400 transition-all duration-300">
              <option>All Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Interested</option>
              <option>Closed</option>
            </select>

            {/* Export Button */}
  <Button
  type="primary"
  className="!bg-[#004d88] text-white font-semibold 
             transition-all duration-300 rounded-lg shadow-md"
>
  Export
</Button>


          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
          <Table
            bordered
            dataSource={enquiries}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
            className="rounded-xl font-bold"
          />
        </div>
      </div>


      {
        viewModalStatus && (



          <EnquiryViewModal openModal={viewModalStatus} modalData={modalData} setModal={setViewModalStatus} />


        )
      }
      {
        editModalStatus && (



          <EnquiryEditModal openModal={editModalStatus} modalData={modalData} setModal={setEditModalStatus} />


        )
      }



    </>


  );
};

export default EnquiryPage;


// bg- 