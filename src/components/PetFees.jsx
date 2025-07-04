import React, { useState } from "react";



export default function PetFees({ onClose, onSave }) {

  const [formValues, setFormValues] = useState({
    petType: "",
    maxWt: "",
    petFee: "",
    petSecurity: "",
    petRent: "",
  });

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formValues); 
  };


  return (
    <form className="grid grid-cols-2 gap-[16px] ">
      {/* Pet type* */}
      <div className="flex flex-col sm:col-span-1 col-span-2 ">
        <label className="text-[16px] font-[600] mb-1">
          Pet type<span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
            <select
              value={formValues.petType}
              onChange={handleChange('petType')}
              className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border appearance-none border-[#E0E0E0] bg-white font-[600] text-[16px] text-[#6f6c6a8e]"
          >
              <option value="">Select pet type</option>
              <option value="Dog">Dog</option>
              <option value="Dog">Dog</option>
              <option value="Dog">Dog</option>
              <option value="Dog">Dog</option>
              <option value="Dog">Dog</option>
              <option value="Dog">Dog</option>
            </select>

            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg
                className="w-4 h-4 text-[#6F6C6A]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>    
        </div>
      </div>

      {/* Max weight(LB) */}
      <div className="flex flex-col sm:col-span-1 col-span-2 ">
          <label className="text-[16px] font-[600] mb-1">
            Max weight(LB)<span className="text-red-500">*</span>
          </label>
          <input 
          type="number"
          value={formValues.maxWt}
          onChange={handleChange('maxWt')} 
          className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Enter Max weight(LB)" />
      </div>

      <div className="grid sm:grid-cols-3 gap-[16px] col-span-2 ">
        {/* One time pet fee */}
        <div className="flex flex-col w-[100%] ">
            <label className="text-[16px] font-[600] mb-1">
            One time pet fee<span className="text-red-500">*</span>
            </label>
            <input 
            type="number" 
            value={formValues.petFee}
            onChange={handleChange('petFee')} 
            className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Enter pet fee" />
        </div>
        {/* Pet Security Deposit */}
        <div className="flex flex-col w-[100%] ">
            <label className="text-[16px] font-[600] mb-1">
            Pet Security Deposit<span className="text-red-500">*</span>
            </label>
            <input 
            type="number"
            value={formValues.petSecurity}
            onChange={handleChange('petSecurity')}  
            className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Enter security deposit" />
        </div>
        {/* Monthly pet rent */}
        <div className="flex flex-col w-[100%] ">
            <label className="text-[16px] font-[600] mb-1">
            Monthly pet rent<span className="text-red-500">*</span>
            </label>
            <input 
            type="number"
            value={formValues.petRent}
            onChange={handleChange('petRent')}  
            className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Enter pet rent" />
        </div>

      </div>


      {/* Add button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px] ">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700] "
        >
          Add
        </button>
      </div>
    </form>
  );
}
