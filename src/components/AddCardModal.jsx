import React, { useState } from "react";
import xIcon from "../assets/images/X.png";
import CVC from "../assets/images/CVV.png";
import Layer from "../assets/images/Layer.png";



const AddCardModal = ({ onClose, onSave }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (cardInfo.name && cardInfo.number && cardInfo.expiry && cardInfo.cvc) {
      onSave(cardInfo);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000085] flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] max-w-[780px] w-[95%] ">
        
        <div className="relative bg-[#F4F4F4] border border-[#E0E0E0] rounded-t-[16px] h-[60px] px-[16px] py-[14px]">
            <h2 className="text-[16px] text-[#6F6C6A] font-[600] ">Add new card</h2>

            {/* Close button */}
            <button
            className="absolute cursor-pointer top-4 right-4 text-[red] hover:text-gray-700 text-xl"
            onClick={onClose}
            >
            <img src={xIcon} alt="" className="w-[24px] h-[24px] " />
            </button>
        </div>

        <div className="px-[16px] py-[10px] " >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[16px] font-[600] text-[#272B35] ">Name on card</label>
            <input
              name="name"
              value={cardInfo.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="mt-1 w-full border border-[#E0E0E0] rounded-[12px] px-[16px] h-[48px] text-[#6F6C6A] text-[14px] font-[600] outline-none"
            />
          </div>

          <div>
            <label className="text-[16px] font-[600] text-[#272B35] ">Card number</label>
            <div className="relative " >
            <input
              type="number"
              name="number"
              value={cardInfo.number}
              onChange={handleChange}
              placeholder="Enter card number"
              className="mt-1 w-full border border-[#E0E0E0] rounded-[12px] px-[16px] h-[48px] text-[#6F6C6A] text-[14px] font-[600] outline-none"
            />
            <img src={Layer} alt="" className="absolute right-4 top-1/2 transform -translate-y-1/2  w-[24px] h-[24px] "  />
            </div>
            
          </div>

          <div>
            <label className="text-[16px] font-[600] text-[#272B35] ">Expire date</label>
            <input
              name="expiry"
              value={cardInfo.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 w-full border border-[#E0E0E0] rounded-[12px] px-[16px] h-[48px] text-[#6F6C6A] text-[14px] font-[600] outline-none"
            />
          </div>

          <div>
            <label className="text-[16px] font-[600] text-[#272B35] ">CVC</label>
            <div className="relative " >
            <input
            type="number"
              name="cvc"
              value={cardInfo.cvc}
              onChange={handleChange}
              placeholder="Enter cvc"
              className="mt-1 w-full border border-[#E0E0E0] rounded-[12px] px-[16px] h-[48px] text-[#6F6C6A] text-[14px] font-[600] outline-none"
            />
            <img src={CVC} alt="" className="absolute right-4 top-1/2 transform -translate-y-1/2  w-[24px] h-[24px] " />
            </div>
          </div>
        </div>

        <div className="flex pt-[16px] mt-[24px] border-t border-[#E0E0E0] justify-end">
          <button
            onClick={handleSave}
            className="bg-[#316EED] cursor-pointer text-white text-[16px] font-[700] px-[24px] py-[14px] rounded-[12px]"
          >
            Save
          </button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default AddCardModal;
