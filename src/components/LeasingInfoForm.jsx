import React, { useState } from "react";
import { getNames } from 'country-list';

const countryList = {
  '+880': 'BD',
  '+1': 'US',
  '+91': 'IN',
  '+44': 'GB',
  '+81': 'JP',
  '+61': 'AU',
};

export default function LeasingInfoForm({ onSave }) {
  const countries = getNames();
  const [sameAsProperty, setSameAsProperty] = useState(false);
  const [selectedDial, setSelectedDial] = useState('+880');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    managerName: '',
    phone: '+880 ',
    email: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSelect = (dial) => {
    setSelectedDial(dial);
    setFormValues((prev) => ({ ...prev, phone: dial + ' ' }));
    setDropdownOpen(false);
  };

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(selectedDial)) {
      setFormValues((prev) => ({ ...prev, phone: selectedDial + ' ' }));
    } else {
      setFormValues((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleSubmit = () => {
    const errors = {};

    if (!formValues.managerName) errors.managerName = "Manager name is required";
    if (!formValues.phone || formValues.phone.trim().length <= selectedDial.length)
      errors.phone = "Phone number is required";
    if (!formValues.email) errors.email = "Email is required";

    if (!sameAsProperty) {
      if (!formValues.street) errors.street = "Street address is required";
      if (!formValues.city) errors.city = "City/Town is required";
      if (!formValues.zip) errors.zip = "Zip code is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    onSave(formValues);
  };

  return (
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      {/* Manager Name */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager name<span className="text-red-500">*</span>
        </label>
        <input
          value={formValues.managerName}
          onChange={handleChange('managerName')}
          className={`border h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2 ${formErrors.managerName ? 'border-red-500' : 'border-[#E0E0E0]'}`}
          placeholder="Enter manager name"
        />
        {formErrors.managerName && <p className="text-red-500 text-sm mt-1">{formErrors.managerName}</p>}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager Phone number<span className="text-red-500">*</span>
        </label>
        <div className="flex relative">
          <div className="relative w-[60px]">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full h-[48px] border border-[#E0E0E0] bg-white rounded-l-[12px] flex items-center justify-center focus:outline-none relative pl-1 pr-6"
            >
              <img
                src={`https://flagsapi.com/${countryList[selectedDial]}/flat/64.png`}
                alt="flag"
                className="w-[24px] h-[20px] object-cover rounded-sm"
              />
              <div className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-[#6F6C6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-[#E0E0E0] rounded shadow max-h-[180px] overflow-y-auto">
                {Object.entries(countryList).map(([dial, iso]) => (
                  <li key={dial} onClick={() => handleSelect(dial)} className="cursor-pointer p-2 hover:bg-gray-100 flex justify-center">
                    <img src={`https://flagsapi.com/${iso}/flat/64.png`} alt={dial} className="w-6 h-4 object-cover rounded-sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="tel"
            value={formValues.phone}
            onChange={handlePhoneChange}
            className={`w-[calc(100%-48px)] h-[48px] px-4 rounded-r-[12px] border-t border-r border-b ${formErrors.phone ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white text-[16px]`}
            placeholder="Phone number"
          />
        </div>
        {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager email<span className="text-red-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-[8px] ">
          <input
            type="email"
            value={formValues.email}
            onChange={handleChange('email')}
            className={`border font-[600] text-[16px] text-[#6F6C6A] h-[48px] rounded-[12px] px-3 py-2 ${formErrors.email ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            placeholder="Enter email"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsAddress"
              checked={sameAsProperty}
              onChange={(e) => setSameAsProperty(e.target.checked)}
            />
            <label htmlFor="sameAsAddress" className="text-sm">
              Address (same as property)
            </label>
          </div>
        </div>
        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
      </div>

      {/* Address Fields */}
      {!sameAsProperty && (
        <>
          <div className="grid sm:grid-cols-3 gap-[14px] col-span-2">
            {/* Street */}
            <div className="flex flex-col">
              <label className="text-[16px] font-[600] mb-1">
                Street address<span className="text-red-500">*</span>
              </label>
              <input
                value={formValues.street}
                onChange={handleChange('street')}
                className={`border h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2 ${formErrors.street ? 'border-red-500' : 'border-[#E0E0E0]'}`}
                placeholder="Enter street address"
              />
              {formErrors.street && <p className="text-red-500 text-sm mt-1">{formErrors.street}</p>}
            </div>

            {/* Apt */}
            <div className="flex flex-col">
              <label className="text-[16px] font-[600] mb-1">Apt, suit, unit</label>
              <input
                type="number"
                value={formValues.apt}
                onChange={handleChange('apt')}
                className="border font-[600] text-[16px] text-[#6F6C6A] border-[#E0E0E0] h-[48px] rounded-[12px] px-3 py-2"
                placeholder="Enter Apt/suit/unit"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-[16px] font-[600] mb-1">
                City/Town<span className="text-red-500">*</span>
              </label>
              <input
                value={formValues.city}
                onChange={handleChange('city')}
                className={`border font-[600] text-[16px] text-[#6F6C6A] h-[48px] rounded-[12px] px-3 py-2 ${formErrors.city ? 'border-red-500' : 'border-[#E0E0E0]'}`}
                placeholder="Enter city/town"
              />
              {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col sm:col-span-1 col-span-2">
            <label className="text-[16px] font-[600] mb-1">State/Territory</label>
            <select
              value={formValues.state}
              onChange={handleChange('state')}
              className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white font-[600] text-[16px] text-[#6f6c6a8e]"
            >
              <option value="">Choose state</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

          {/* Zip */}
          <div className="flex flex-col sm:col-span-1 col-span-2">
            <label className="text-[16px] font-[600] mb-1">
              Zip code<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formValues.zip}
              onChange={handleChange('zip')}
              className={`border font-[600] text-[16px] text-[#6F6C6A] h-[48px] rounded-[12px] px-3 py-2 ${formErrors.zip ? 'border-red-500' : 'border-[#E0E0E0]'}`}
              placeholder="Enter zip code"
            />
            {formErrors.zip && <p className="text-red-500 text-sm mt-1">{formErrors.zip}</p>}
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px]">
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
