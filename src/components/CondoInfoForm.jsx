import React, { useImperativeHandle, forwardRef,useState } from "react";
import ModalWrapper from "./ModalWrapper";
import LeasingInfoForm from "./LeasingInfoForm";
import PropertyAddress from "./PropertyAddress";
import Parking from "./Parking";
import PetFees from "./PetFees";
import Charges from "./Charges";
import Education from "./Education";
import RentReminder from "./RentReminder";
import Stations from "./Stations";
import ApplicationAgreement from "./ApplicationAgreement";
import Landmark from "./Landmark";
import AboutProperty from "./AboutProperty";
import Utilities from "./Utilities";
import CommunityFeatures from "./CommunityFeatures";

import plus from "../assets/images/Vector.png";
import edit from "../assets/images/edit.png";
import edit2 from "../assets/images/edit2.png";
import upload from "../assets/images/upload.png";
import deleteIcon from "../assets/images/delete.png";
import cancel from "../assets/images/cancel.png";


// Icon imports for amenities
import thermometer from "../assets/images/thermometer.png";
import cable from "../assets/images/cable.png";
import fan from "../assets/images/fan.png";
import highC from "../assets/images/highC.png";
import privateB from "../assets/images/privateB.png";
import refrigerator from "../assets/images/refrigerator.png";
import tree01 from "../assets/images/tree01.png";
import hairDryer from "../assets/images/hairDryer.png";
import floorPlan from "../assets/images/floorPlan.png";
import fire from "../assets/images/fire.png";
import firstAid from "../assets/images/firstAid.png";
import fuelStation from "../assets/images/fuelStation.png";
import expander from "../assets/images/expander.png";
import carParking from "../assets/images/carParking.png";
import protectionMask from "../assets/images/protectionMask.png";

const amenitiesList = [
  "Air conditioning", "Cable ready", "Ceiling fan", "High ceilings",
  "Private balcony", "Refrigerator", "Wooded views", "W/D hookup",
  "Hardwood Floor (home)", "Fireplace (home)", "First aid kit",
  "Carbon monoxide alarm", "Expanded patios (home)",
  "Free parking on premises", "Fire extinguisher"
];

const icons = [
  thermometer, cable, fan, highC, privateB, refrigerator, tree01, hairDryer,
  floorPlan, fire, firstAid, fuelStation, expander, carParking, protectionMask
];

const formsMap = {
  propertyAddress: PropertyAddress,
  petFees: PetFees,
  leasingInfo: LeasingInfoForm,
  parking: Parking,
  charges: Charges,
  education: Education,
  rentReminder: RentReminder,
  stations: Stations,
  applicationAgreement: ApplicationAgreement,
  landmark: Landmark,
  aboutProperty: AboutProperty,
  utilities: Utilities,
  communityFeatures: CommunityFeatures,
};

const fields = [
  { id: "propertyAddress", label: "Property address", required: true, note: "Required" },
  { id: "petFees", label: "Pet fees", required: false, note: "Optional" },
  { id: "leasingInfo", label: "Leasing info", required: true, note: "Required" },
  { id: "parking", label: "Parking", required: false, note: "Optional" },
  { id: "charges", label: "Charges", required: true, note: "Required" },
  { id: "education", label: "Nearest educational institution", required: false, note: "Optional but recommended" },
  { id: "rentReminder", label: "Rent frequency & payment reminder", required: true, note: "Required" },
  { id: "stations", label: "Nearest stations", required: false, note: "Optional but recommended" },
  { id: "applicationAgreement", label: "Application agreement", required: false, note: "Optional" },
  { id: "landmark", label: "Nearest landmark", required: false, note: "Optional but recommended" },
  { id: "aboutProperty", label: "About the property", required: false, note: "Optional" },
  { id: "utilities", label: "Utilities provider", required: false, note: "Optional but recommended" },
  { id: "communityFeatures", label: "Community’s amenity/features", required: false, note: "Optional but recommended" },
];

const requiredFields = ["propertyAddress", "leasingInfo", "charges", "rentReminder"];

