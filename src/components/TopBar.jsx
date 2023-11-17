import React, { useEffect, useState } from "react";
import { Search, Mail, NotificationsActive } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
import { fetchRestaurants } from "../services/RestaurantServices";

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const [myRestaurant, setMyRestaurant] = useState(null);
  const getMyRestaurant = async () => {
    try {
      const res = await fetchRestaurants();
      const matchingRestaurant = res.data.find(
        (restaurant) => restaurant.idManager === user.id || user.restaurantId
      );
      if (res && res.data && matchingRestaurant) {
        setMyRestaurant(matchingRestaurant);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyRestaurant();
  }, []);

  return (
    <main className="inline-flex w-full">
      <section className="w-80 h-24 bg-violet-500 inline-flex items-center justify-center gap-3">
        <img className="h-16" src="src/assets/icons/restaurant.svg" />
        <div>
          <h3 className="text-amber-200 font-waterBrush font-semibold text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Xin Chào,
          </h3>
          <h3 className="text-amber-200 font-waterBrush font-semibold text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {myRestaurant && myRestaurant.name}
          </h3>
        </div>
      </section>
      <section className="Second h-24 inline-flex grow items-center justify-between gap-3 px-8 py-6">
        <div className="w-96 h-14 inline-flex items-center gap-3 text-zinc-400 bg-zinc-100 px-4">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            className="w-full font-beVietnam outline-none bg-transparent focus:text-black"
          />
        </div>
        <div className="inline-flex items-center gap-4 text-zinc-400">
          <Mail className="cursor-pointer" />
          <NotificationsActive className="cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer" />
          <span className="text-gray-500 text-base font-bold font-beVietnam leading-tight">
            {user.fullname}
          </span>
        </div>
      </section>
    </main>
  );
};

export default TopBar;
