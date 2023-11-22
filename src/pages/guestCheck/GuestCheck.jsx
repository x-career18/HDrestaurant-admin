import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import moment from 'moment';
import { Button, Checkbox, Drawer, Form, Input, Modal, Table } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { fetchBookings } from '../../services/BookingServices';
import './GuestCheck.scss'
import { fetchMenus } from '../../services/MenuServices';

function GuestCheck() {

    const columns = [
        {
            width: 150,
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
            title: 'Ngày đặt bàn',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (text) => moment(text).format("DD/MM/YYYY"),
        },
        {
            title: 'Giờ đặt',
            dataIndex: 'bookingTime',
            key: 'bookingTime',
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'numberOfPeople',
            key: 'numberOfPeople',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'message',
            key: 'message',
        },
        {
            width: 100,
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div className="flex items-center gap-10">
                    <span
                        className={`w-20 text-center text-white p-1 rounded-3xl ${status === "pending" ? "bg-rose-500" : "bg-green-500"}`}
                    >
                        {status === "pending" ? "Pending" : "Active"}
                    </span>
                </div>
            ),
        },
        {
            width: 100,
            title: 'Thao tác',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Button
                        onClick={() => openOrder(record)}
                        style={{ border: '#6A707E', backgroundColor: '#FFF', color: '#6A707E', padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                        <SettingOutlined />
                    </Button>
                    <Button
                        type="danger"
                        style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', color: '#E92C2C', padding: '0 10px' }}
                    >
                        Xóa
                    </Button>
                </div>
            )
        },

    ];

    const columnsMenu = [
        {
            title: '',
            key: 'select',
            width: 50,
            render: (record) => (
                <Checkbox />
            ),
        },
        {
            title: 'Tên món',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại món',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (text, record) => (
                <span>
                    {record.discount && typeof record.discount === 'number'
                        ? record.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        : record.discount}
                </span>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <span>
                    {record.price && typeof record.price === 'number'
                        ? record.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        : record.price}
                </span>
            ),
        },
    ];

    const columnsMenuOrder = [
        {
            title: 'Tên món',
            dataIndex: 'dishName',
            key: 'dishName',
        },
        {
            title: 'Loại món',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (text, record) => (
                <span>
                    {record.discount && typeof record.discount === 'number'
                        ? record.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        : record.discount}
                </span>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => (
                <span>
                    {record.price && typeof record.price === 'number'
                        ? record.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                        : record.price}
                </span>
            ),
        },
    ];

    const [latestBookings, setLatestBookings] = useState([]);
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const [isModalMenu, setIsModalMenu] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [dataMenu, setDataMenu] = useState([]);
    const [form] = Form.useForm();

    const openOrder = (record) => {
        setSelectedBooking(record);
        setIsOpenOrder(true);
    };

    useEffect(() => {
        if (selectedBooking) {
            form.setFieldsValue(selectedBooking);
        }
    }, [selectedBooking]);

    const closeOrder = () => {
        setIsOpenOrder(false);
    };

    const openModalMenu = () => {
        setIsModalMenu(true);
    };

    const closeModalMenu = () => {
        setIsModalMenu(false);
    };

    const fetchData = async () => {
        try {
            const res = await fetchBookings();
            const employee = JSON.parse(localStorage.getItem("user"));
            const matchingBookings = res.data.filter(
                (booking) => booking.restaurantId === employee.restaurantId && booking.status === "active"
            );

            setLatestBookings(matchingBookings);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchMenuData = async () => {
        try {
            const response = await fetchMenus();
            console.log(response);
            if (response && response.data) {
                setDataMenu(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);

    return (
        <main className="bg-slate-100 grow h-screen flex flex-col">
            <BreadCrumb />
            <section className="flex flex-col pb-10 mx-10 mb-10">
                <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
                    Check book
                </h4>
                <Table
                    className="main-table"
                    columns={columns}
                    dataSource={latestBookings}
                />
            </section>
            <Drawer
                width={650}
                title="Thông tin order của khách hàng"
                open={isOpenOrder}
                onClose={closeOrder}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={selectedBooking}
                >
                    <div>
                        <div className="form-divide">
                            <div className="child-form">
                                <Form.Item
                                    label="Tên khách hàng"
                                    name="fullName"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                            <div className="child-form">
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-divide">
                            <div className="child-form">
                                <Form.Item
                                    label="Mã nhân viên"
                                    name="employeeCode"
                                    initialValue={
                                        localStorage.getItem("user")
                                            ? JSON.parse(localStorage.getItem("user")).employeeCode
                                            : ""
                                    }
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-divide">
                            <div className="child-form">
                                <Form.Item
                                    label="Món ăn"
                                    name="dishes"
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: "#35B968",
                                            borderColor: "#35B968",
                                            color: "#FFF",
                                        }}
                                        onClick={openModalMenu}
                                    >
                                        Thêm món ăn
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
                <Table
                    className="main-table"
                    columns={columnsMenuOrder}
                />
            </Drawer>
            <Modal
                title="Danh sách món ăn"
                width={600}
                open={isModalMenu}
                onCancel={closeModalMenu}
                okText="Xác nhận"
                cancelText="Hủy"
                centered
                className="modal-create"
            >
                <div>
                    <Table
                        className="main-table"
                        columns={columnsMenu}
                        dataSource={dataMenu}
                    />
                </div>
            </Modal>
        </main>
    )
}

export default GuestCheck