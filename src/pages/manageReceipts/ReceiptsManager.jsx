import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { fetchBills } from "../../services/billsServices";
import { AuthContext } from "../../context/authContext/AuthContext";
import moment from "moment";
import { Table, Modal } from "antd";
import { fetchRestaurants } from "../../services/RestaurantServices";
import { fetchUserEmployee } from "../../services/UserSevices";

const ReceiptsManager = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const showModal = (record) => {
    const { message } = record;
    setModalContent(message);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [restaurantRes, billRes, employeeRes] = await Promise.all([
        fetchRestaurants(),
        fetchBills(),
        fetchUserEmployee(),
      ]);

      const matchingRestaurant = restaurantRes.data.find(
        (restaurant) => restaurant.idManager === user.id
      );
      if (matchingRestaurant) {
        const matchingBills = billRes.data.filter(
          (bill) => bill.idRestaurant === matchingRestaurant.idRestaurant
        );
        setBills(matchingBills);
      }

      if (employeeRes && employeeRes.data) {
        setEmployees(employeeRes.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      width: 175,
      title: "Tên thực khách",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      width: 175,
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      width: 175,
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      width: 175,
      title: "Giá trị hóa đơn",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) =>
        `${totalAmount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })} VND`,
    },
    {
      title: "Chi tiết hóa đơn",
      dataIndex: "dishes",
      key: "dishes",
      render: (dishes) => {
        if (Array.isArray(dishes)) {
          const dishDetails = dishes
            .map((dish) => `${dish.dishName} x ${dish.quantity}`)
            .join(", ");
          return dishDetails;
        } else {
          return "";
        }
      },
    },
    {
      width: 200,
      title: "Nhân viên thanh toán",
      dataIndex: "employeeCode",
      key: "employeeCode",
      render: (code) => {
        if (Array.isArray(employees) && employees.find) {
          const employee = employees.find(
            (employee) => employee.employeeCode === code
          );
          return employee ? employee.fullname : "";
        } else {
          return "";
        }
      },
    },
    {
      width: 150,
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
      <section className="pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách hóa đơn
        </h4>
        <Table
          className="bg-white font-semibold text-sm leading-5 text-[#969696] drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)]"
          columns={columns}
          dataSource={bills}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default ReceiptsManager;
