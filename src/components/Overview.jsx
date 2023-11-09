import React from "react";

const Overview = ({
  number1,
  number2,
  number3,
  title1,
  text1,
  title2,
  text2,
  title3,
  text3,
  img1,
  img2,
  img3,
}) => {
  return (
    <main className="w-full h-40 inline-flex justify-evenly">
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-12
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-sky-500 text-4xl font-bold font-beVietnam leading-10">
            {number1} {text1}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {title1}
          </span>
        </div>
        <img className="w-24" src={img1} />
      </div>
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-10
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-rose-500 text-4xl font-bold font-beVietnam leading-10">
            {number2} {text2}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {title2}
          </span>
        </div>
        <img className="w-24" src={img2} />
      </div>
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-10 
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-amber-400 text-4xl font-bold font-beVietnam leading-10">
            {number3} {text3}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {title3}
          </span>
        </div>
        <img className="w-24" src={img3} />
      </div>
    </main>
  );
};

export default Overview;
