import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className=" bg-gray-50">
          <div className="max-w-7xl mx-auto  px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-2">
              <div className="flex mt-9 items-center mb-8">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <h1 className="text-3xl  font-bold text-gray-900">
                  Terms and Conditions
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-8">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-green-800 font-semibold">
                        Effective Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div> */}

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to Doctor Adda. These Terms and Conditions ("Terms")
                    govern your use of our healthcare consultation platform and
                    mobile application ("Service"). By accessing or using our
                    Service, you agree to be bound by these Terms.
                  </p>
                  <p className="text-gray-700">
                    If you disagree with any part of these terms, then you may
                    not access the Service. These Terms constitute a legally
                    binding agreement between you and Doctor Adda.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Description of Service
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Doctor Adda is a telemedicine platform that connects
                    patients with licensed healthcare providers for remote
                    consultations, medical advice, and healthcare services. Our
                    Service includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Video and audio consultations with licensed doctors</li>
                    <li>Chat-based medical consultations</li>
                    <li>Prescription services (where legally permitted)</li>
                    <li>Medical record management</li>
                    <li>Health monitoring and follow-up services</li>
                    <li>Educational health content and resources</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. User Eligibility and Registration
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    3.1 Eligibility
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You must be at least 18 years old to use our Service
                    independently. Minors may use the Service with parental
                    consent and supervision.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    3.2 Account Registration
                  </h3>
                  <p className="text-gray-700 mb-4">
                    To use our Service, you must create an account and provide
                    accurate, current, and complete information. You are
                    responsible for maintaining the confidentiality of your
                    account credentials.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Medical Disclaimer and Limitations
                  </h2>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      IMPORTANT MEDICAL DISCLAIMER
                    </h3>
                    <ul className="list-disc pl-6 text-red-700">
                      <li>
                        Doctor Adda is NOT for medical emergencies. Call 911 or
                        go to the nearest emergency room for emergencies.
                      </li>
                      <li>
                        Our Service does not replace in-person medical care when
                        required.
                      </li>
                      <li>
                        We cannot provide controlled substance prescriptions.
                      </li>
                      <li>
                        Telemedicine has limitations and may not be suitable for
                        all medical conditions.
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    4.1 No Doctor-Patient Relationship
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The use of our platform does not create a traditional
                    doctor-patient relationship. Healthcare providers on our
                    platform are independent contractors.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    4.2 Medical Advice Limitations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Medical advice provided through our Service is based on the
                    information you provide. It is your responsibility to
                    provide accurate and complete health information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. User Responsibilities
                  </h2>
                  <p className="text-gray-700 mb-4">
                    As a user of Doctor Adda, you agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Provide accurate and truthful health information</li>
                    <li>Use the Service only for lawful purposes</li>
                    <li>Respect healthcare providers and other users</li>
                    <li>
                      Keep your account information secure and confidential
                    </li>
                    <li>Not share your account with others</li>
                    <li>Follow prescribed treatments and medical advice</li>
                    <li>Pay for services as agreed</li>
                    <li>
                      Not use the Service for controlled substance prescriptions
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Healthcare Provider Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Healthcare providers using our platform must:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>
                      Maintain valid medical licenses in applicable
                      jurisdictions
                    </li>
                    <li>
                      Comply with medical ethics and professional standards
                    </li>
                    <li>Provide care within their scope of practice</li>
                    <li>Maintain patient confidentiality</li>
                    <li>Follow telemedicine regulations and guidelines</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Payment Terms
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    7.1 Fees and Charges
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You agree to pay all fees for services used through our
                    platform. Prices are clearly displayed before purchase. All
                    payments are processed securely through our payment
                    partners.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    7.2 Refund Policy
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Refunds may be provided in cases of technical issues,
                    provider unavailability, or other circumstances at our
                    discretion. Refund requests must be submitted within 24
                    hours of the consultation.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Privacy and Data Protection
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Your privacy is important to us. Our collection and use of
                    your personal information is governed by our Privacy Policy,
                    which is incorporated into these Terms by reference.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Intellectual Property
                  </h2>
                  <p className="text-gray-700 mb-4">
                    All content, features, and functionality of our Service are
                    owned by Doctor Adda and are protected by copyright,
                    trademark, and other intellectual property laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    10. Prohibited Uses
                  </h2>
                  <p className="text-gray-700 mb-4">
                    You may not use our Service to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Impersonate another person or entity</li>
                    <li>Transmit spam, viruses, or malicious code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>
                      Use the Service for any illegal drug-seeking behavior
                    </li>
                    <li>Harass, threaten, or abuse other users or providers</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    11. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Doctor Adda shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages
                    arising from your use of the Service. Our total liability
                    shall not exceed the amount paid by you for the Service in
                    the 12 months preceding the claim.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    12. Termination
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your account and access to the
                    Service immediately, without prior notice, for any reason,
                    including breach of these Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    13. Governing Law
                  </h2>
                  <p className="text-gray-700 mb-4">
                    These Terms shall be governed by and construed in accordance
                    with the laws of [Your Jurisdiction], without regard to its
                    conflict of law provisions.
                  </p>
                </section>

                {/* <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    14. Contact Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms, please contact
                    us:
                  </p>
                  <div className="bg-gray-100 p-4 rounded">
                    <p>
                      <strong>Email:</strong> legal@doctoradda.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Healthcare Street, Medical
                      City, MC 12345
                    </p>
                  </div>
                </section> */}

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    15. Changes to Terms
                  </h2>
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms at any time. We
                    will notify users of any changes by posting the new Terms on
                    this page. Changes become effective immediately upon
                    posting.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
