import React from "react";
import home09 from "../assets/images/home09.png";
import house01 from "../assets/images/house01.png";
import building06 from "../assets/images/building06.png";
import key2 from "../assets/images/key2.png";
import manager from "../assets/images/manager.png";
import permanentJob from "../assets/images/permanentJob.png";

import Landlord from './Landlord';
import Realtor from './Realtor';
import Company from './Company';

const PropertySelection = ({
  selectedProperty,
  setSelectedProperty,
  selectedRole,
  setSelectedRole,

  pdfFile,
  setPdfFile,
  termsAccepted,
  setTermsAccepted,

  realtorLicense,
  setRealtorLicense,
  realtorPdf1,
  setRealtorPdf1,
  realtorPdf2,
  setRealtorPdf2,
  realtorTermsAccepted,
  setRealtorTermsAccepted,

  companyValid,
  setIsCompanyValid,
  companyTermsAccepted,
  setcompanyTermsAccepted,
}) => {
  const propertyTypes = [
    {
      id: "single",
      title: "Single House Property",
      desc: "Single unit house for single family",
      image: home09,
    },
    {
      id: "apartment",
      title: "Apartments complex",
      desc: "Multiple unit house for families",
      image: house01,
    },
    {
      id: "condo",
      title: "Condominiums",
      desc: "Multiple unit house for families",
      image: building06,
    },
  ];

  const roles = [
    {
      id: "landlord",
      title: "Landlord",
      desc: "Owner of the property",
      image: key2,
    },
    {
      id: "realtor",
      title: "Realtor",
      desc: "Manage property on behalf on owner",
      image: manager,
    },
    {
      id: "company",
      title: "Property management company",
      desc: "For management company",
      image: permanentJob,
    },
  ];

  const renderRoleComponent = () => {
    switch (selectedRole) {
      case "landlord":
        return (
          <Landlord
            pdfFile={pdfFile}
            setPdfFile={setPdfFile}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
        );
      case "realtor":
        return (
          <Realtor
            license={realtorLicense}
            setLicense={setRealtorLicense}
            pdfFile1={realtorPdf1}
            setPdfFile1={setRealtorPdf1}
            pdfFile2={realtorPdf2}
            setPdfFile2={setRealtorPdf2}
            termsAccepted={realtorTermsAccepted}
            setTermsAccepted={setRealtorTermsAccepted}
          />
        );
      case "company":
        return (
          <Company
            onValidationChange={setIsCompanyValid}
            acceptedTerms={companyTermsAccepted}
            setAcceptedTerms={setcompanyTermsAccepted}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white flex flex-col items-center flex-grow">
      <div className="py-[16px] px-[80px] w-[100%]">
        {/* Property Type */}
        <div className="mb-8">
          <h2 className="text-[24px] font-[700] mb-5 text-[272B35]">Property type</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {propertyTypes.map((property) => (
              <div
                key={property.id}
                className={`border rounded-[12px] p-[20px] cursor-pointer ${
                  selectedProperty === property.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setSelectedProperty(property.id)}
              >
                <div className="flex gap-[16px]">
                  <div className="bg-[#F9FBFF] w-[56px] h-[56px] flex justify-center items-center rounded-[8px]">
                    <img className="w-[28px] h-[28px] object-cover" src={property.image} />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="font-[600] text-[16px] text-[#272B35] ">{property.title}</h3>
                    <p className="text-[14px] text-[#777980] font-[500]">{property.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Select Role */}
        <div className="mb-6">
          <h2 className="text-[24px] font-[700] mb-5 text-[272B35]">Select your role</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`border rounded-lg p-5 cursor-pointer ${
                  selectedRole === role.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex gap-[16px]">
                  <div className="bg-[#F9FBFF] w-[56px] h-[56px] flex justify-center items-center rounded-[8px]">
                    <img className="w-[28px] h-[28px] object-cover" src={role.image} />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="font-[600] text-[16px] text-[#272B35] ">{role.title}</h3>
                    <p className="text-[14px] text-[#777980] font-[500]">{role.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditionally render role-specific component */}
      {selectedProperty === "condo" && selectedRole && renderRoleComponent()}
    </div>
  );
};

export default PropertySelection;
