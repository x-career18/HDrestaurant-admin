import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  message,
} from "antd";
import moment from "moment";
import "./TableBook.scss";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import {
  fetchBookings,
  fetchCreateBooking,
  updateBooking,
  deleteBooking,
} from "../../services/BookingServices";

function TableBooking() {
  const columns = [
    {
      width: 150,
      title: "Tên khách hàng",
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
      title: "Giờ đặt",
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
    {
      title: "Số lượng khách",
      dataIndex: "numberOfPeople",
      key: "numberOfPeople",
    },
    {
      title: "Ghi chú",
      dataIndex: "message",
      key: "message",
    },
    {
      width: 100,
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center gap-10">
          <span
            className={`w-20 text-center text-white p-1 rounded-3xl ${status === "pending" ? "bg-rose-500" : "bg-green-500"
              }`}
          >
            {status === "pending" ? "Pending" : "Active"}
          </span>
        </div>
      ),
    },
    {
      width: 100,
      title: "Thao tác",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            onClick={() => handleConfirm(record)}
            style={{
              border: "none",
              backgroundColor: "#438AFE",
              color: "#FFF",
              padding: "0 10px",
            }}
            icon={<CheckSquareOutlined />}
          >
            Xác nhận
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record)}
            style={{
              backgroundColor: "#FF3B3B1A",
              borderColor: "#E92C2C",
              color: "#E92C2C",
              padding: "0 10px",
            }}
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const [latestBookings, setLatestBookings] = useState([]);
  const [form] = Form.useForm();
  const formRef = useRef();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const dateFormatList = ["DD/MM/YYYY"];

  const showModal = () => {
    setIsOpenCreate(true);
  };

  const handleCancel = () => {
    setIsOpenCreate(false);
    formRef.current.resetFields();
  };

  const fetchData = async () => {
    try {
      const res = await fetchBookings();
      const employee = JSON.parse(localStorage.getItem("user"));
      const matchingBookings = res.data.filter(
        (booking) =>
          booking.restaurantId === employee.restaurantId &&
          booking.status === "pending"
      );

      setLatestBookings(matchingBookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = async (record) => {
    try {
      const employee = JSON.parse(localStorage.getItem("user"));
      console.log(employee);
      const response = await updateBooking(record._id, {
        employeeCode: employee.employeeCode,
        employeeName: employee.fullname,
        status: "active",
      });
      if (response && response.data) {
        message.success("Xác nhận thành công");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      message.error("Xác nhận thất bại");
    }
  };


  const handleDelete = async (record) => {
    try {
      const response = await deleteBooking(record._id);
      if (response && response.data) {
        message.success("Xóa thành công");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      message.error("Xóa thất bại");
    }
  };

  const handleCreateBooking = async (values) => {
    try {
      const employee = JSON.parse(localStorage.getItem("user"));
      const formattedValues = {
        ...values,
        restaurantId: employee.restaurantId,
        bookingTime: moment(values.bookingTime, "HH:mm").format("HH:mm"),
      };

      const response = await fetchCreateBooking(formattedValues);
      if (response && response.data) {
        message.success("Đặt bàn mới thành công");
        fetchData();
        setIsOpenCreate(false);
        formRef.current.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error("Đặt bàn mới thất bại");
    }
  };

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="pb-10 mx-10 mb-10">
        <div className="flex justify-between">
          <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
            Danh sách đặt bàn Online
          </h4>
          <Button
            onClick={showModal}
            style={{
              backgroundColor: "#35B968",
              borderColor: "#35B968",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PlusOutlined />
            Tạo bàn Offline
          </Button>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <Table
            className="main-table"
            columns={columns}
            dataSource={latestBookings}
          />
        </div>
      </section>
      <Modal
        title="Tạo mới đặt bàn offline"
        width={450}
        centered
        open={isOpenCreate}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText="Tạo mới"
        cancelText="Hủy"
        className="modal-create"
      >
        <div>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleCreateBooking}
            ref={formRef}
          >
            <div className="form-divide">
              <div className="child-form">
                <Form.Item
                  label="Tên khách hàng"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên khách hàng" />
                </Form.Item>
              </div>
              <div className="child-form">
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    {
                      pattern:
                        /^(0?)(3[2-9]|5[2|5|6|8]|7[0|6-9]|8[0-9]|9[0-4|6-8])[0-9]{7}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </div>
            </div>
            <div className="form-divide">
              <div className="child-form">
                <Form.Item
                  label="Ngày đặt bàn"
                  name="bookingDate"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày đặt bàn",
                    },
                  ]}
                >
                  <DatePicker format={dateFormatList} />
                </Form.Item>
              </div>
              <div className="child-form">
                <Form.Item
                  label="Giờ đặt bàn"
                  name="bookingTime"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giờ đặt bàn",
                    },
                  ]}
                >
                  <input type="time" className="booking-time" />
                </Form.Item>
              </div>
            </div>
            <div className="form-divide">
              <div className="child-form">
                <Form.Item
                  label="Số lượng khách"
                  name="numberOfPeople"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số lượng khách",
                    },
                  ]}
                >
                  <InputNumber placeholder="Nhập số lượng khách" />
                </Form.Item>
              </div>
              <div className="child-form">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                    {
                      validator: (_, value) => {
                        if (
                          !value ||
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Invalid email address");
                      },
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </div>
            </div>
            <div className="form-divide">
              <div className="child-form">
                <Form.Item label="Ghi chú" name="message">
                  <Input placeholder="Nhập ghi chú" />
                </Form.Item>
              </div>
              <div>
                <div className="child-form">
                  <Form.Item
                    label="Mã nhà hàng"
                    name="restaurantId"
                    initialValue={
                      localStorage.getItem("user")
                        ? JSON.parse(localStorage.getItem("user")).restaurantId
                        : ""
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </main>
  );
}

export default TableBooking;
