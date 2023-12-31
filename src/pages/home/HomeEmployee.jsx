import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Overview from "../../components/Overview";
import { fetchBookings } from "../../services/BookingServices";
import { fetchRestaurants } from "../../services/RestaurantServices";
import { fetchBills } from "../../services/billsServices";
import { Table } from "antd";
import moment from "moment";


const HomeEmployee = () => {
  const [numBookings, setNumBookings] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);
  const [revenue, setRevenue] = useState(0)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [restaurantRes, bookingsRes, billRes] = await Promise.all([
          fetchRestaurants(),
          fetchBookings(),
          fetchBills(),
        ]);
        const employee = JSON.parse(localStorage.getItem("user"));
        const matchingRestaurant = restaurantRes.data.find(
          (restaurant) => restaurant._id === employee.restaurantId
        );

        if (matchingRestaurant) {
          const matchingBookings = bookingsRes.data.filter(
            (booking) => booking.restaurantId === matchingRestaurant._id
          );
          const sortedBookings = matchingBookings.sort((a, b) =>
            moment(b.bookingTime).diff(moment(a.bookingTime))
          );
          const matchingBills = billRes.data.filter(
            (bill) => bill.idRestaurant === matchingRestaurant.idRestaurant
          );

          setNumBookings(matchingBookings);
          setLatestBookings(sortedBookings.slice(0, 10));
          setRevenue(
            matchingBills.reduce((sum, bill) => sum + bill.totalAmount, 0)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên thực khách",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày đặt bàn",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Giờ đặt ăn",
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
    {
      width: 200,
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center gap-10">
          <span
            className={`w-20 text-center text-white p-1 rounded-3xl ${
              status === "pending" ? "bg-rose-500" : "bg-green-500"
            }`}
          >
            {status === "pending" ? "Pending" : "Active"}
          </span>
        </div>
      ),
    },
  ];

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <Overview
        number1={numBookings.length}
        text1={"đơn"}
        title1={"Tổng đơn đặt bàn"}
        img1={"images/assets/icons/box-checked.svg"}
        number2={latestBookings.length}
        text2={"đơn"}
        title2={"Đơn đặt bàn mới"}
        img2={"images/assets/icons/bookings.svg"}
        number3={revenue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        text3={"VND"}
        title3={"Tổng doanh thu"}
        img3={"images/assets/icons/money.svg"}
      />
      <section className="mx-12 mt-12">
        <h5 className="font-bold text-lg mb-5 font-beVietnam">
          Đơn đặt bàn gần đây
        </h5>
        <Table
          className="bg-white font-semibold text-sm leading-5 text-[#969696] drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)]"
          columns={columns}
          dataSource={latestBookings}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default HomeEmployee;
