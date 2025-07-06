import React, { useState } from "react";
import infoIcon from "../assets/images/informationCircle.png";

export default function Charges({ onClose, onSave }) {
  const [formValues, setFormValues] = useState({
    appFee: '',
    adminFee: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // live error remove while typing
    setFormErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formValues.appFee) {
      errors.appFee = "Application fee is required";
    }
    if (!formValues.adminFee) {
      errors.adminFee = "Admin fee is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSave(formValues);
  };

  return (
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      {/* Application fee(one-time) */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Application fee(one-time)*
        </label>
        <div className="relative w-full">
          <input
            value={formValues.appFee}
            onChange={handleChange('appFee')}
            className={`w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border ${formErrors.appFee ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white font-[600] text-[16px] text-[#6F6C6A]`}
            placeholder="Enter Application fee"
          />
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none flex flex-wrap gap-[10px] items-center absolute right-[10px] top-1/2 -translate-y-1/2">
            <p className="font-[600] text-[16px] text-[#6f6c6a8e]">All 18+ applicant</p>
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
        {formErrors.appFee && (
          <p className="text-red-500 text-sm mt-1">{formErrors.appFee}</p>
        )}
      </div>

      {/* Admin fee(one-time) */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Admin fee(one-time)*
        </label>
        <input 
          type="number" 
          value={formValues.adminFee}
          onChange={handleChange('adminFee')}
          className={`border ${formErrors.adminFee ? 'border-red-500' : 'border-[#E0E0E0]'} h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2`} 
          placeholder="Enter admin fee" 
        />
        {formErrors.adminFee && (
          <p className="text-red-500 text-sm mt-1">{formErrors.adminFee}</p>
        )}
      </div>

      {/* Add button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex flex-wrap justify-between pb-[16px] ">
        <div className="flex gap-[8px] justify-center items-center">
          <img src={infoIcon} alt="" className="w-[20px] h-[20px]" />
          <p className="text-[16px] font-[600] text-[#272B35]">Type 0 if charges not applicable</p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] hover:bg-blue-700 text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700]"
        >
          Add
        </button>
      </div>
    </form>
  );
}
