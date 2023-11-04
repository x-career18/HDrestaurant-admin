import React from "react";
import Overview from "../../components/Overview";
import BreadCrumb from "../../components/BreadCrumb";

const HomeAdmin = () => {
  return (
    <div className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <Overview />
    </div>
  );
};

export default HomeAdmin;
