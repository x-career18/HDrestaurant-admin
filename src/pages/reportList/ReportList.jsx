import { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Button, Table, message } from "antd";
import moment from "moment";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  deleteReport,
  getReports,
  updateReport,
} from "../../services/ReportServices";

const ReportList = () => {
  const columns = [
    {
      width: 150,
      title: "Tên nhân viên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      width: 150,
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      width: 150,
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      width: 200,
      title: "Mô tả vấn đề",
      dataIndex: "message",
      key: "message",
    },
    {
      width: 150,
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center justify-center">
          <span
            className={`w-20 text-center text-white p-1 rounded-3xl ${
              status === "pending" ? "bg-rose-500" : "bg-green-500"
            }`}
          >
            {status === "pending" ? "Pending" : "Resolved"}
          </span>
        </div>
      ),
    },
    {
      width: 150,
      title: "Thao tác",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => handleConfirm(record)}
            className="border-none bg-blue-500 text-white px-4"
            icon={<CheckSquareOutlined />}
          >
            Xác nhận
          </Button>
          <Button
            type="danger"
            className="bg-red-200 border border-red-500 text-red-500 px-4"
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [reports, setReports] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getReports();
      if (res && res.data) {
        setReports(res.data);
        console.log(reports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (record) => {
    try {
      const res = await updateReport(record._id, { status: "resolved" });
      if (res && res.data) {
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
      const res = await deleteReport(record._id);
      if (res && res.data) {
        message.success("Xóa thành công");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      message.error("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="pb-10 mx-10 mb-10">
        <div className="flex justify-between">
          <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
            Danh sách báo cáo của nhân viên
          </h4>
        </div>
        <div className="w-full h-full">
          <Table
            className="main-table"
            columns={columns}
            dataSource={reports}
          />
        </div>
      </section>
    </main>
  );
};

export default ReportList;
