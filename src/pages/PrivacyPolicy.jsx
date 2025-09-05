import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex mt-7 items-center mb-8">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Privacy Policy
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    1. What Information We Collect
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may collect the following personal details:
                  </p>

                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Full Name</li>
                    <li>DOB</li>
                    <li>Phone Number</li>
                    <li>Gender</li>
                    <li>Email Address</li>
                    <li>medical data (appointments, prescriptions)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 mb-4">Your Data Helps us:</p>

                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Data is used for authentication</li>
                    <li>bookings</li>
                    <li>consultations</li>
                    <li>medicine orders and to personalize user experience</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. Protection Measures
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We apply encryption, access controls, and secure server
                    infrastructure to protect your data from unauthorized access
                    and misuse.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Sharing of Information
                  </h2>

                  <p className="text-gray-700 mb-4">
                    We only share data with doctors, pharmacies, labs, and legal
                    authorities when required.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We use encryption and secure servers, but users should also
                    protect their account credentials.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Data Retention
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Data is retained temporarily and deleted after a certain
                    period. Users can export their data.{" "}
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Changes to Policy
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may update this policy and notify you through the app.{" "}
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Contact Us
                  </h2>

                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Email: support@doctoradda.com</li>
                    <li>
                      Address: Sai Heights, C-3/76, Vibhuti Khand, Gomti Nagar,
                      Lucknow, Uttar Pradesh 226010{" "}
                    </li>
                    <li>Phone: +919838075493</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
};



export default PrivacyPolicy;
