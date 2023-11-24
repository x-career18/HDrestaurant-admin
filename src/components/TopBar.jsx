import { useEffect, useState, useRef, useContext } from "react";
import {
  FileTextOutlined,
  MailOutlined,
  NotificationOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/authContext/AuthContext";
import { fetchRestaurants } from "../services/RestaurantServices";
import { createReport } from "../services/ReportServices";
import { FloatButton, Form, message, Input, Modal, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const [myRestaurant, setMyRestaurant] = useState(null);

  const getMyRestaurant = async () => {
    try {
      const res = await fetchRestaurants();
      const matchingRestaurant = res.data.find(
        (restaurant) =>
          restaurant.idManager === user.id ||
          restaurant._id === user.restaurantId
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
  }, []);

  const [form] = Form.useForm();
  const formRef = useRef();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    formRef.current.resetFields();
    setOpen(false);
  };

  const handleCreateReport = async (values) => {
    try {
      const inputValues = {
        ...values,
        fullName: user.fullname,
        email: user.email,
      };
      const res = await createReport(inputValues);
      if (res && res.data) {
        message.success("Report sent.");
        formRef.current.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error("Create new report failed!");
    }
  };

  return (
    <main className="inline-flex w-full">
      <section className="w-80 h-24 bg-violet-500 inline-flex items-center justify-center gap-3">
        <img className="h-16" src="images/assets/icons/restaurant.svg" />
        <div>
          <h3
            className={`text-amber-200 font-waterBrush font-semibold ${
              user.role === "admin" ? "text-5xl" : "text-2xl"
            } drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
          >
            {user.role === "admin" ? "Xin Chào" : "Xin Chào,"}
          </h3>
          <h3 className="text-amber-200 font-waterBrush font-semibold text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {myRestaurant && myRestaurant.name}
          </h3>
        </div>
      </section>
      <section className="Second h-24 inline-flex grow items-center justify-between gap-3 px-8 py-6">
        <div className="w-96 h-14 inline-flex items-center gap-3 text-zinc-400 bg-zinc-100 px-4">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full font-beVietnam outline-none bg-transparent focus:text-black"
          />
        </div>
        <div className="inline-flex items-center gap-4 text-zinc-400">
          <MailOutlined className="cursor-pointer" />
          <NotificationOutlined className="cursor-pointer" />
          <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer" />
          <span className="text-gray-500 text-base font-bold font-beVietnam leading-tight">
            {user.fullname}
          </span>
        </div>

        {(user.role === "manager" || user.role === "employee") && (
          <FloatButton
            icon={<FileTextOutlined />}
            onClick={showModal}
            description="HELP"
            shape="square"
            className="right-28"
          />
        )}
        <Modal
          title="Report an issue"
          centered
          open={open}
          onCancel={handleCancel}
          onOk={() => form.submit()}
          footer={[
            <Button key="cancel">Hủy</Button>,
            <Button key="ok">Gửi</Button>,
          ]}
        >
          <Form
            form={form}
            onFinish={handleCreateReport}
            ref={formRef}
            layout="vertical"
          >
            <div>
              <Form.Item
                label="Tên nhân viên:"
                name="fullname"
                initialValue={user ? user.fullname : ""}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Email:"
                name="email"
                initialValue={user ? user.email : ""}
              >
                <Input disabled />
              </Form.Item>
            </div>
            <Form.Item
              label="Mô tả vấn đề bạn đang gặp phải:"
              name="message"
              rules={[
                { required: true, message: "Bắt buộc phải nhập mô tả vấn đề!" },
              ]}
            >
              <TextArea
                placeholder="Nhập mô tả..."
                style={{ resize: "none", height: 100 }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </main>
  );
};

export default TopBar;
