import React from "react";

const Overview = ({
  firstNumber,
  secondNumber,
  thirdNumber,
  firstTitle,
  firstText,
  secondTitle,
  sencondText,
  thirdTitle,
  thirdText,
}) => {
  return (
    <main className="w-full h-40 inline-flex justify-evenly">
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-12
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-sky-500 text-4xl font-bold font-beVietnam leading-10">
            {firstNumber} {firstText}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {firstTitle}
          </span>
        </div>
        <img className="w-24" src="src/assets/icons/meeting.svg" />
      </div>
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-10
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-rose-500 text-4xl font-bold font-beVietnam leading-10">
            {secondNumber} {sencondText}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {secondTitle}
          </span>
        </div>
        <img className="w-24" src="src/assets/icons/leader.svg" />
      </div>
      <div
        className="px-14 h-36 inline-flex items-center justify-center bg-white gap-10 
    drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)] hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.10)]"
      >
        <div>
          <h2 className="text-amber-400 text-4xl font-bold font-beVietnam leading-10">
            {thirdNumber} {thirdText}
          </h2>
          <span className="text-zinc-400 text-lg font-bold font-beVietnam leading-10">
            {thirdTitle}
          </span>
        </div>
        <img className="w-24" src="src/assets/icons/money.svg" />
      </div>
    </main>
  );
};

export default Overview;
