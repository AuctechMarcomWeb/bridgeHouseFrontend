import React, { useState } from 'react';
import { Search, Download, Filter, Calendar, CreditCard, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
// import { getRequest } from '../Helpers';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    // const [paymentData ,setPaymentData] =useState([])


    //   useEffect(()=>{
    //       const res=getRequest({url:"/payment",cred:{}})
    //       setPaymentData(res.data.data)
    //   })
    0

    // Sample payment data
    const [payments] = useState([
        {
            id: 'PAY-001',
            date: '2024-09-15',
            amount: 29.99,
            currency: 'USD',
            status: 'completed',
            plan: 'Pro Monthly',
            method: 'Visa •••• 4242',
            invoice: 'INV-2024-001'
        },
        {
            id: 'PAY-002',
            date: '2024-08-15',
            amount: 29.99,
            currency: 'USD',
            status: 'completed',
            plan: 'Pro Monthly',
            method: 'Visa •••• 4242',
            invoice: 'INV-2024-002'
        },
        {
            id: 'PAY-003',
            date: '2024-07-15',
            amount: 29.99,
            currency: 'USD',
            status: 'failed',
            plan: 'Pro Monthly',
            method: 'Visa •••• 4242',
            invoice: 'INV-2024-003'
        },
        {
            id: 'PAY-004',
            date: '2024-06-15',
            amount: 299.99,
            currency: 'USD',
            status: 'completed',
            plan: 'Pro Annual',
            method: 'Mastercard •••• 5555',
            invoice: 'INV-2024-004'
        },
        {
            id: 'PAY-005',
            date: '2024-06-01',
            amount: 29.99,
            currency: 'USD',
            status: 'pending',
            plan: 'Pro Monthly',
            method: 'PayPal',
            invoice: 'INV-2024-005'
        },
        {
            id: 'PAY-006',
            date: '2024-05-15',
            amount: 29.99,
            currency: 'USD',
            status: 'refunded',
            plan: 'Pro Monthly',
            method: 'Visa •••• 4242',
            invoice: 'INV-2024-006'
        }
    ]);


    // console.log("==================",paymentData);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'failed':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'refunded':
                return <AlertCircle className="h-5 w-5 text-blue-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'failed':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'refunded':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };



    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    console.log("====================>>>>", filteredPayments)

    const totalSpent = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + payment.amount, 0);

    return (

        <div className="max-w-6xl mx-auto p-6 bg-gray- min-h-screen mt-3">
            <div className=" bg-[#004d88] border-b border-gray-500 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Payment History</h1>
                        <p className="text-white mt-1">Manage and view your subscription payments</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-blue-600 rounded-lg 
                   hover:bg-blue-50 transition-all duration-300 shadow-lg text-sm sm:text-base">

                        <Download className="h-4 w-4 sm:h-5 sm:w-5" />

                        <span className="hidden sm:inline font-semibold">Export</span>
                    </button>

                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center">
                            <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Spent</p>
                                <p className="text-2xl font-bold text-blue-900">{formatAmount(totalSpent, 'USD')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-green-600">Successful Payments</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {payments.filter(p => p.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-purple-600">Next Payment</p>
                                <p className="text-2xl font-bold text-purple-900">Oct 15</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Header */}

            <div className='mt-4'>
                {/* Filters */}

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search payments..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Payment List */}
            <div className="overflow-x-auto mt-4">

                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment ID
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment Method
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Invoice
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">{payment.id}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(payment.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">{payment.plan}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatAmount(payment.amount, payment.currency)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.method}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(payment.status)}
                                        <span className={getStatusBadge(payment.status)}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium hover:underline">
                                        {payment.invoice}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Showing {filteredPayments.length} of {payments.length} payments</span>
                    <div className="flex items-center gap-4">
                        <button className="hover:text-gray-700">Previous</button>
                        <span>Page 1 of 1</span>
                        <button className="hover:text-gray-700">Next</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PaymentHistory;