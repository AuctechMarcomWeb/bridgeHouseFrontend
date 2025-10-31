import React from "react";
 function BridgeHousePolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
            <div className="flex items-start gap-4 md:gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                B
              </div>
              <div>
                <h1 className="text-2xl text-[#005697] md:text-3xl font-semibold">BridgeHouse — Policies for Sellers & Buyers</h1>
                <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                  Clear, fair, and transparent policies to protect both property sellers and buyers. Read below to
                  understand listing rules, fees, responsibilities, privacy, and dispute resolution steps.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <article className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl text-[#005697] font-semibold mb-3">For Sellers</h2>
            <p className="text-sm text-gray-600 mb-4">
              Sellers are expected to provide accurate property information, respond to buyer inquiries in a
              timely manner, and follow the listing and verification requirements below.
            </p>

            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <strong className="font-medium">Listing accuracy:</strong> Provide truthful descriptions, current
                photos, and correct property measurements. Misleading or fraudulent listings will be removed.
              </li>
              <li>
                <strong className="font-medium">Verification:</strong> You may be asked to submit identity or
                ownership documents to verify the listing.
              </li>
              <li>
                <strong className="font-medium">Fees & commissions:</strong> Any platform fees, listing costs, or
                commission terms will be shown during listing submission and in your account settings.
              </li>
              <li>
                <strong className="font-medium">Communication:</strong> Respond to inquiries within a reasonable
                timeframe. Repeated non-responsiveness may lead to temporary listing suspension.
              </li>
              <li>
                <strong className="font-medium">Prohibited content:</strong> Listings that violate local laws,
                infringe intellectual property, or contain discriminatory language are not allowed.
              </li>
            </ul>
          </article>

          <article className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl text-[#005697] font-semibold mb-3">For Buyers</h2>
            <p className="text-sm text-gray-600 mb-4">
              Buyers should verify property details, exercise due diligence, and use secure payment and
              communication channels. Below are key expectations and protections.
            </p>

            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <strong className="font-large">Due diligence:</strong> Inspect properties in person or via a
                trusted representative whenever possible. Verify ownership documents before completing a purchase.
              </li>
              <li>
                <strong className="font-medium">Offers & agreements:</strong> Offers made through the platform may
                be subject to local laws and customary real-estate practices.
              </li>
              <li>
                <strong className="font-medium">Payments:</strong> Use the platform's recommended payment methods
                where available. Beware of requests to pay off-platform to unknown recipients.
              </li>
              <li>
                <strong className="font-medium">Privacy:</strong> Your personal contact details will only be
                shared with sellers after you initiate contact or place an offer, unless you opt out.
              </li>
              <li>
                <strong className="font-medium">Dispute assistance:</strong> We provide a mediation path for
                disputes arising from verified platform activity. See the Dispute Resolution section for details.
              </li>
            </ul>
          </article>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Policies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Listing Removal</h3>
              <p>
                We reserve the right to suspend or remove listings that violate our policies or applicable laws.
                Sellers will be notified where possible.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Refunds & Cancellations</h3>
              <p>
                Refunds for platform fees are handled case-by-case. Purchase-related cancellations follow local
                law and any signed sales agreements between buyer and seller.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Privacy & Data</h3>
              <p>
                We collect and process user data to operate the platform and connect buyers and sellers. See the
                Privacy section for details about data use, retention, and your rights.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Dispute Resolution</h2>
          <p className="text-sm text-gray-700 mb-3">
            If a dispute arises from activity on the platform (for example, a listing that differs materially from
            the delivered property), both parties should try to resolve it directly. If that fails, submit a dispute
            through our Help Center with supporting documents. We offer mediation for verified in-platform
            transactions; we do not act as a replacement for a court of law.
          </p>

          <ol className="list-decimal pl-5 text-sm text-gray-700">
            <li>Open direct communication between buyer and seller.</li>
            <li>Collect evidence: messages, receipts, photos, government documents.</li>
            <li>File a dispute with our team and attach evidence.</li>
            <li>Mediation attempt — outcome may include refund, relisting, or other remedies.</li>
          </ol>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Privacy</h2>
          <p className="text-sm text-gray-700 mb-3">
            We respect your privacy. Personal data is used to run the platform, verify identities, and enable
            transactions. We retain data as required to comply with legal obligations and to protect our users.
          </p>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>Data shared with third parties:</strong> We may share limited data with payment processors,
              identity verification services, and legal authorities when required.
            </li>
            <li>
              <strong>Your rights:</strong> Access, correction, deletion requests are supported subject to legal
              retention requirements. Contact privacy@example.com.
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Terms & Compliance</h2>
          <p className="text-sm text-gray-700 mb-3">
            By using the platform, you agree to our terms of service and local laws that apply to property
            transactions. You are responsible for understanding any taxes, transfer fees, or regulatory
            requirements in your jurisdiction.
          </p>
        </section>

        {/* <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3">
            <details className="p-4 border rounded-lg">
              <summary className="font-medium cursor-pointer">How do I verify a seller?</summary>
              <p className="mt-2 text-sm text-gray-700">Request ownership documents and compare them with public
                land registry records where available. Use video walkthroughs for extra confidence.</p>
            </details>

            <details className="p-4 border rounded-lg">
              <summary className="font-medium cursor-pointer">What payment methods are supported?</summary>
              <p className="mt-2 text-sm text-gray-700">Supported payment methods depend on the region and the
                transaction type; for high-value transfers, escrow or bank transfers are recommended.</p>
            </details>

            <details className="p-4 border rounded-lg">
              <summary className="font-medium cursor-pointer">Can I report a fraudulent listing?</summary>
              <p className="mt-2 text-sm text-gray-700">Yes — use the "Report" button on the listing or contact
                support with the listing ID and evidence.</p>
            </details>
          </div>
        </section> */}

        {/* <footer className="text-center text-sm text-gray-500 py-6">
          <p>Need a tailored policy or localization for your country? Contact us at <a href="mailto:policy@example.com" className="text-blue-600 underline">policy@example.com</a>.</p>
          <p className="mt-2">© {new Date().getFullYear()} Property Platform. All rights reserved.</p>
        </footer> */}
      </div>
    </main>
  );
}

export default BridgeHousePolicy;
