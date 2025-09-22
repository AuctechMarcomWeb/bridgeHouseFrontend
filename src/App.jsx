import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import PropertyDetailPage from "./components/PropertyDetailPage";
import PropertyListings from "./components/PropertyListings";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import RealEstateGallery from "./components/RealEstateGallery";
import RealEstateProfile from "./pages/RealEstateProfile";
import { ProfileProvider } from "./context/ProfileContext";
import EnquiryPage from "./pages/EnquiryPage";
import { Toaster } from "react-hot-toast";
import PaymentHistory from "./pages/paymentHistory";
// import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginTop: "60px",
          },
        }}
      />
      <Router>
        {/* <ProfileProvider> */}
        <Navbar />
        {/* </ProfileProvider> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/gallery" element={<RealEstateGallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<RealEstateProfile />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
            <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Route path="/property-detail" element={<PropertyDetailPage />} /> */}
          <Route path="/property-detail/:id" element={<PropertyDetailPage />} />
          <Route path="/property-list" element={<PropertyListings />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element ={<Signup/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
