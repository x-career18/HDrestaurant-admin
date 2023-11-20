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
import { Table } from "antd";
import moment from "moment";

const HomeAdmin = () => {
  const [numManagers, setNumManagers] = useState([]);
  const [numEmployees, setNumEmployees] = useState([]);
  const [numNewEmployees, setNumNewEmployees] = useState([]);
  const [numNewManagers, setNumNewManagers] = useState([]);
  const [numRestaurants, setNumRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
    setLoading(true);
    try {
      const res = await fetchRestaurants();
      if (res && res.data) {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNumRestaurants(res.data);
        setData(sortedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManager();
    getEmployee();
    getNewManager();
    getNewEmployee();
    getRestaurants();
  }, []);

  const allUsers = numManagers.length + numEmployees.length;
  const allNewUsers = numNewManagers.length + numNewEmployees.length;
  const allRestaurants = numRestaurants.length;

  const columns = [
    {
      width: 100,
      title: " ",
      dataIndex: "image",
      key: "image",
      render: (avatar) => (
        <img
          src={avatar || DEFAULT_IMAGE}
          alt="avatar"
          style={{ width: 50, height: 32, borderRadius: 4 }}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />
      ),
    },
    {
      title: "Tên nhà hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      width: 400,
      title: "Restaurant ID",
      dataIndex: "idRestaurant",
      key: "idRestaurant",
    },
    {
      width: 200,
      title: "Trạng thái",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified) => (
        <div className="flex items-center gap-10">
          <span
            className={`w-16 text-center text-white p-1 rounded-3xl ${
              isVerified ? "bg-green-500" : "bg-rose-500"
            }`}
          >
            {isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <Overview
        number1={allUsers}
        number2={allNewUsers}
        number3={allRestaurants}
        text1={"nhân viên"}
        title1={"Tổng số nhân viên"}
        text2={"nhân viên"}
        title2={"Số nhân viên mới"}
        text3={"nhà hàng"}
        title3={"Tổng số nhà hàng"}
        img1={"images/assets/icons/meeting.svg"}
        img2={"images/assets/icons/leader.svg"}
        img3={"images/assets/icons/money.svg"}
      />
      <div className="mx-12 mt-12">
        <h5 className="font-bold text-lg mb-5 font-beVietnam">
          Nhà hàng đã tạo gần đây
        </h5>
        <Table
          className="bg-white font-semibold text-sm leading-5 text-[#969696] drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)]"
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default HomeAdmin;
