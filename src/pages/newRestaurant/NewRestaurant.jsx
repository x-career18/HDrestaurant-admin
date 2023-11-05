import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormButtons from "../../components/FormButtons";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurant({ ...restaurant, [e.target.name]: value });
    console.log(restaurant);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(restaurant);
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
          />
          <FormInput
            title="Address"
            placeholder=""
            type="text"
            name="address"
            onChange={handleChange}
          />
          <FormInput title="Profile picture" placeholder="" type="file" />
          <FormInput
            title="Opening hours"
            placeholder=""
            type="time"
            name="openingHours"
            onChange={handleChange}
          />
          <FormInput
            title="Closing hours"
            placeholder=""
            type="time"
            name="closingHours"
            onChange={handleChange}
          />
          <FormInput
            title="Description"
            placeholder=""
            type="text"
            name="description"
            onChange={handleChange}
          />
          <FormSelect
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
          />
          <FormInput
            title="Location"
            placeholder=""
            type="text"
            name="locationName"
            onChange={handleChange}
          />
          <FormInput
            title="Location code"
            placeholder=""
            type="text"
            name="locationCode"
            onChange={handleChange}
          />
          <FormButtons
            btnType1="submit"
            btnType2="reset"
            btnName1="Create"
            btnName2="Cancel"
          />
        </form>
      </section>
    </main>
  );
};

export default NewRestaurant;
