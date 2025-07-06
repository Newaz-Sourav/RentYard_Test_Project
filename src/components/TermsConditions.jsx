import React, { useState } from "react";
import checkmark from "../assets/images/checkmark.png";


const TermsConditions = ({ isChecked, setIsChecked }) => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-3 mt-4">
            <button
              type="button" 
              onClick={()=> setIsChecked(!isChecked)}
              className="border-[#272B35] rounded border-[1.5px] min-w-[15.83px] min-h-[15.83px] flex justify-center items-center ">
              {isChecked && (
                  <img src={checkmark} alt="" className="object-fill w-[9.67px] h-[9px] " />
              )}
            </button>
            <p htmlFor="terms" className="text-[16px] font-[600] text-[#272B35]">
              Accept RentYard property adding terms & condition
            </p>
        </div>
      
    </div>
  )
}

export default TermsConditions
