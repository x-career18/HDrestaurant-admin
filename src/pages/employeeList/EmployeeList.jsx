import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Button, Form, Input, Modal, Table, message } from 'antd'
import moment from 'moment';
import { fetchUserEmployee, fetchUserUpdate, fetchUserDelete } from '../../services/UserSevices.jsx'
import './EmployeeList.scss'
import { SettingOutlined } from '@ant-design/icons';

const EmployeeList = () => {
  const columns = [
    {
      title: 'Tên Nhân Viên',
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
      render: (text) => moment(text).format('DD/MM/YYYY')
    },
    {
      width: 200,
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
            style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', color: '#E92C2C' }}
          >
            Xóa
          </Button>
          <Button
            disabled={!isActive}
            onClick={() => openUpdateManager(record._id)}
            style={{ border: 'none', backgroundColor: 'transparent' }}
          >
            <SettingOutlined />
          </Button>
        </div>
      ),
    },
  ]

  const [form] = Form.useForm()
  const formRef = useRef();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpenUpdateManager, setIsOpenUpdateManager] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openUpdateManager = (userId) => {
    setIsOpenUpdateManager(true)
    setSelectedUserId(userId);
  }

  const closeUpdateManager = () => {
    setIsOpenUpdateManager(false)
  }

  const getEmployee = async () => {
    setLoading(true)
    try {
      const res = await fetchUserEmployee()
      if (res && res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEmployee()
  }, [])

  const handleConfirm = async (record) => {
    try {
      const res = await fetchUserUpdate(record._id, { isActive: true });
      if (res && res.data) {
        getEmployee()
        message.success("Xác nhận thành công");
      }
    } catch (error) {
      console.log(error)
      message.error("Xác nhận thất bại");
    }
  }

  const handleDelete = async (record) => {
    try {
      const res = await fetchUserDelete(record._id);
      if (res && res.data) {
        getEmployee()
        message.success("Xóa thành công");
      }
    } catch (error) {
      console.log(error)
      message.error("Xóa thất bại");
    }
  }

  const handleUpdateManager = async (values) => {
    try {
      const response = await fetchUserUpdate(selectedUserId, values);
      if (response && response.data) {
        getEmployee()
        message.success("Cập nhật thành công");
        closeUpdateManager();
        formRef.current.resetFields();
      }
    } catch (error) {
      console.log(error)
      message.error("Cập nhật thất bại");
    }
  }

  return (
    <main className="bg-slate-100 grow h-screen flex flex-col">
      <BreadCrumb />
      <section className="flex flex-col pb-10 mx-10 mb-10">
        <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
          Danh sách nhân viên
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
      <Modal
        title="Cập nhật thông tin nhân viên"
        width={450}
        centered
        onCancel={closeUpdateManager}
        open={isOpenUpdateManager}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleUpdateManager(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })

        }}
        okText="Cập nhật"
        cancelText="Hủy"
        className="modal-update"
      >
        <div>
          <Form layout="vertical" form={form} ref={formRef} >
            <div className="child-form">
              <Form.Item
                label="Tên Nhân Viên"
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
  )
}

export default EmployeeList