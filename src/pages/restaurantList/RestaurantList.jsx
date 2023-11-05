import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ListItem from "../../components/ListItem";

const RestaurantList = () => {
  const numColumns = 5
  const numRows = 5
  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          List of Restaurants
        </h4>
        <table className="table-auto">
          <thead>
            <tr className="h-14">
              <th className="text-neutral-600 text-lg font-bold font-beVietnam leading-10 tracking-tight">
                No.
              </th>
              <th className="text-neutral-600 text-lg font-bold font-beVietnam leading-loose">
                Restaurant's name
              </th>
              <th className="text-neutral-600 text-lg font-bold font-beVietnam leading-loose">
                Date created
              </th>
              <th className="text-neutral-600 text-lg font-bold font-beVietnam leading-loose">
                ID
              </th>
              <th className="text-neutral-600 text-lg font-bold font-beVietnam leading-loose">
                Status
              </th>
            </tr>
          </thead>
          <ListItem numColumns={numColumns} numRows={numRows} />
        </table>
      </section>
    </main>
  );
};

export default RestaurantList;
