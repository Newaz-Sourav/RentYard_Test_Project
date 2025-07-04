import React, { useState } from "react";
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

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
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
        />
      )}
      {step === 1 && <CondoInfoForm />}
      {step === 2 && <SubscriptionPage />}

      {step === 0 ? (
        <Footer
          selectedProperty={selectedProperty}
          selectedRole={selectedRole}
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
