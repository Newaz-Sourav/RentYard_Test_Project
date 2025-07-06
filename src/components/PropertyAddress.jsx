import React, { useState, useRef } from "react";
import { getNames } from "country-list";

const countries = getNames();

export default function PropertyAddress({ onSave, onClose }) {
  const formRef = useRef(null);

  const [formValues, setFormValues] = useState({
    propertyName: "",
    unitCount: "",
    website: "",
    country: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      onSave(formValues); // send data to parent
      onClose(); // close modal
    } else {
      formRef.current.reportValidity(); // show browser validation errors
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-[16px]">
        <Input
          label="Property name as identifier"
          required
          placeholder="Enter apartment name"
          value={formValues.propertyName}
          onChange={handleChange("propertyName")}
        />
        <Input
          label="Total apartment unit"
          type="number"
          required
          placeholder="Enter apartment unit"
          value={formValues.unitCount}
          onChange={handleChange("unitCount")}
        />
        <Input
          label="Property website"
          type="url"
          placeholder="Enter Property website"
          value={formValues.website}
          onChange={handleChange("website")}
        />
        <Dropdown
          label="Country/Region"
          required
          options={countries}
          value={formValues.country}
          onChange={handleChange("country")}
        />
        <Input
          label="Street address"
          required
          placeholder="Enter street address"
          value={formValues.street}
          onChange={handleChange("street")}
        />
        <Input
          label="Apt, suit, unit"
          type="number"
          placeholder="Enter Apt/suit/unit"
          value={formValues.apt}
          onChange={handleChange("apt")}
        />
        <Input
          label="City/Town"
          required
          placeholder="Enter city/town"
          value={formValues.city}
          onChange={handleChange("city")}
        />
        <Dropdown
          label="State/Territory"
          required
          options={countries}
          value={formValues.state}
          onChange={handleChange("state")}
        />
        <Input
          label="Zip code"
          required
          placeholder="Enter zip code"
          value={formValues.zip}
          onChange={handleChange("zip")}
        />
      </div>

      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end mt-[16px] pb-[16px]">
        <button
          type="submit"
          className="mt-[16px] bg-[#316EED] hover:bg-blue-700 text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700]"
        >
          Add
        </button>
      </div>
    </form>
  );
}

// ✅ Input Component
function Input({ label, placeholder, required, type = "text", ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-[600] mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="border border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2"
        {...props}
      />
    </div>
  );
}

// ✅ Dropdown Component
function Dropdown({ label, options = [], required, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-[600] mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <select
          required={required}
          className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6f6c6a93] text-[16px] font-[500]"
          {...props}
        >
          <option value="">Select</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
