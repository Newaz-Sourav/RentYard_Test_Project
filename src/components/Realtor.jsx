import React, { useState } from "react";
import upload from "../assets/images/uploadPDF.png";
import TermsConditions from "./TermsConditions";


const Realtor = ({
  license,
  setLicense,
  pdfFile1,
  setPdfFile1,
  pdfFile2,
  setPdfFile2,
  termsAccepted,
  setTermsAccepted
}) => {
    // const [pdfFile1, setPdfFile1] = useState(null);
    // const [pdfFile2, setPdfFile2] = useState(null);
    // const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleLicenseChange = (e) => {
      setLicense(e.target.value);
    };
  
    const handleFileChange1 = (e) => {
      const file = e.target.files[0];
      if (file && file.type === "application/pdf") {
        setPdfFile1(file);
      } else {
        alert("Please upload a valid PDF file.");
      }
    };
    const handleFileChange2 = (e) => {
      const file = e.target.files[0];
      if (file && file.type === "application/pdf") {
        setPdfFile2(file);
      } else {
        alert("Please upload a valid PDF file.");
      }
    };
  
  
    return (
      <div className="w-full px-[80px] pb-[24px] ">
        {/* Realtor verification */}
        <div className="mb-6 rounded-[14px] border border-[#E0E0E0] ">
            <div className="border-b border-b-[#E0E0E0]">
            <h2 className="text-[18px] font-[500] py-[14px] px-[16px] rounded-t-[14px] bg-[#F4F4F4] text-[#6F6C6A]">
                Realtor verification
            </h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-[16px] py-[14px]">
            {/* License Number */}
                <div className="flex flex-col ">
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">License number*</p>
                    <input
                    type="number"
                    value={license}
                    onChange={handleLicenseChange}
                    placeholder="Enter your license number"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    style={{ appearance: 'textfield' }}
                    />
                </div>

                {/* Additional Documents */}
                <div className="flex flex-col ">
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Additional documents for realtor</p>
                    <label
                    htmlFor="additionalDoc"
                    className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors"
                    >
                    <img src={upload} alt="Upload PDF" className="w-[24px] h-[24px]" />
                    <p className="text-[14px] text-[#6F6C6A] font-[600] ">(Pdf only)</p>
                    {pdfFile1 && (
                        <p className="text-[14px] font-semibold text-green-600">Uploaded: {pdfFile1.name}</p>
                    )}
                    <input
                        id="additionalDoc"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange1}
                        className="hidden"
                    />
                    </label>
                </div>

                {/* Agreement Upload */}
                <div className="flex flex-col ">
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Agreement with landlord*</p>
                    <label
                    htmlFor="agreementDoc"
                    className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors"
                    >
                    <img src={upload} alt="Upload PDF" className="w-[24px] h-[24px]" />
                    <p className="text-[14px] text-[#6F6C6A] font-[600] ">(Pdf only)</p>
                    {pdfFile2 && (
                        <p className="text-[14px] font-semibold text-green-600">Uploaded: {pdfFile2.name}</p>
                    )}
                    <input
                        id="agreementDoc"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange2}
                        className="hidden"
                    />
                    </label>
                </div>
            </div>
        </div>

        {/* Terms & Conditions */}
        <TermsConditions isChecked={termsAccepted} setIsChecked={setTermsAccepted} />
        
      </div>
    );
};

export default Realtor;
