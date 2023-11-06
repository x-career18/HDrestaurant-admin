import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Button, Table, message } from 'antd'
import moment from 'moment';
import { fetchUserManager, fetchUserUpdate, fetchUserDelete } from '../../services/UserSevices.jsx'
import './UserList.css'

const UserList = () => {
  const columns = [
    {
      title: 'Tên Người Dùng',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => moment(text).format('DD/MM/YYYY')
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <div>
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
            disabled={isActive}
            style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', marginLeft: 10, color: '#E92C2C' }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getManager = async () => {
    setLoading(true)
    try {
      const response = await fetchUserManager()
      if (response && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getManager()
  }, [])

  const handleConfirm = async (record) => {
    try {
      const response = await fetchUserUpdate(record._id, { isActive: true });
      if (response && response.data) {
        getManager();
      }
    } catch (error) {
      console.log(error)
      message.error("Xác nhận thất bại");
    }
  }

  const handleDelete = async (record) => {
    try {
      const response = await fetchUserDelete(record._id);
      if (response && response.data) {
        getManager();
      }
    } catch (error) {
      console.log(error)
      message.error("Xóa thất bại");
    }
  }

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách quản lý
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
  )
}

export default UserList