import React from "react";

const ListItem = ({ numColumns, numRows }) => {
  return (
    <tbody>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="h-20 bg-white hover:drop-shadow-[0px_3px_10px_rgba(119,119,119,0.10)] drop-shadow-[0_20p_20px_rgba(0,0,0,0.10)]"
        >
          {Array.from({ length: numColumns }).map((_, colIndex) => (
            <td
              key={colIndex}
              className="text-gray-500 text-lg text-center font-bold font-beVietnam leading-10 tracking-tight"
            >
              01
            </td>
          ))}
          {/* <td className="text-center">
          <span className="bg-orange-400 px-3 py-2 rounded-3xl text-center text-white text-base font-bold font-beVietnam leading-snug tracking-tight">
            Pending
          </span>
        </td> */}
        </tr>
      ))}
    </tbody>
  );
};

export default ListItem;
