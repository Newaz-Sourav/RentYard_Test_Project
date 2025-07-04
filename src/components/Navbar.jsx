import React from 'react'
import logo from "../assets/images/logo.png";

const Navbar = ({ onGetStarted }) => {
  return (
    <div>
        <div className="flex w-[100%] justify-between items-center mb-5 border-b-[1px] border-[#E0E0E0] py-[16px] px-[80px]">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                <img src={logo} alt="" className=" sm:w-[147.28px] w-[90px] sm:h-[38.78px] h-[28px]" />
            </div>
            <button className="border cursor-pointer border-[#E0E0E0] py-[12px] px-[24px] rounded-[12px] text-sm hover:bg-gray-100">
                <div className="text-[#272B35] text-[16px] font-[600]">
                {!onGetStarted ? 
                  <p>Exit</p> : <p> Save & Exit</p>
                }
                </div>
            </button>
        </div>
    </div>
  )
}

export default Navbar
