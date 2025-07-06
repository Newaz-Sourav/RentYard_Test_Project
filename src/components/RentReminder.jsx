import React, { useState } from "react";
import calendar from "../assets/images/calendar.png";

export default function RentReminder({ onSave }) {
  const [formValues, setFormValues] = useState({
    rentP: '',
    rentR: '',
    rentD: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // remove error when user types
    setFormErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = () => {
    const errors = {};

    if (!formValues.rentP.trim()) errors.rentP = "Rent payment frequency is required";
    if (!formValues.rentR.trim()) errors.rentR = "Rent reminder date is required";
    if (!formValues.rentD.trim()) errors.rentD = "Rent due date is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSave(formValues);
  };

  return (
    <form className="grid grid-cols-3 gap-[16px]">
      {/* Rent payment frequency */}
      <div className="flex flex-col sm:col-span-1 col-span-3">
        <label className="text-[16px] font-[600] mb-1">
          Rent payment frequency<span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            value={formValues.rentP}
            onChange={handleChange('rentP')}
            placeholder="Monthly"
            className={`w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border ${formErrors.rentP ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white font-[600] text-[16px] text-[#6F6C6A]`}
          />
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
        {formErrors.rentP && <p className="text-red-500 text-sm mt-1">{formErrors.rentP}</p>}
      </div>

      {/* Rent Reminder/Statement date */}
      <div className="flex flex-col sm:col-span-1 col-span-3">
        <label className="text-[16px] font-[600] mb-1">
          Rent Reminder/Statement date<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={formValues.rentR}
            onChange={handleChange('rentR')}
            className={`w-full border ${formErrors.rentR ? 'border-red-500' : 'border-[#E0E0E0]'} h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2 pr-12`}
            placeholder="25th Every month"
          />
          <img
            src={calendar}
            alt="calendar"
            className="w-[24px] h-[24px] absolute right-4 top-1/2 transform -translate-y-1/2"
          />
        </div>
        {formErrors.rentR && <p className="text-red-500 text-sm mt-1">{formErrors.rentR}</p>}
      </div>

      {/* Rent due date */}
      <div className="flex flex-col sm:col-span-1 col-span-3">
        <label className="text-[16px] font-[600] mb-1">
          Rent due date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={formValues.rentD}
            onChange={handleChange('rentD')}
            className={`w-full border ${formErrors.rentD ? 'border-red-500' : 'border-[#E0E0E0]'} h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2 pr-12`}
            placeholder="5th Every month"
          />
          <img
            src={calendar}
            alt="calendar"
            className="w-[24px] h-[24px] absolute right-4 top-1/2 transform -translate-y-1/2"
          />
        </div>
        {formErrors.rentD && <p className="text-red-500 text-sm mt-1">{formErrors.rentD}</p>}
      </div>

      {/* Add button */}
      <div className="col-span-3 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px]">
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
