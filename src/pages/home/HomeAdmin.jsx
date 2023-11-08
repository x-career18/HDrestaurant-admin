import React, { useEffect, useState } from "react";
import Overview from "../../components/Overview";
import BreadCrumb from "../../components/BreadCrumb";
import {
  fetchUserManager,
  fetchUserEmployee,
  fetchNewManager,
  fetchNewEmployee,
} from "../../services/UserSevices";
import { fetchRestaurants } from "../../services/RestaurantServices";

const HomeAdmin = () => {
  const [numManagers, setNumManagers] = useState([]);
  const [numEmployees, setNumEmployees] = useState([]);
  const [numNewEmployees, setNumNewEmployees] = useState([]);
  const [numNewManagers, setNumNewManagers] = useState([]);
  const [numRestaurants, setNumRestaurants] = useState([]);
  const getManager = async () => {
    try {
      const response = await fetchUserManager();
      if (response && response.data) {
        setNumManagers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEmployee = async () => {
    try {
      const response = await fetchUserEmployee();
      if (response && response.data) {
        setNumEmployees(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNewEmployee = async () => {
    try {
      const res = await fetchNewEmployee();
      if (res && res.data) {
        setNumNewEmployees(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getNewManager = async () => {
    try {
      const res = await fetchNewManager();
      if (res && res.data) {
        setNumNewManagers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurants = async () => {
    try {
      const res = await fetchRestaurants();
      if (res && res.data) {
        setNumRestaurants(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManager();
    getEmployee();
    getNewManager(), getNewEmployee(), getRestaurants();
  }, []);

  const allUsers = numManagers.length + numEmployees.length;
  const allNewUsers = numNewManagers.length + numNewEmployees.length;
  const allRestaurants = numRestaurants.length;

  return (
    <div className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <Overview
        firstNumber={allUsers}
        secondNumber={allNewUsers}
        thirdNumber={allRestaurants}
        firstText={"nhân viên"}
        firstTitle={"Tổng số nhân viên"}
        sencondText={"nhân viên"}
        secondTitle={"Số nhân viên mới"}
        thirdText={"nhà hàng"}
        thirdTitle={"Tổng số nhà hàng"}
      />
    </div>
  );
};

export default HomeAdmin;
