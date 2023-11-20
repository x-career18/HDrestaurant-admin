import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import moment from 'moment';
import { Button, Table } from 'antd';

import { fetchBookings } from '../../services/BookingServices';

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
        // {
        //     width: 100,
        //     title: 'Thao tác',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status, record) => (
        //         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        //             <Button
        //                 onClick={() => handleConfirm(record)}
        //                 style={{ border: 'none', backgroundColor: '#438AFE', color: '#FFF', padding: '0 10px' }}
        //                 icon={<VerifiedUserOutlined />}
        //             >
        //                 Xác nhận
        //             </Button>
        //             <Button
        //                 type="danger"
        //                 onClick={() => handleDelete(record)}
        //                 style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', color: '#E92C2C', padding: '0 10px' }}
        //                 icon={<DeleteOutlined />}
        //             >
        //                 Xóa
        //             </Button>
        //         </div>
        //     )
        // },

    ];

    const [latestBookings, setLatestBookings] = useState([]);

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
        </main>
    )
}

export default GuestCheck