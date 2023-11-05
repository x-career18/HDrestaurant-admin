import React, { useState } from "react";

const FormInput = ({ title, placeholder, type, name, onChange }) => {

  return (
    <div className="inline-flex items-center gap-9">
      <span className="w-28 text-neutral-600 text-base font-bold font-beVietnam leading-loose">
        {title}
      </span>
      <input
        className="px-3 py-2 w-96 text-zinc-400 text-sm font-bold font-beVietnam leading-10 outline-none border-[1px] border-slate-400 border-opacity-40"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;