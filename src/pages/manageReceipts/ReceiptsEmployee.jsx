import { Button, Form, Modal, Table } from "antd"
import React, { useEffect, useState } from "react"
import BreadCrumb from "../../components/BreadCrumb"
import moment from "moment"
import { fetchBills, fetchUpdateBills } from "../../services/billsServices.jsx"

const ReceiptsEmployee = () => {

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Giờ tạo bill',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format("DD/MM/YYYY" + " " + "HH:mm"),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text, record) => (
        <span>
          {record.totalAmount && typeof record.totalAmount === "number"
            ? record.totalAmount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
            : record.totalAmount}
        </span>
      ),
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
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (action, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            onClick={openModal}
            style={{
              backgroundColor: "#35B968",
              borderColor: "#35B968",
              color: "#FFF",
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            Xác nhận
          </Button>
          <Button
            type="danger"
            style={{
              backgroundColor: "#FF3B3B1A",
              borderColor: "#E92C2C",
              color: "#E92C2C",
              padding: "0 10px",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },

  ]

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalPay, setIsModalPay] = useState(false);

  const openModal = () => {
    setIsModalPay(true);
  }

  const closeModal = () => {
    setIsModalPay(false);
  };

  const fetchData = async () => {
    try {
      const res = await fetchBills();
      const employee = JSON.parse(localStorage.getItem("user"));
      const bills = res.data.filter((bill) => bill.employeeCode === employee.employeeCode);
      const billsNotPaid = bills.filter((bill) => bill.status === "pending");
      setData(billsNotPaid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách hóa đơn chưa thanh toán
        </h4>
        <Table
          className="main-table"
          columns={columns}
          dataSource={data}
        />
      </section>
      <Modal
        title="Vui lòng chọn phương thức thanh toán"
        width={450}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        className="modal-create"
        open={isModalPay}
        onCancel={closeModal}
      >
        <div>
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán!",
                },
              ]}
            >
              <select
                className="w-full p-2 rounded-md border border-gray-300"
                style={{ outline: "none" }}
              >
                <option value="cash">Tiền mặt</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </main>
  )
}

export default ReceiptsEmployee