import React, { useState } from "react";


export default function AboutProperty({ onSave }) {
  const [formValues, setFormValues] = useState({
    msg: '',
  });

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formValues);
  };


  return (
    <form className="grid grid-cols-2 gap-[10px] ">
      {/* textarea */}
      <div className="flex flex-col col-span-2">
        <textarea 
          value={formValues.msg}
          onChange={handleChange('msg')}
          className="border border-[#E0E0E0] h-[164px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2" placeholder="Type message here"
        />
      </div>



      {/* Add button */}
      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px] ">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] hover:bg-blue-700 text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700] "
        >
          Add
        </button>
      </div>
    </form>
  );
}
