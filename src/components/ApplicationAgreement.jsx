import React, { useState } from "react";
import upload from "../assets/images/uploadPDF.png";
import TermsConditions from "./TermsConditions";



export default function ApplicationAgreement({ onClose, onSave }) {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = () => {
    onSave({
      fileName: pdfFile?.name || "",
    });
  };



  return (
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      {/* Upload agreement */}
      <div className="flex flex-col col-span-2 ">
        <p className="text-[16px] font-[600] mb-2 text-[#272B35] ">Upload agreement</p>

        <label
          htmlFor="pdfUpload"
          className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors"
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

      {/* Terms & Conditions */}
      <div className="mt-[-14px] col-span-2">
        <TermsConditions/>
      </div>


      {/* Add button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px] ">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] hover:bg-blue-700 text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700] "
        >
          Add
        </button>
      </div>
    </form>
  );
}
