import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FormInput from "../../components/FormInput";
import FormButtons from "../../components/FormButtons";
import { message } from "antd";
import { RestaurantContext } from "../../context/restaurantContext/RestaurantContext";
import {
  createRestaurant,
  updateRestaurant,
} from "../../context/restaurantContext/apiCalls";
import { fetchRestaurants } from "../../services/RestaurantServices";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase";

const ManageRestaurant = () => {
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const { isFetching, dispatch } = useContext(RestaurantContext);
  const manager = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const storageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track the progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploaded ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setRestaurant((prevRestaurant) => ({
              ...prevRestaurant,
              [name]: downloadURL,
            }));
          });
        }
      );
    } else {
      setRestaurant((prevRestaurant) => ({
        ...prevRestaurant,
        [name]: value,
      }));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createRestaurant(restaurant, dispatch);
    console.log(restaurant);
    message.success("Tạo mới thành công");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateRestaurant(myRestaurant._id, restaurant, dispatch);
    message.success("Cập nhật thành công");
    getMyRestaurant();
  };

  const getMyRestaurant = async () => {
    try {
      const res = await fetchRestaurants();
      const matchingRestaurant = res.data.find(
        (restaurant) => restaurant.idManager === manager.id
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
  }, [manager.id]);

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
          action="create or update restaurant"
          onSubmit={myRestaurant ? handleUpdate : handleCreate}
          className="flex flex-col gap-5"
        >
          <FormInput
            title="Name"
            placeholder={myRestaurant && myRestaurant.name}
            type="text"
            name="name"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Address"
            placeholder={myRestaurant && myRestaurant.address}
            type="text"
            name="address"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Profile picture"
            type="file"
            name="image"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
            accept="image/*"
          />
          <FormInput
            title="Opening hours"
            placeholder={myRestaurant && myRestaurant.openingHours}
            type="time"
            name="openingHours"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Closing hours"
            placeholder={myRestaurant && myRestaurant.closingHours}
            type="time"
            name="closingHours"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Description"
            placeholder={myRestaurant && myRestaurant.description}
            type="text"
            name="description"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Location"
            placeholder={myRestaurant && myRestaurant.locationName}
            type="text"
            name="locationName"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
          />
          <FormInput
            title="Location code"
            placeholder={myRestaurant && myRestaurant.locationCode}
            type="text"
            name="locationCode"
            onChange={handleChange}
            isRequired={myRestaurant ? null : true}
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

export default ManageRestaurant;
