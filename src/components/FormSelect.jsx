import React from "react";

const FormSelect = ({ title, option1, option2, name, onChange }) => {
  return (
    <div className="inline-flex items-center gap-9">
      <span className="w-28 text-neutral-600 text-base font-bold font-beVietnam leading-loose">
        {title}
      </span>
      <select
        className="px-3 py-2 w-96 text-zinc-400 text-sm font-bold font-beVietnam
        leading-10 outline-none border-[1px] border-slate-400 border-opacity-40"
        name={name}
        onChange={onChange}
      >
        <option value={true} className="text-green-400 font-bold">{option1}</option>
        <option value={false} className="text-amber-400 font-bold">{option2}</option>
      </select>
    </div>
  );
};

export default FormSelect;
