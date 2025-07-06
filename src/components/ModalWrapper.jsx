import React, { useEffect } from "react";

export default function ModalWrapper({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000085] z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-[16px] w-full max-w-[780px] max-h-[90vh] flex flex-col overflow-hidden shadow-lg">
        
        {/* Header */}
        <div className="bg-[#F4F4F4] border-b border-[#E0E0E0] h-[60px] px-[16px] py-[14px] relative flex items-center rounded-t-[16px]">
          <button
            onClick={onClose}
            className="absolute top-[16px] right-[16px] text-[18px] font-bold text-[#6F6C6A] hover:text-gray-700"
          >
            ✕
          </button>
          {title && (
            <h2 className="text-[16px] text-[#6F6C6A] font-[600]">{title}</h2>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-[16px] py-[16px]">
          {children}
        </div>
      </div>
    </div>
  );
}
