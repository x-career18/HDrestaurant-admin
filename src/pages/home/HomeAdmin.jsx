import React from "react";

const HomeAdmin = () => {
  return (
    <div className="bg-slate-100 grow h-screen flex justify-center">
      <section className="h-40 inline-flex">
        <div className="w-96 h-40 inline-flex items-center justify-center bg-white">
          <div>
            <h2 className="text-sky-500 text-4xl font-bold font-beVietnam leading-10">
              212 nhân viên
            </h2>
            <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
              Tổng số nhân viên
            </span>
          </div>
          <div className="w-24 h-24">
            <img className="w-14 h-9" src="https://via.placeholder.com/55x36" />
          </div>
        </div>
        <div className="w-96 h-40 inline-flex items-center justify-center">
          <div>
            <h2 className="w-64 text-rose-500 text-4xl font-bold font-beVietnam leading-10">
              20 nhân viên
            </h2>
            <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
              Số nhân viên mới
            </span>
          </div>
          <div className="w-24 h-24">
            <img
              className="w-11 h-12"
              src="https://via.placeholder.com/44x47"
            />
          </div>
        </div>
        <div className="w-96 h-40 inline-flex items-center justify-center">
          <div>
            <h2 className="text-amber-400 text-4xl font-bold font-beVietnam leading-10">
              20 nhà hàng
            </h2>
            <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
              Tổng số nhà hàng
            </span>
          </div>
          <div className="w-24 h-24">
            <img
              className="w-12 h-11"
              src="https://via.placeholder.com/50x43"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAdmin;
