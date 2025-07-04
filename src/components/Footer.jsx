import React from "react";

const Footer = ({ selectedProperty, selectedRole, step, onNext, onBack }) => {

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
                  selectedProperty && selectedRole
                  ? "bg-[#316EED] hover:bg-blue-700"
                  : "bg-[#316EED] opacity-[32%] cursor-not-allowed"
              }`}
              disabled={!selectedProperty || !selectedRole}
              onClick={onNext}
              >
                Get started
            </button>
        </div>
    </div>
  )
}

export default Footer
