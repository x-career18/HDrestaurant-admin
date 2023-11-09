import React from "react";

const FormButtons = ({ btnName1, btnName2, btnType1, btnType2, btn1Disabled, btn2Disabled }) => {
  return (
    <div className="flex gap-5 pt-5">
      <button
        type={btnType1}
        disabled={btn1Disabled}
        className="w-36 h-10 bg-green-500 text-center text-white text-sm font-bold font-beVietnam leading-loose tracking-tight"
      >
        {btnName1}
      </button>
      <button
        type={btnType2}
        disabled={btn2Disabled}
        className="w-20 h-10 bg-neutral-400 text-center text-white text-sm font-bold font-beVietnam leading-loose tracking-tight"
      >
        {btnName2}
      </button>
    </div>
  );
};

export default FormButtons;
