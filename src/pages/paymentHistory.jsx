import React, { useContext, useState, useEffect } from "react";
import {
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { getRequest } from "../Helpers";
import { ProfileContext } from "../context/ProfileContext";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { user } = useContext(ProfileContext);

  const fetchPayments = () => {
    if (!user?._id) return;
    getRequest(`payment/getList?userId=${user._id}&page=${page}&limit=${limit}`)
      .then((res) => {
        const list = res?.data?.data?.orders || [];
        setPayments(list);
        setTotalPayments(res?.data?.data?.totalOrders || 0);
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    fetchPayments();
  }, [user, page]);

  useEffect(() => {
    let list = [...payments];

    // Search filter
    if (searchTerm) {
      list = list.filter(
        (p) =>
          p.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.planName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }

    setFilteredPayments(list);
  }, [payments, searchTerm, statusFilter]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const totalPages = Math.ceil(totalPayments / limit);
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);
  const totalSpent = payments.reduce(
    (sum, p) => (p.status === "completed" ? sum + (p.price || 0) : sum),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12 ">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold">Payment History</h1>
          <p className="mt-2 text-blue-200 text-sm md:text-base">
            Manage and view your subscription payments
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-lg hover:scale-105 transform transition-all">
              <CreditCard className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatAmount(totalSpent)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-lg hover:scale-105 transform transition-all">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Successful Payments</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {payments.filter((p) => p.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-indigo-400 opacity-15 rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
        {/* Filters */}

<div className="flex flex-col sm:flex-row gap-6 mb-6">
  {/* Search Input */}
  <div className="flex flex-col flex-1">
    <label className="font-semibold text-gray-700 mb-1">Search</label>
    <Input
      placeholder="Search payments..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      allowClear
      className="custom-input"
    />
  </div>

  {/* Status Filter */}
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-1">Status</label>
    <Select
      value={statusFilter}
      onChange={(val) => setStatusFilter(val)}
      style={{ width: 200 }}
      className="custom-input"
    >
      <Option value="all">All Status</Option>
      <Option value="paid">Completed</Option>
      <Option value="pending">Pending</Option>
      <Option value="failed">Failed</Option>
    </Select>
  </div>
</div>


        {/* Payment Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {["Payment ID", "Date", "Plan", "Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.razorpayPaymentId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.planName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatAmount(payment.price || 0)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPayments.length === 0 && (
            <p className="text-center py-6 text-gray-500">No payments found</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <button
            disabled={page === 1}
            onClick={handlePrev}
            className="hover:text-gray-700"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={handleNext}
            className="hover:text-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