const CondoInfoForm = forwardRef((props,ref) =>{
  const [videosOpen, setVideosOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (fieldId) => setActiveModal(fieldId);
  const closeModal = () => setActiveModal(null);

  const [formData, setFormData] = useState({});

  const handleSave = (fieldId, data) => {
    setFormData((prev) => ({ ...prev, [fieldId]: data }));
    closeModal();
  };

  const handleDelete = (fieldId) => {
    setFormData((prev) => {
      const updated = { ...prev };
      delete updated[fieldId];
      return updated;
    });
  };

  const handleAmenityDelete = (itemToRemove) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const updatedList = updated.communityFeatures.selectedRaw.filter((i) => i !== itemToRemove);
      updated.communityFeatures.selectedRaw = updatedList;
      return updated;
    });
  };

   useImperativeHandle(ref, () => ({
    isValid: () => {
      return requiredFields.every((field) => !!formData[field]);
    },
  }));



  return (
    <div className="flex flex-col items-center flex-grow bg-white overflow-hidden">
      <div className="py-[16px] px-[80px] w-[100%]">
        <h2 className="text-[24px] font-[700] mb-6">Condominiums information</h2>

        {/* Two-columns for fields */}
        <div className="flex justify-center gap-[32px] gap-y-4 mb-8">
          <div className="flex flex-col gap-[24px] w-[100%]">
          {fields.map(({ id, label, required, note }) => {
            const FormComponent = formsMap[id];
            const isFilled = !!formData[id];
            if(id === "propertyAddress" || id == "leasingInfo" || id == "charges" || id == "rentReminder" || id == "applicationAgreement" || id == "aboutProperty" || id == "communityFeatures" ) 
            {
            return (
              <div
                key={id}
                className="flex flex-col flex-wrap justify-between items-start border border-[#E0E0E0] rounded-[20px] py-[20px]"
              >
                <div className="flex flex-wrap gap-[6px] w-[100%] justify-between px-[20px] " >
                  <div className="text-[18px] font-[600] text-[#272B35]">
                    <span>{label}</span>
                    <span
                      className={`ml-1 text-[18px] font-[600] ${
                        required ? "text-red-500" : "text-[#6F6C6A]"
                      }`}
                    >
                      ({note})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="text-[#316EED] text-[16px] font-[600] cursor-pointer"
                      onClick={() => openModal(id)}
                    >
                      { (id === "propertyAddress" || id === "leasingInfo" || id === "charges" || id === "rentReminder") && (
                        <div className="flex items-center gap-[6px]">
                        <img src={isFilled ? edit : plus } alt="" className="w-[22px] h-[22px]" />
                        <p className="underline text-[16px] ">{isFilled ? "Edit" : "Add"}</p>
                      </div>
                      )}

                      { (id === "applicationAgreement" || id === "aboutProperty") && (
                        <div className="flex items-center gap-[6px]">
                        {!isFilled && (
                          <img src={ plus } alt="" className="w-[22px] h-[22px]" />
                        )}
                        <p className="underline text-[16px] ">{isFilled ? "" : "Add"}</p>
                      </div>
                      )}

                      { (id === "petFees" || id === "parking" || id === "education" || id === "stations" || id === "landmark" || id === "utilities" || id === "communityFeatures") && (
                        <div className="flex items-center gap-[6px]">
                        <img src={ plus } alt="" className="w-[22px] h-[22px]" />
                        <p className="underline text-[16px] ">{ "Add" }</p>
                      </div>
                      )}

                    </button>

                    <ModalWrapper isOpen={activeModal === id} onClose={closeModal} title={label}>
                      <FormComponent
                        onClose={closeModal}
                        onSave={(data) => handleSave(id, data)}
                      />
                    </ModalWrapper>
                  </div>

                </div>

                {/* Property Address */}
                {isFilled && id === "propertyAddress" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].propertyName},{" "}
                        {formData[id].website},{" "}
                        {"Total unit: "}{formData[id].unitCount}
                      </p>
                      <p>
                        {formData[id].street},{" "}
                        {formData[id].country}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Leasing Info */}
                {isFilled && id === "leasingInfo" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Leasing manager: "}{formData[id].managerName},{" "}
                        {formData[id].email}
                      </p>
                      <p>
                        {formData[id].phone}{" "}
                        <span className="text-[16px] font-[500] text-[#6F6C6A] ">Address(same as property)</span>
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Charges */}
                {isFilled && id === "charges" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col ">
                      <p className="">
                        {"Application fee: $"}{formData[id].appFee}{"(All 18+ applicant), "}
                        {"Admin fee: $"}{formData[id].adminFee}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Rent Reminder */}
                {isFilled && id === "rentReminder" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Rent payment frequency: "}{formData[id].rentP},{" "}
                        {"Rent reminder date: "}{formData[id].rentR}{"th every month"}
                      </p>
                      <p>
                        {"Rent due date: "}{formData[id].rentD}{"th every month"}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Application Agreement */}
                {isFilled && id === "applicationAgreement" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Agreement: "}{formData[id].fileName}
                      </p>
                      <p className="text-[#6F6C6A] font-[500] " >Accept RentYard property adding terms & condition</p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Community Features Preview */}
                {isFilled && id === "communityFeatures" && (
                  <div className="flex w-[100%] flex-wrap gap-[12px] border-t border-[#E0E0E0] px-[20px] pt-[20px] mt-[20px]">
                    {formData.communityFeatures?.selectedRaw.map((item) => {
                      const index = amenitiesList.indexOf(item);
                      const icon = icons[index];
                      return (
                        <div
                          key={item}
                          className="flex relative items-center gap-[10px] px-[12px] py-[8px] border-[2px] border-[#E0E0E0] rounded-[12px] font-[600] text-[16px] text-[#272B35]"
                        >
                          <div className="bg-[#F4F4F4] p-[6px] rounded-[8px]">
                            <img src={icon} alt={item} className="w-[20px] h-[20px]" />
                          </div>
                          {item}
                          <button
                            onClick={() => handleAmenityDelete(item)}
                            className="text-[20px] absolute -top-2 -right-2 rounded-[100px] p-[4px] bg-[#FF6A62] text-[#316EED] ml-2 font-[700] hover:text-red-500"
                          >
                            <img src={cancel} alt="" className="w-[12px] h-[12px] " />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* About Property */}
                {isFilled && id === "aboutProperty" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] px-[20px] pt-[20px]">
                    <div className="flex flex-col ">
                      <p className="">
                        {formData[id].msg}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pet Fees */}
                {isFilled && id === "petFees" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].petType},{" "}
                        {"Max weight: "}{formData[id].maxWt}{"lb"},{" "}
                        {"Monthly per rent: $"}{formData[id].petRent}
                      </p>
                      <p>
                        {"One time pet fee: $"}{formData[id].petFee},{" "}
                        {"Pet security deposit: $"}{formData[id].petSecurity},{" "}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Parking */}
                {isFilled && id === "parking" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Guest vehicle parking time: "}{formData[id].hr}
                      </p>
                      <p className="">
                        {formData[id].msgP}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Education */}
                {isFilled && id === "education" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].eduType},{" "}
                        {formData[id].eduName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stations */}
                {isFilled && id === "stations" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].stType},{" "}
                        {formData[id].stName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Landmark */}
                {isFilled && id === "landmark" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].lType},{" "}
                        {formData[id].lName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Utilities */}
                {isFilled && id === "utilities" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].uType},{" "}
                        {formData[id].uName}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}



              </div>
            );
          }
          })}
          </div>

          <div className="flex flex-col gap-[24px] w-[100%]">
          {fields.map(({ id, label, required, note }) => {
            const FormComponent = formsMap[id];
            const isFilled = !!formData[id];
            if(id == "petFees" || id == "parking" || id == "education" || id == "stations" || id == "landmark" || id == "utilities" )
            {
            return (
              <div
                key={id}
                className="flex flex-col flex-wrap justify-between items-start border border-[#E0E0E0] rounded-[20px] py-[20px]"
              >
                <div className="flex flex-wrap gap-[6px] w-[100%] justify-between px-[20px] " >
                  <div className="text-[18px] font-[600] text-[#272B35]">
                    <span>{label}</span>
                    <span
                      className={`ml-1 text-[18px] font-[600] ${
                        required ? "text-red-500" : "text-[#6F6C6A]"
                      }`}
                    >
                      ({note})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="text-[#316EED] hover:text-blue-800 text-[16px] font-[600] cursor-pointer"
                      onClick={() => openModal(id)}
                    >
                      { (id === "propertyAddress" || id === "leasingInfo" || id === "charges" || id === "rentReminder") && (
                        <div className="flex items-center gap-[6px]">
                        <img src={isFilled ? edit : plus } alt="" className="w-[22px] h-[22px]" />
                        <p className="underline text-[16px] ">{isFilled ? "Edit" : "Add"}</p>
                      </div>
                      )}

                      { (id === "applicationAgreement" || id === "aboutProperty") && (
                        <div className="flex items-center gap-[6px]">
                        {!isFilled && (
                          <img src={ plus } alt="" className="w-[22px] h-[22px]" />
                        )}
                        <p className="underline text-[16px] ">{isFilled ? "" : "Add"}</p>
                      </div>
                      )}

                      { (id === "petFees" || id === "parking" || id === "education" || id === "stations" || id === "landmark" || id === "utilities" || id === "communityFeatures") && (
                        <div className="flex items-center gap-[6px]">
                        <img src={ plus } alt="" className="w-[22px] h-[22px]" />
                        <p className="underline text-[16px] ">{ "Add" }</p>
                      </div>
                      )}

                    </button>

                    <ModalWrapper isOpen={activeModal === id} onClose={closeModal} title={label}>
                      <FormComponent
                        onClose={closeModal}
                        onSave={(data) => handleSave(id, data)}
                      />
                    </ModalWrapper>
                  </div>

                </div>

                {/* Property Address */}
                {isFilled && id === "propertyAddress" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].propertyName},{" "}
                        {formData[id].website},{" "}
                        {"Total unit: "}{formData[id].unitCount}
                      </p>
                      <p>
                        {formData[id].street},{" "}
                        {formData[id].country}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Leasing Info */}
                {isFilled && id === "leasingInfo" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Leasing manager: "}{formData[id].managerName},{" "}
                        {formData[id].email}
                      </p>
                      <p>
                        {formData[id].phone}{" "}
                        <span className="text-[16px] font-[500] text-[#6F6C6A] ">Address(same as property)</span>
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Charges */}
                {isFilled && id === "charges" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col ">
                      <p className="">
                        {"Application fee: $"}{formData[id].appFee}{"(All 18+ applicant), "}
                        {"Admin fee: $"}{formData[id].adminFee}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Rent Reminder */}
                {isFilled && id === "rentReminder" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Rent payment frequency: "}{formData[id].rentP},{" "}
                        {"Rent reminder date: "}{formData[id].rentR}{"th every month"}
                      </p>
                      <p>
                        {"Rent due date: "}{formData[id].rentD}{"th every month"}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 text-sm underline mt-1"
                    >
                      Delete
                    </button> */}
                  </div>
                )}

                {/* Application Agreement */}
                {isFilled && id === "applicationAgreement" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Agreement: "}{formData[id].fileName}
                      </p>
                      <p className="text-[#6F6C6A] font-[500] " >Accept RentYard property adding terms & condition</p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Community Features Preview */}
                {isFilled && id === "communityFeatures" && (
                  <div className="flex w-[100%] flex-wrap gap-[12px] border-t border-[#E0E0E0] px-[20px] pt-[20px] mt-[20px]">
                    {formData.communityFeatures?.selectedRaw.map((item) => {
                      const index = amenitiesList.indexOf(item);
                      const icon = icons[index];
                      return (
                        <div
                          key={item}
                          className="flex relative items-center gap-[10px] px-[12px] py-[8px] border-[2px] border-[#E0E0E0] rounded-[12px] font-[600] text-[16px] text-[#272B35]"
                        >
                          <div className="bg-[#F4F4F4] p-[6px] rounded-[8px]">
                            <img src={icon} alt={item} className="w-[20px] h-[20px]" />
                          </div>
                          {item}
                          <button
                            onClick={() => handleAmenityDelete(item)}
                            className="text-[20px] absolute -top-2 -right-2 rounded-[100px] p-[4px] bg-[#FF6A62] text-[#316EED] ml-2 font-[700] hover:text-red-500"
                          >
                            <img src={cancel} alt="" className="w-[12px] h-[12px] " />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* About Property */}
                {isFilled && id === "aboutProperty" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] px-[20px] pt-[20px]">
                    <div className="flex flex-col ">
                      <p className="">
                        {formData[id].msg}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pet Fees */}
                {isFilled && id === "petFees" && (
                  <div className="flex justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35]">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].petType},{" "}
                        {"Max weight: "}{formData[id].maxWt}{"lb"},{" "}
                        {"Monthly per rent: $"}{formData[id].petRent}
                      </p>
                      <p>
                        {"One time pet fee: $"}{formData[id].petFee},{" "}
                        {"Pet security deposit: $"}{formData[id].petSecurity},{" "}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Parking */}
                {isFilled && id === "parking" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {"Guest vehicle parking time: "}{formData[id].hr}
                      </p>
                      <p className="">
                        {formData[id].msgP}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Education */}
                {isFilled && id === "education" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].eduType},{" "}
                        {formData[id].eduName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stations */}
                {isFilled && id === "stations" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].stType},{" "}
                        {formData[id].stName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Landmark */}
                {isFilled && id === "landmark" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].lType},{" "}
                        {formData[id].lName},{" "}
                        {formData[id].dis}{"mile"}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Utilities */}
                {isFilled && id === "utilities" && (
                  <div className="flex flex-wrap gap-[14px] justify-between font-[600] w-[100%] px-[20px] pt-[20px] mt-[20px] border-t border-[#E0E0E0] text-[16px] text-[#272B35] ">
                    <div className="flex flex-col gap-[8px] ">
                      <p className="">
                        {formData[id].uType},{" "}
                        {formData[id].uName}
                      </p>
                    </div>
                    <div className=" flex gap-[12px] items-center flex-wrap">
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => openModal(id)}
                          className=" " >
                          <img src={ edit2 } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                      <div className=" min-h-[24px]">
                        <button
                          onClick={() => handleDelete(id)}
                          className=" " >
                          <img src={ deleteIcon } alt="" className="object-cover w-[24px] h-[24px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}



              </div>
            );
          }
          })}
          </div>
        </div>


        {/* Property Gallery */}
        <div className="border border-[#E0E0E0] rounded-[14px] mb-8">
          <div className="h-[66px] rounded-t-[14px] border-b-[1px] border-[#E0E0E0] p-[20px] flex items-center">
            <h3 className="font-[600] text-[18px]">
              Property gallery <span className="text-[#6F6C6A]">(Its not unit photo)*</span>
            </h3>
          </div>

          <div className="p-[20px]">
            <div className="flex flex-wrap gap-[24px] mb-4">
              {/* Featured photo */}
              <div className="flex flex-col gap-[14px]">
                <p className="text-[16px] font-[600] text-[#272B35]">
                  Featured photos <span className="text-[red]">*</span>
                </p>
                <div className="flex flex-wrap gap-[10px]">
                  <div className="flex flex-col items-center justify-center bg-[#F6F9FF] w-[217px] h-[165px] border-[1px] border-dashed rounded-[12px] border-[#316EED] cursor-pointer hover:border-blue-500 transition relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      title="Upload cover photo (jpg, png only)"
                    />
                    <div className="border rounded-[6px] p-[6px] border-[#316EED] border-dashed">
                      <img src={upload} alt="" className="w-[24px] h-[24px]" />
                    </div>
                    <div className="mt-1 text-center text-[16px] font-[600] text-[#272B35]">Upload cover photo</div>
                    <p className="text-[10px] font-[600] text-[#6F6C6A]">(Jpg, png only)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="min-w-[101px] h-[76px] bg-[#F6F9FF] flex justify-center items-center border border-dashed border-[#316EED] rounded-[12px] cursor-pointer hover:border-blue-500 transition relative"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          title="Upload photo"
                        />
                        <div className="border rounded-[6px] flex justify-center items-center border-[#316EED] w-[28px] h-[28px] border-dashed">
                          <img src={upload} alt="" className="w-[16px] h-[16px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* More photos grid */}
              <div className="flex flex-col gap-[14px]">
                <p className="text-[16px] font-[600] text-[#272B35]">
                  More photos<span className="text-[#6F6C6A]">(optional)</span>
                </p>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-[10px]">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[101px] h-[76px] bg-[#F6F9FF] flex justify-center items-center border border-dashed border-[#316EED] rounded-[12px] cursor-pointer hover:border-blue-500 transition relative"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        title="Upload photo"
                      />
                      <div className="border rounded-[6px] flex justify-center items-center border-[#316EED] w-[28px] h-[28px] border-dashed">
                        <img src={upload} alt="" className="w-[16px] h-[16px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Videos section */}
        <div className={videosOpen ? "border border-b-[1px] border-[#E0E0E0] rounded-[20px] pb-[20px] mb-2" : "border border-b-[1px] border-[#E0E0E0] rounded-[20px] py-[20px] mb-2 " }>
          <div className={videosOpen ? "border-b-[1px] py-[20px] border-[#E0E0E0] rounded-t-[20px]" : "rounded-t-[20px]"}>
          <button
            type="button"
            onClick={() => setVideosOpen(!videosOpen)}
            className="w-full px-[20px] flex justify-between items-center text-left text-[18px] text-[#272B35] font-[600] "
          >
            <p>Videos<span className="text-[#6F6C6A]"> (optional)</span></p>
            <svg
              className={`w-5 h-5 border rounded-[5rem] transform transition-transform ${videosOpen ? "rotate-180" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          </div>
          {videosOpen && (
            <div className="mt-[20px] px-[20px] flex flex-wrap gap-[24px]">

                <div className="flex flex-col gap-[14px]">
                    <p className="text-[16px] font-[600] text-[#272B35]">
                        Property Video<span className="text-[#6F6C6A]"> (optional)</span>
                    </p>
                    <div className="flex flex-wrap gap-[10px]">
                        <div className="flex flex-col items-center justify-center bg-[#F6F9FF] w-[127px] h-[110px] border-[1px] border-dashed rounded-[12px] border-[#316EED] cursor-pointer hover:border-blue-500 transition relative">
                            <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            title="Upload video (MP4, MOV only)"
                            />
                            <div className="border rounded-[6px] p-[6px] border-[#316EED] border-dashed">
                                <img src={upload} alt="" className="w-[20px] h-[20px]" />
                            </div>
                            <div className="mt-1 text-center text-[12px] font-[700] text-[#272B35]">Upload video</div>
                            <p className="text-[10px] font-[500] text-[#6F6C6A]">(MP4, MOV only)</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[14px]">
                    <p className="text-[16px] font-[600] text-[#272B35]">
                        Property virtual tour<span className="text-[#6F6C6A]"> (optional)</span>
                    </p>
                    <div className="flex flex-wrap gap-[10px]">
                        <div className="flex flex-col items-center justify-center bg-[#F6F9FF] w-[127px] h-[110px] border-[1px] border-dashed rounded-[12px] border-[#316EED] cursor-pointer hover:border-blue-500 transition relative">
                            <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            title="Upload video (MP4, MOV only)"
                            />
                            <div className="border rounded-[6px] p-[6px] border-[#316EED] border-dashed">
                                <img src={upload} alt="" className="w-[20px] h-[20px]" />
                            </div>
                            <div className="mt-1 text-center text-[12px] font-[700] text-[#272B35]">Upload video</div>
                            <p className="text-[10px] font-[500] text-[#6F6C6A]">(MP4, MOV only)</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[14px]">
                    <p className="text-[16px] font-[600] text-[#272B35]">
                        Property arial video<span className="text-[#6F6C6A]"> (optional)</span>
                    </p>
                    <div className="flex flex-wrap gap-[10px]">
                        <div className="flex flex-col items-center justify-center bg-[#F6F9FF] w-[127px] h-[110px] border-[1px] border-dashed rounded-[12px] border-[#316EED] cursor-pointer hover:border-blue-500 transition relative">
                            <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            title="Upload video (MP4, MOV only)"
                            />
                            <div className="border rounded-[6px] p-[6px] border-[#316EED] border-dashed">
                                <img src={upload} alt="" className="w-[20px] h-[20px]" />
                            </div>
                            <div className="mt-1 text-center text-[12px] font-[700] text-[#272B35]">Upload video</div>
                            <p className="text-[10px] font-[500] text-[#6F6C6A]">(MP4, MOV only)</p>
                        </div>
                    </div>
                </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
})

export default CondoInfoForm;