import React, { useContext, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormButtons from "../../components/FormButtons";
import { RestaurantContext } from "../../context/restaurantContext/RestaurantContext";
import { createRestaurant } from "../../context/restaurantContext/apiCalls";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { isFetching, dispatch } = useContext(RestaurantContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurant({ ...restaurant, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(restaurant)
    createRestaurant(restaurant, dispatch);
  };

  return (
    <main className="bg-slate-100 grow flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col px-8 pt-8 pb-10 bg-white mx-10 mb-10 drop-shadow-[1.5px_2.5999999046325684px_10px_rgba(119,119,119,0.10)]">
        <h3 className="mb-5 text-neutral-600 text-xl font-bold font-beVietnam leading-loose">
          Thông tin đăng ký nhà hàng
        </h3>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            title="Name"
            placeholder=""
            type="text"
            name="name"
            onChange={handleChange}
            isRequired
          />
          <FormInput
            title="Address"
            placeholder=""
            type="text"
            name="address"
            onChange={handleChange}
            isRequired
          />
          <FormInput title="Profile picture" type="text" name="image" onChange={handleChange} isRequired />
          <FormInput
            title="Opening hours"
            placeholder=""
            type="time"
            name="openingHours"
            onChange={handleChange}
            isRequired
          />
          <FormInput
            title="Closing hours"
            placeholder=""
            type="time"
            name="closingHours"
            onChange={handleChange}
            isRequired
          />
          <FormInput
            title="Description"
            placeholder=""
            type="text"
            name="description"
            onChange={handleChange}
            isRequired
          />
          {/* <FormSelect
            title="Status"
            option1="Verified"
            option2="Pending"
            onChange={handleChange}
            name="isVerified"
          />
          <FormInput
            title="Restaurant's ID"
            placeholder=""
            type="text"
            name="idRestaurant"
            onChange={handleChange}
          />
          <FormInput
            title="Manager's ID"
            placeholder=""
            type="text"
            name="idManager"
            onChange={handleChange}
          /> */}
          <FormInput
            title="Location"
            placeholder=""
            type="text"
            name="locationName"
            onChange={handleChange}
            isRequired
          />
          <FormInput
            title="Location code"
            placeholder=""
            type="text"
            name="locationCode"
            onChange={handleChange}
            isRequired
          />
          <FormButtons
            btnType1="submit"
            btnType2="reset"
            btnName1="Create"
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
