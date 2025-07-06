import React, { useState } from "react";
import upload from "../assets/images/uploadPDF.png";
import TermsConditions from "./TermsConditions";


const Landlord = ({ pdfFile, setPdfFile, termsAccepted, setTermsAccepted }) => {
  // const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
      setPdfFile(null);
    }
  };


  return (

    <div className="w-full px-[80px] pb-[24px] ">
      {/* Proof of Ownership */}
      <div className="mb-6 rounded-[14px] border border-[#E0E0E0] ">
        <div className="border-b border-b-[#E0E0E0]">
        <h2 className="text-[18px] font-[500] py-[14px] px-[16px] rounded-t-[14px] bg-[#F4F4F4] text-[#6F6C6A]">
          Proof of ownership
        </h2>
        </div>
        <div className="py-[14px] px-[16px]">
          <p className="text-[16px] font-[600] mb-2 text-[#272B35] ">Ownership doc*</p>

          <label
            htmlFor="pdfUpload"
            className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full max-w-md border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors"
          >
            <img src={upload} alt="Upload PDF" className="w-[24px] h-[24px]" />
            <p className="text-[14px] text-[#6F6C6A] font-[600] ">(Pdf only)</p>
            {pdfFile && (
              <p className="text-[14px] font-semibold text-green-600">
                Uploaded: {pdfFile.name}
              </p>
            )}
            <input
              id="pdfUpload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Terms & Conditions */}
      <TermsConditions isChecked={termsAccepted} setIsChecked={setTermsAccepted} />


      
    </div>
    
  );
};

export default Landlord;
