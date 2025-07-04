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



const Company = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const countries = getNames();
    
    const [selectedDial, setSelectedDial] = useState('+880');
    const [phone, setPhone] = useState('+880 ');
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
  
    return (
      <div className="w-full px-[80px] pb-[24px] ">
        {/* Realtor verification */}
        <div className="mb-6 rounded-[14px] border border-[#E0E0E0] ">
            <div className="border-b border-b-[#E0E0E0]">
            <h2 className="text-[18px] font-[500] py-[14px] px-[16px] rounded-t-[14px] bg-[#F4F4F4] text-[#6F6C6A]">
                Company & office info
            </h2></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-[16px] py-[14px]">

                {/* Company Name */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Company name*</p>
                    <input
                    type="text"
                    placeholder="Enter company name"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35]  placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* EIN/TIN */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Company Identifier (EIN/TIN)*</p>
                    <input
                    type="text"
                    placeholder="Enter identifier"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* Job Title */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Your job title*</p>
                    <input
                    type="text"
                    placeholder="Enter your job title"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* Agreement Upload */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Agreement with landlord/owner*</p>
                    <label
                    htmlFor="additionalDoc"
                    className="uploadPDF bg-[#F4F4F4] cursor-pointer w-full border-[1px] border-dashed border-[#E0E0E0] h-[48px] flex items-center justify-center gap-2 text-center rounded-[12px] transition-colors"
                    >
                    <img src={upload} alt="Upload PDF" className="w-[24px] h-[24px]" />
                    <p className="text-[14px] text-[#6F6C6A] font-[600]">(Pdf only)</p>
                    {pdfFile && (
                        <p className="text-[14px] font-semibold text-green-600">Uploaded: {pdfFile.name}</p>
                    )}
                    <input
                        id="additionalDoc"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    </label>
                </div>

                {/* Country Dropdown */}
                <div className="">
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Country/Region*</p>
                    <div className="relative w-full">
                        <select
                            className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] text-[16px] font-[500] "
                        >
                            <option value="">Choose country</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>   
                    </div>

                </div>


                {/* Street Address */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Street address*</p>
                    <input
                    type="text"
                    placeholder="Enter street address"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* Apt, Suite */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Apt, suite, unit (if applicable)</p>
                    <input
                    type="number"
                    placeholder="Enter unit details"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* Phone Number with Country Code */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Phone number*</p>
                    <div className="flex relative">
                        {/* Custom Flag Dropdown */}
                        <div className="relative w-[60px]">
                            <button
                                type="button"
                                onClick={toggleDropdown}
                                className="w-full h-[48px] border border-[#E0E0E0] bg-white rounded-l-[12px] flex items-center justify-center relative pl-1 pr-6"
                            >
                                <img
                                src={`https://flagsapi.com/${countryList[selectedDial]}/flat/64.png`}
                                alt="flag"
                                className="w-[24px] h-[20px] object-cover rounded-sm"
                                />

                                {/* Custom SVG Arrow */}
                                <div className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2">
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
                            </button>

                            {dropdownOpen && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border border-[#E0E0E0] rounded shadow max-h-[180px] overflow-y-auto">
                                {Object.entries(countryList).map(([dial, iso]) => (
                                    <li
                                    key={dial}
                                    onClick={() => handleSelect(dial)}
                                    className="cursor-pointer p-2 flex justify-center"
                                    >
                                    <img
                                        src={`https://flagsapi.com/${iso}/flat/64.png`}
                                        alt={dial}
                                        className="w-6 h-4 object-cover rounded-sm"
                                    />
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>


                        {/* Phone Input */}
                        <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-[calc(100%-48px)] h-[48px] px-4 rounded-r-[12px] border-t border-r border-b border-[#E0E0E0] bg-white placeholder:text-[#6F6C6A] text-[16px]"
                        placeholder="Phone number"
                        />
                    </div>
                </div>


                {/* Contact Email */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Contact email*</p>
                    <input
                    type="email"
                    placeholder="Enter contact email"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* City/Town */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">City/Town*</p>
                    <input
                    type="text"
                    placeholder="Enter city or town"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

                {/* State/Territory Dropdown */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">State/Territory*</p>
                    <div className="relative w-full">
                        <select
                            className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] text-[16px] font-[500]"
                        >
                            <option value="">Choose state</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dhaka">Dhaka</option>
                        </select>
                    </div>
                </div>

                {/* Zip Code */}
                <div>
                    <p className="text-[16px] font-[600] mb-2 text-[#272B35]">Zip code*</p>
                    <input
                    type="number"
                    placeholder="Enter zip code"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#272B35] placeholder:text-[#6F6C6A] text-[16px] font-[500]"
                    />
                </div>

            </div>
        </div>

  
        {/* Terms & Conditions */}
        <TermsConditions/>
        
      </div>
    );
};

export default Company;
