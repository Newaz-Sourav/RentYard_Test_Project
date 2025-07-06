import React from "react";

const FooterNext = ({ step, onNext, onBack }) => {
  return (
    <div className="mt-8">
      {console.log("step: ", step)}
      {/* Progress bar */}
      <div className="w-full h-[6px] rounded-full overflow-hidden">
        {step === 1 ? (
          <div className="flex w-full h-full gap-[5px]">
            <div className="bg-black w-1/2 h-[3px] rounded-l-full" />
            <div className="bg-gray-200 w-1/2 h-[3px] rounded-r-full" />
          </div>
        ) : (
          <div className="flex w-full h-full gap-[5px]">
            <div className="bg-black w-1/2 h-[3px] rounded-l-full" />
            <div className="bg-black w-1/2 h-[3px] rounded-r-full" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-[5px] justify-between py-[24px] px-[80px]">
        <button
          className="text-[#272B35] font-[600] text-[16px] cursor-pointer underline"
          onClick={onBack}
        >
          Back
        </button>

        <div className="flex items-center gap-[16px] ">
          { step === 2 && (
            <p className="text-[#6F6C6A] text-[18px] font-[500] ">Total with card charge: <span className="text-[20px] font-[700] text-[#272B35] " >$970</span> </p>
          )}
          <button
            type="button"
            className="bg-[#316EED] min-w-[128px] cursor-pointer min-h-[47px] text-[16px] font-[600] text-white px-[24px] py-[12px] rounded-[12px] hover:bg-blue-700 transition"
            onClick={onNext}
          >
            {step === 1 ? "Next" : "Pay & add property" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterNext;
