import React from "react";

const ListItem = ({ numColumns, numRows, data }) => {
  return (
    <tbody className="w-full flex flex-col gap-3">
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
              02
            </td>
          ))}

        </tr>
      ))}
    </tbody>
  );
};

export default ListItem;