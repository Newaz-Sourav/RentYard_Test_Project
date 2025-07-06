import React, { useState } from "react";

export default function Parking({ onClose, onSave }) {
  const [parkingTime, setParkingTime] = useState("2H");
  const [overview, setOverview] = useState("");
  const maxChars = 200;

  const handleSubmit = () => {
    onSave({
      hr: parkingTime,
      msgP: overview,
    });
  };

  return (
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      <div className="space-y-4 col-span-2">
        {/* Guest vehicle parking time */}
        <div className="flex flex-wrap justify-between gap-[10px] max-w-[343px] min-h-[48px] py-[6px] px-[16px] items-center rounded-[12px] border border-[#E0E0E0]">
          <label className="text-[16px] font-[600] text-[#000000]">
            Guest vehicle parking time
          </label>
          <select
            value={parkingTime}
            onChange={(e) => setParkingTime(e.target.value)}
            className="border border-[#E0E0E0] rounded-[8px] px-[10px] py-[6px] font-[500] text-[14px] text-[#272B35] focus:outline-none focus:ring-1"
          >
            <option value="1H">1H</option>
            <option value="2H">2H</option>
            <option value="3H">3H</option>
            <option value="4H">4H</option>
          </select>
        </div>

        {/* Parking overview textarea */}
        <div className="relative">
          <textarea
            placeholder="Write parking overview"
            value={overview}
            onChange={(e) =>
              e.target.value.length <= maxChars && setOverview(e.target.value)
            }
            rows={5}
            className="w-full border border-[#E0E0E0] rounded-[12px] px-4 py-3 resize-none focus:outline-none focus:ring-1 text-[16px] font-[600] text-[#6F6C6A]"
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {overview.length}/{maxChars}
          </div>
        </div>
      </div>

      {/* Add button */}
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
