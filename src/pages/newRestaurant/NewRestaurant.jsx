import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormButtons from "../../components/FormButtons";
import { RestaurantContext } from "../../context/restaurantContext/RestaurantContext";
import { createRestaurant } from "../../context/restaurantContext/apiCalls";
import {
  fetchRestaurants,
  fetchUpdateRestaurant,
} from "../../services/RestaurantServices";

const NewRestaurant = () => {
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const { isFetching, dispatch } = useContext(RestaurantContext);
  const manager = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurant({ ...restaurant, [e.target.name]: value });
    console.log(restaurant)
  };

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(restaurant);
    createRestaurant(restaurant, dispatch);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetchUpdateRestaurant(restaurant);
  };

  const getRestaurant = async () => {
    try {
      const res = await fetchRestaurants();
      const matchingRestaurant = res.data.find(
        (restaurant) => restaurant.idManager === manager.id
      );
      if (matchingRestaurant) {
        setMyRestaurant(matchingRestaurant);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <main className="bg-slate-100 grow flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col px-8 pt-8 pb-10 bg-white mx-10 mb-10 drop-shadow-[1.5px_2.5999999046325684px_10px_rgba(119,119,119,0.10)]">
        <h3 className="mb-5 text-neutral-600 text-xl font-bold font-beVietnam leading-loose">
          {myRestaurant
            ? "Cập nhật thông tin nhà hàng"
            : "Thông tin đăng ký nhà hàng"}
        </h3>
        <form
          action=""
          onSubmit={myRestaurant ? handleUpdate : handleCreate}
          className="flex flex-col gap-5"
        >
          <FormInput
            title="Name"
            placeholder={myRestaurant && myRestaurant.name}
            type="text"
            name="name"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Address"
            placeholder={myRestaurant && myRestaurant.address}
            type="text"
            name="address"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Profile picture"
            type="text"
            name="image"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Opening hours"
            placeholder={myRestaurant && myRestaurant.openingHours}
            type="time"
            name="openingHours"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Closing hours"
            placeholder={myRestaurant && myRestaurant.closingHours}
            type="time"
            name="closingHours"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Description"
            placeholder={myRestaurant && myRestaurant.description}
            type="text"
            name="description"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Location"
            placeholder={myRestaurant && myRestaurant.locationName}
            type="text"
            name="locationName"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormInput
            title="Location code"
            placeholder={myRestaurant && myRestaurant.locationCode}
            type="text"
            name="locationCode"
            onChange={handleChange}
            {...{myRestaurant} ? null : isRequired && { isRequired }}
          />
          <FormButtons
            btnType1="submit"
            btnType2="reset"
            btnName1={myRestaurant ? "Update" : "Create"}
            btnName2="Cancel"
            btn1Disabled={isFetching}
            btn2Disabled={isFetching}
          />
        </form>
      </section>
    </main>
  );
};

export default NewRestaurant;
