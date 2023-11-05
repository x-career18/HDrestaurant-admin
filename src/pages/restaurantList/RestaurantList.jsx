import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { fetchRestaurantAll, fetchUpdateRestaurant, fetchDeleteRestaurant } from "../../services/RestaurantServices";
import { DEFAULT_IMAGE } from '../../constant'
import { Button, Table } from 'antd';
import moment from 'moment';
import './RestaurantList.css'

const RestaurantList = () => {

  const columns = [
    {
      width: 100,
      title: ' ',
      dataIndex: 'image',
      key: 'image',
      render: (avatar) => (
        <img
          src={avatar || DEFAULT_IMAGE} alt="avatar" style={{ width: 50, height: 32, borderRadius: 4 }} onError={(e) => {
            e.target.src = DEFAULT_IMAGE
          }}
        />
      ),
    },
    {
      title: 'Tên nhà hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => moment(text).format('DD/MM/YYYY')
    },
    {
      width: 400,
      title: 'ID Restaurant',
      dataIndex: 'idRestaurant',
      key: 'idRestaurant',
    },
    {
      width: 200,
      title: 'Trạng thái',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleConfirm(record)}
            disabled={isVerified}
          >
            Xác nhận
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record)}
            disabled={isVerified}
            style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', marginLeft: 10, color: '#E92C2C' }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  const handleConfirm = async (record) => {
    try {
      const response = await fetchUpdateRestaurant(record.id, { isVerified: true });
      if (response.status === 200) {
        message.success("Xác nhận thành công");
        getAllRestaurant(); // Tải lại dữ liệu sau khi xác nhận
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
      message.error("Xác nhận thất bại");
    }
  }

  const handleDelete = async (record) => {
    try {
      const response = await fetchDeleteRestaurant(record.id);
      if (response.status === 200) {
        message.success("Xóa thành công");
        getAllRestaurant(); // Tải lại dữ liệu sau khi xóa
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      message.error("Xóa thất bại");
    }
  }


  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const getAllRestaurant = async () => {
    try {
      setLoading(true)
      const response = await fetchRestaurantAll()
      if (response && response?.data) {
        setData(response?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllRestaurant()
  }, [])

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          List of Restaurants
        </h4>
        <div style={{ width: '100%', height: '100%' }}>
          <Table
            className="main-table"
            columns={columns}
            dataSource={data}
            loading={loading}
          />
        </div>
      </section>
    </main>
  );
};

export default RestaurantList;
