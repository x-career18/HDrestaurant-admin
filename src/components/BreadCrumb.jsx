import React, { useContext } from "react";
import { AppContext } from "../context/appContext/AppContext";

const BreadCrumb = () => {
    const {activeTab} = useContext(AppContext)
  return (
    <main className="w-full h-16 inline-flex items-center justify-between px-8 mb-16 bg-violet-500 bg-opacity-10">
      <span className="text-violet-500 text-xl font-bold font-beVietnam leading-10">
        {activeTab ? activeTab : ""}
      </span>
      {/* <div className="w-40 h-14 inline-flex items-center">
        <span className="tab-name text-violet-500 text-sm font-bold font-beVietnam leading-10 tracking-tight">
          Home
        </span>
        <span className="text-right text-violet-500 text-sm font-bold font-beVietnam leading-10 tracking-tight">
          -
        </span>
        <span className="text-zinc-400 text-sm font-bold font-beVietnam leading-10 tracking-tight">
          Restaurant
        </span>
      </div> */}
    </main>
  );
};

export default BreadCrumb;
