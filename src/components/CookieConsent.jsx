import React, { useEffect, useState } from "react";
import useCookie from "../hooks";

export default function CookieConsent() {
  const { getCookie, setCookie } = useCookie();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) setShowBanner(true);
  }, [getCookie]);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", 180); // valid for 6 months
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie("cookieConsent", "false", 180);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
      <p className="text-sm md:text-base max-w-2xl">
        We use cookies to improve your experience. By clicking “Accept”, you
        consent to the use of cookies in accordance with our Cookie Policy.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
