import { Button, Checkbox, Drawer, Form, Input, InputNumber, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchMenus } from "../../../services/MenuServices";

const columnsMenuOrder = [
    {
        width: 100,
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
        render: (text, record) => (
            <InputNumber
                min={1}
                defaultValue={1}
            />
        )
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


function DrawerOrder(props) {
    const { isOpenOrder, closeOrder, selectedBooking } = props;

    const [form] = Form.useForm();
    const [isModalMenu, setIsModalMenu] = useState(false);
    const [dataMenu, setDataMenu] = useState([]);

    const openModalMenu = () => {
        setIsModalMenu(true);
    };

    const closeModalMenu = () => {
        setIsModalMenu(false);
    };

    useEffect(() => {
        if (selectedBooking) {
            form.setFieldsValue(selectedBooking);
        }
    }, [selectedBooking])

    const fetchMenuData = async () => {
        try {
            const response = await fetchMenus();
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
        <div>
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
                        pagination={false}
                    />
                </div>
            </Modal>
        </div>

    );
}

export default DrawerOrder;