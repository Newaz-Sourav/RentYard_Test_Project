import React, { useState } from "react";
import searchIcon from "../assets/images/search.png";
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

export default function CommunityFeatures({ onClose, onSave }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(["Air conditioning"]);

  const toggleAmenity = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const filtered = amenitiesList
    .map((item, index) => ({ item, icon: icons[index] }))
    .filter(({ item }) => item.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = () => {
    onSave({
      selectedRaw: selected,
    });
    onClose(); // Optional: Close modal after save
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-[20px]">
      <div className="w-full col-span-2">
        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search amenities"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[300px] border border-gray-300 focus:outline-none focus:ring-1"
          />
          <img src={searchIcon} className="absolute left-3 top-2.5 w-5 h-5" alt="Search" />
        </div>

        {/* Amenities Grid */}
        <div className="flex flex-wrap gap-[16px]">
          {filtered.map(({ item, icon }) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleAmenity(item)}
              className={`flex items-center text-[#272B35] gap-2 p-[10px] rounded-[12px] border-[2px] text-[16px] font-[600] transition-all
                ${selected.includes(item)
                  ? "bg-blue-50 border-[#316EED]"
                  : "bg-white border-[#E0E0E0]"}`}
            >
              <div className="bg-[#F4F4F4] p-[6px] rounded-[8px]">
                <img src={icon} alt="" className="w-[20px] h-[20px]" />
              </div>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Add button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px]">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700]"
        >
          Add
        </button>
      </div>
    </form>
  );
}
