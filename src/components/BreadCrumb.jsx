import React, { useContext } from "react";
import { AppContext } from "../context/appContext/AppContext";

const BreadCrumb = () => {
    const {activeTab} = useContext(AppContext)
  return (
    <main className="w-full h-16 inline-flex items-center justify-between px-8 mb-16 bg-violet-500 bg-opacity-10">
      <span className="text-violet-500 text-xl font-bold font-beVietnam leading-10">
        {activeTab ? activeTab : ""}
      </span>
    </main>
  );
};

export default BreadCrumb;
