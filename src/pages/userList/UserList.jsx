import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Button, Form, Input, Modal, Table, message } from "antd";
import moment from "moment";
import {
  fetchUserManager,
  fetchUserUpdate,
  fetchUserDelete,
} from "../../services/UserSevices.jsx";
import "./UserList.scss";
import { SettingOutlined } from "@ant-design/icons";
import { fetchRestaurantAll } from "../../services/RestaurantServices.jsx";

const UserList = () => {
  const columns = [
    {
      title: "Tên Quản Lý",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Nhà Hàng",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        const restaurant = restaurants.find(
          (restaurant) => restaurant.idManager === _id
        );
        return restaurant ? restaurant.name : "";
      },
    },
    {
      width: 200,
      title: "Trạng Thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            type="primary"
            onClick={() => handleConfirm(record)}
            disabled={isActive}
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
            }}
          >
            Xóa
          </Button>
          <Button
            disabled={!isActive}
            onClick={() => openUpdateManager(record._id)}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <SettingOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();
  const formRef = useRef();
  const [data, setData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenUpdateManager, setIsOpenUpdateManager] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openUpdateManager = (userId) => {
    setIsOpenUpdateManager(true);
    setSelectedUserId(userId);
  };

  const closeUpdateManager = () => {
    setIsOpenUpdateManager(false);
  };

  const getManager = async () => {
    setLoading(true);
    try {
      const response = await fetchUserManager();
      if (response && response.data) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurants = async () => {
    try {
      const res = await fetchRestaurantAll();
      if (res && res.data) {
        setRestaurants(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManager();
    getRestaurants();
  }, []);

  const handleConfirm = async (record) => {
    try {
      const response = await fetchUserUpdate(record._id, { isActive: true });
      if (response && response.data) {
        getManager();
        message.success("Xác nhận thành công");
      }
    } catch (error) {
      console.log(error);
      message.error("Xác nhận thất bại");
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetchUserDelete(record._id);
      if (response && response.data) {
        getManager();
        message.success("Xóa thành công");
      }
    } catch (error) {
      console.log(error);
      message.error("Xóa thất bại");
    }
  };

  const handleUpdateManager = async (values) => {
    try {
      const response = await fetchUserUpdate(selectedUserId, values);
      if (response && response.data) {
        getManager();
        message.success("Cập nhật thành công");
        closeUpdateManager();
        formRef.current.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách quản lý
        </h4>
        <div style={{ width: "100%", height: "100%" }}>
          <Table
            className="main-table"
            columns={columns}
            dataSource={data}
            loading={loading}
          />
        </div>
      </section>
      <Modal
        title="Cập nhật thông tin quản lý"
        width={450}
        centered
        onCancel={closeUpdateManager}
        open={isOpenUpdateManager}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleUpdateManager(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okText="Cập nhật"
        cancelText="Hủy"
        className="modal-update"
      >
        <div>
          <Form layout="vertical" form={form} ref={formRef}>
            <div className="child-form">
              <Form.Item
                label="Tên Quản Lý"
                name="fullname"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Vui lòng nhập tên',
                //   },
                // ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </div>
            <div className="child-form">
              <Form.Item
                label="Email"
                name="email"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Vui lòng nhập email',
                //   },
                // ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </div>
            <div className="child-form">
              <Form.Item
                label="Số điện thoại"
                name="phonenumber"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Vui lòng nhập số điện thoại',
                //   },
                // ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </div>
            <div className="form-divide">
              <div className="child-form">
                <Form.Item
                  label="Mật khẩu cũ"
                  name="password"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Vui lòng nhập số điện thoại',
                  //   },
                  // ]}
                >
                  <Input type="password" placeholder="Nhập Mật Khẩu" />
                </Form.Item>
              </div>
              <div className="child-form">
                <Form.Item
                  label="Mật khẩu mới"
                  name="newPassword"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Vui lòng nhập số điện thoại',
                  //   },
                  // ]}
                >
                  <Input type="password" placeholder="Nhập Mật Khẩu Mới" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </main>
  );
};

export default UserList;
