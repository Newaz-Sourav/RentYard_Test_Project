import React, { useState } from "react";



export default function Stations({ onSave }) {
  const [formValues, setFormValues] = useState({
    stType: "",
    dis: "",
    stName: "",
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
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      {/* Nearest station type* */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">Nearest station type<span className="text-red-500">*</span></label>
        <div className="relative w-full">
            <select
              value={formValues.stType}
              onChange={handleChange('stType')}
              className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white font-[600] text-[16px] text-[#6f6c6a9c] focus:outline-none"
            >
                <option value="">Select</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Airport">Airport</option>
                <option value="Bus">Bus</option>
                <option value="Bus">Bus</option>
            </select>
   
        </div>
      </div>

      {/* Distance from property */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Distance from property<span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            placeholder="Enter distance"
            value={formValues.dis}
            onChange={handleChange('dis')}
            className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white font-[600] text-[16px] text-[#6F6C6A]"
          />

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none flex flex-wrap gap-[10px] items-center absolute right-[10px] top-1/2 -translate-y-1/2">
              <p className="font-[600] text-[16px] text-[#6F6C6A]">Mile</p>
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

      {/* Nearest station name* */}
      <div className="flex flex-col w-[100%] col-span-2 ">
          <label className="text-[16px] font-[600] mb-1">
            Nearest station name<span className="text-red-500">*</span>
          </label>
          <input 
            value={formValues.stName}
            onChange={handleChange('stName')}
            className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Enter station name" />
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
