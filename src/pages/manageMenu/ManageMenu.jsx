import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import { Add, DeleteOutlined, SettingsOutlined } from '@material-ui/icons';
import { Popconfirm } from 'antd';
import { fetchMenus, fetchCreateMenus, fetchUpdateMenus, fetchDeleteMenus } from '../../services/MenuServices.jsx'
import './ManageMenu.scss'

const ManageMenu = () => {

  const renderActions = (text, record) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Popconfirm
        title="Bạn có chắc muốn xóa món này không?"
        onConfirm={() => handleDelete(record)}
        okText="Có"
        cancelText="Không"
      >
        <Button
          type="danger"
          style={{ backgroundColor: '#FF3B3B1A', borderColor: '#E92C2C', color: '#E92C2C' }}
          icon={<DeleteOutlined />}
        >
          Xóa
        </Button>
      </Popconfirm>
      <Button
        onClick={() => showModal(record)}
        style={{ border: 'none', backgroundColor: '#438AFE', color: '#FFF' }}
        icon={<SettingsOutlined />}
      >
        Cập nhật
      </Button>
    </div>
  );

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
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
      width: 100,
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: renderActions,
    },
  ]
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const formRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (currentRecord) {
        // Nếu currentRecord tồn tại, thực hiện cập nhật thông tin menu
        await fetchUpdateMenus(currentRecord._id, values);
        message.success('Cập nhật thành công');
      } else {
        // Ngược lại, thêm một bản ghi mới
        const response = await fetchCreateMenus(values);
        if (response && response.data) {
          message.success('Thêm mới thành công');
        }
      }

      setIsModalVisible(false);
      fetchMenuData();
      formRef.current.resetFields();
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetchDeleteMenus(record._id);
      message.success('Xóa thành công');
      fetchMenuData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchMenuData = async () => {
    try {
      const response = await fetchMenus();
      if (response && response.data) {
        setData(response.data);
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
      <section className="pb-10 mx-10 mb-10">
        <div className="flex justify-between">
          <h4 className="text-neutral-600 text-xl font-bold font-beVietnam leading-10">
            Danh sách các món
          </h4>
          <Button
            onClick={() => showModal(null)}
            style={{ backgroundColor: '#35B968', borderColor: '#35B968', color: '#FFF', display: 'flex', alignItems: 'center' }}>
            <Add />
            Thêm món mới
          </Button>
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <Table
            className="main-table"
            columns={columns}
            dataSource={data}
          />
        </div>
      </section>
      <Modal
        title={currentRecord ? 'Cập nhật món ăn' : 'Thêm mới món ăn'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" ref={formRef}>
          <Form.Item
            label="Tên món"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập Tên món!' }]}>
            <Input placeholder='Vui lòng nhập tên món' />
          </Form.Item>
          <Form.Item
            label="Loại món"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn Loại món!' }]}
          >
            <Select>
              <Option value="Món ăn">Món ăn</Option>
              <Option value="Đồ uống">Đồ uống</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input placeholder='Vui lòng nhập mô tả' />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập Giá!' }]}>
            <Input
              type="number"
              placeholder='Vui lòng nhập giá' />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount">
            <Input
              type="number"
              placeholder='Vui lòng nhập giảm giá' />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  )
}

export default ManageMenu