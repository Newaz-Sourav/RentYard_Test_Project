import React, { useState, useRef } from "react";
import './App.css';
import Footer from './components/Footer';
import PropertySelection from './components/PropertySelection';
import Navbar from "./components/Navbar";
import CondoInfoForm from "./components/CondoInfoForm";
import FooterNext from "./components/FooterNext";
import SubscriptionPage from "./components/SubscriptionPage";

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [step, setStep] = useState(0);

  const condoFormRef = useRef();

  const [pdfFile, setPdfFile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [realtorLicense, setRealtorLicense] = useState("");
  const [realtorPdf1, setRealtorPdf1] = useState(null);
  const [realtorPdf2, setRealtorPdf2] = useState(null);
  const [realtorTermsAccepted, setRealtorTermsAccepted] = useState(false);

  const [isCompanyValid, setIsCompanyValid] = useState(false);
  const [companyTermsAccepted, setcompanyTermsAccepted] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      const isValid = condoFormRef.current?.isValid();
      if (!isValid) {
        alert("Please complete all required fields before proceeding.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 2));
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onGetStarted={step > 0} />

      {step === 0 && (
        <PropertySelection
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}

          pdfFile={pdfFile}
          setPdfFile={setPdfFile}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}

          realtorLicense={realtorLicense}
          setRealtorLicense={setRealtorLicense}
          realtorPdf1={realtorPdf1}
          setRealtorPdf1={setRealtorPdf1}
          realtorPdf2={realtorPdf2}
          setRealtorPdf2={setRealtorPdf2}
          realtorTermsAccepted={realtorTermsAccepted}
          setRealtorTermsAccepted={setRealtorTermsAccepted}

          companyValid={isCompanyValid}
          setIsCompanyValid={setIsCompanyValid}
          companyTermsAccepted={companyTermsAccepted}
          setcompanyTermsAccepted={setcompanyTermsAccepted}
        />
      )}
      {step === 1 && <CondoInfoForm ref={condoFormRef} />}
      {step === 2 && <SubscriptionPage />}

      {step === 0 ? (
        <Footer
          selectedProperty={selectedProperty}
          selectedRole={selectedRole}

          pdfFile={pdfFile}
          termsAccepted={termsAccepted}

          realtorLicense={realtorLicense}
          realtorPdf1={realtorPdf1}
          realtorPdf2={realtorPdf2}
          realtorTermsAccepted={realtorTermsAccepted}

          isCompanyValid={isCompanyValid}
          companyTermsAccepted={companyTermsAccepted}

          onNext={handleNext}
          onBack={handleBack}
        />
      ) : (
        <FooterNext
          step={step}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
