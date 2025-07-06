import React from "react";

const Footer = ({ 
  selectedProperty, 
  selectedRole, 

  pdfFile, 
  termsAccepted, 

  realtorLicense,
  realtorPdf1,
  realtorPdf2,
  realtorTermsAccepted,

  isCompanyValid,
  companyTermsAccepted,

  onNext, 
  onBack 
}) => {

  // const isButtonEnabled = selectedProperty === "condo" && selectedRole && pdfFile && termsAccepted;

  let isButtonEnabled = false;

  // Require both landlord and realtor to be filled
  const isLandlordValid = pdfFile && termsAccepted;
  const isRealtorValid =
    realtorLicense &&
    realtorPdf1 &&
    realtorPdf2 &&
    realtorTermsAccepted;
  const isCompanyComplete = isCompanyValid && companyTermsAccepted;
  
  if (selectedProperty === "condo") {
    isButtonEnabled = isLandlordValid && isRealtorValid && isCompanyComplete;
  }



  return (
    <div className="py-[24px] px-[80px] inset-shadow-sm">
        {/* Footer Controls */}
        <div className="flex justify-between items-center">
            <button 
              className="text-[#272B35] font-[600] text-[16px] cursor-pointer underline"
              onClick={onBack}
            >
              Back
            </button>
            <button
              className={`w-[128px] h-[47px] rounded-[12px] cursor-pointer text-white text-[16px] font-[600] ${
                  isButtonEnabled
                  ? "bg-[#316EED] hover:bg-blue-700"
                  : "bg-[#316EED] opacity-[32%] cursor-not-allowed"
              }`}
              disabled={!isButtonEnabled}
              onClick={onNext}
              >
                Get started
            </button>
        </div>
    </div>
  )
}

export default Footer
