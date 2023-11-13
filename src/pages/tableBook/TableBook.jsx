import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Button, Popconfirm, Table } from 'antd'
import moment from "moment";
import { Add, DeleteOutlined, VerifiedUserOutlined, } from '@material-ui/icons'
import { fetchBookings } from '../../services/BookingServices'

function TableBooking() {

    const renderActions = (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button
                // onClick={() => showModal(record)}
                style={{ border: 'none', backgroundColor: '#438AFE', color: '#FFF', padding: '0 10px' }}
                icon={<VerifiedUserOutlined />}
            >
                Xác nhận
            </Button>
            <Popconfirm
                title="Bạn có chắc muốn xóa đặt bàn này không?"
                // onConfirm={() => handleDelete(record)}
                okText="Có"
                cancelText="Không"
            >
                <Button
                    type="danger"
                    style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', color: '#E92C2C', padding: '0 10px' }}
                    icon={<DeleteOutlined />}
                >
                    Xóa
                </Button>
            </Popconfirm>
        </div>
    );

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
            render: (pending) => (
                <div className="flex items-center gap-10">
                    <span
                        className={`w-20 text-center text-white p-1 rounded-3xl ${pending ? "bg-rose-500" : "bg-green-500"
                            }`}
                    >
                        {pending ? "Pending" : "Active"}
                    </span>
                </div>
            ),
        },
        {
            width: 100,
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: renderActions,
        },

    ];
    const [latestBookings, setLatestBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchBookings();
                const employee = JSON.parse(localStorage.getItem("user"));
                console.log('Employee:', employee);
                const matchingBookings = res.data.filter(
                    (booking) => booking.restaurantId === employee.restaurantId
                );

                const sortedBookings = matchingBookings.sort((a, b) =>
                    moment(b.bookingTime).diff(moment(a.bookingTime))
                );

                setLatestBookings(sortedBookings.slice(0, 10));

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <main className="bg-slate-100 grow h-screen flex flex-col">
            <BreadCrumb />
            <section className="pb-10 mx-10 mb-10">
                <div className="flex justify-between">
                    <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
                        Danh sách đặt bàn Online
                    </h4>
                    <Button
                        style={{ backgroundColor: '#35B968', borderColor: '#35B968', color: '#FFF', display: 'flex', alignItems: 'center' }}>
                        <Add />
                        Tạo bàn Offline
                    </Button>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <Table
                        className="main-table"
                        columns={columns}
                        dataSource={latestBookings}
                    />
                </div>
            </section>
        </main>
    )
}

export default TableBooking