import { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Button, Table, message, Modal } from "antd";
import moment from "moment";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import {
  deleteReport,
  getReports,
  updateReport,
} from "../../services/ReportServices";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getReports();
      if (res && res.data) {
        setReports(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  const truncateText = (text) => {
    if (text.length <= 30) {
      return text;
    }
    return text.slice(0, 30) + "...";
  };

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
      render: (text, record) => (
        <div onClick={() => showModal(record)}>{truncateText(text)}</div>
      ),
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
            type="primary"
            onClick={() => handleConfirm(record)}
            className="border-none bg-blue-500 text-white px-4"
            disabled={status === "resolved"}
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách báo cáo của nhân viên
        </h4>
        <Table
          className="main-table bg-white font-semibold text-sm leading-5 text-[#969696] drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)]"
          columns={columns}
          dataSource={reports}
          loading={loading}
        />
      </section>
      <Modal
        title="Chi tiết báo cáo"
        centered
        className="my-8"
        open={open}
        onCancel={hideModal}
        footer={false}
      >
        {modalContent}
      </Modal>
    </main>
  );
};

export default ReportList;
