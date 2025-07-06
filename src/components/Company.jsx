import React, { useState, useEffect } from 'react';
import upload from "../assets/images/uploadPDF.png";
import { getNames } from 'country-list';
import TermsConditions from './TermsConditions';

const countryList = {
  '+880': 'BD',
  '+1': 'US',
  '+91': 'IN',
  '+44': 'GB',
  '+81': 'JP',
  '+61': 'AU',
};

const Company = ({ onValidationChange, acceptedTerms, setAcceptedTerms }) => {
  const [companyName, setCompanyName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [phone, setPhone] = useState('+880 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [selectedDial, setSelectedDial] = useState('+880');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSelect = (dial) => {
    setSelectedDial(dial);
    setPhone(dial + ' ');
    setDropdownOpen(false);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(selectedDial)) {
      setPhone(selectedDial + ' ');
    } else {
      setPhone(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  // 🔍 Notify parent about validation state
  useEffect(() => {
    const isValid =
      companyName &&
      identifier &&
      jobTitle &&
      pdfFile &&
      country &&
      street &&
      phone.trim().length > selectedDial.length + 1 &&
      email &&
      city &&
      state &&
      zip &&
      acceptedTerms;

    onValidationChange?.(isValid);
  }, [
    companyName, identifier, jobTitle, pdfFile, country, street, phone,
    email, city, state, zip, acceptedTerms, selectedDial, onValidationChange
  ]);

  return (
    <div className="w-full px-[80px] pb-[24px]">
      <div className="mb-6 rounded-[14px] border border-[#E0E0E0]">
        <div className="border-b border-b-[#E0E0E0]">
          <h2 className="text-[18px] font-[500] py-[14px] px-[16px] rounded-t-[14px] bg-[#F4F4F4] text-[#6F6C6A]">
            Company & office info
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-[16px] py-[14px]">
          <Input label="Company name*" value={companyName} onChange={setCompanyName} placeholder="Enter company name" />
          <Input label="Company Identifier (EIN/TIN)*" value={identifier} onChange={setIdentifier} placeholder="Enter identifier" />
          <Input label="Your job title*" value={jobTitle} onChange={setJobTitle} placeholder="Enter your job title" />

          {/* PDF Upload */}
          <div>
            <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Agreement with landlord/owner*</p>
            <label htmlFor="additionalDoc" className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors">
              <img src={upload} alt="Upload PDF" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-[#6F6C6A] font-[600]">(Pdf only)</p>
              {pdfFile && (
                <p className="text-[14px] font-semibold text-green-600">Uploaded: {pdfFile.name}</p>
              )}
              <input id="additionalDoc" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* Country */}
          <div>
            <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Country/Region*</p>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] text-[16px] font-[500]"
            >
              <option value="">Choose country</option>
              {getNames().map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>

          <Input label="Street address*" value={street} onChange={setStreet} placeholder="Enter street address" />
          <Input label="Apt, suite, unit (if applicable)" value={apt} onChange={setApt} placeholder="Enter unit details" type="number" />

          {/* Phone Number */}
          <div>
            <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Phone number*</p>
            <div className="flex relative">
              <div className="relative w-[60px]">
                <button type="button" onClick={toggleDropdown} className="w-full h-[48px] border border-[#E0E0E0] bg-white rounded-l-[12px] flex items-center justify-center relative pl-1 pr-6">
                  <img src={`https://flagsapi.com/${countryList[selectedDial]}/flat/64.png`} alt="flag" className="w-[24px] h-[20px] object-cover rounded-sm" />
                  <div className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-[#6F6C6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {dropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-[#E0E0E0] rounded shadow max-h-[180px] overflow-y-auto">
                    {Object.entries(countryList).map(([dial, iso]) => (
                      <li key={dial} onClick={() => handleSelect(dial)} className="cursor-pointer p-2 flex justify-center">
                        <img src={`https://flagsapi.com/${iso}/flat/64.png`} alt={dial} className="w-6 h-4 object-cover rounded-sm" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input type="tel" value={phone} onChange={handlePhoneChange} className="w-[calc(100%-48px)] h-[48px] px-4 rounded-r-[12px] border border-[#E0E0E0] bg-white placeholder:text-[#6F6C6A] text-[16px]" placeholder="Phone number" />
            </div>
          </div>

          <Input label="Contact email*" value={email} onChange={setEmail} placeholder="Enter contact email" type="email" />
          <Input label="City/Town*" value={city} onChange={setCity} placeholder="Enter city or town" />
          <div>
            <p className="text-[16px] font-[600] mb-2 text-[#272B35]">State/Territory*</p>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] text-[16px] font-[500]"
            >
              <option value="">Choose state</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Khulna">Khulna</option>
            </select>
          </div>
          <Input label="Zip code*" value={zip} onChange={setZip} placeholder="Enter zip code" type="number" />
        </div>
      </div>

      {/* Terms & Conditions */}
      <TermsConditions isChecked={acceptedTerms} setIsChecked={setAcceptedTerms} />
    </div>
  );
};

// ✅ Reusable Input Component
const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">{label}</p>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
    />
  </div>
);

export default Company;
