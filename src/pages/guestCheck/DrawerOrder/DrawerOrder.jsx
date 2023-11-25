/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Drawer,
    Form,
    Input,
    InputNumber,
    Modal,
    Space,
    Table,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchMenus } from "../../../services/MenuServices";
import { fetchCreateBills } from "../../../services/billsServices";

const columnsMenuOrder = [
    {
        width: 100,
        title: "Tên món",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Loại món",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Giá",
        dataIndex: "total",
        key: "total",
        render: (text, record) => (
            <span>
                {record.total && typeof record.total === "number"
                    ? record.total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })
                    : record.total}
            </span>
        ),
    },
];

const columnsMenu = [
    {
        title: "Tên món",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Loại món",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        editable: true,
        render: (number) => (number > 0 ? number : "-"),
    },
    {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (text, record) => (
            <span>
                {record.price && typeof record.price === "number"
                    ? record.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })
                    : record.price}
            </span>
        ),
    },
];

function DrawerOrder(props) {
    const { isOpenOrder, closeOrder, selectedBooking } = props;

    const [form] = Form.useForm();
    const formRef = useRef();
    const [isModalMenu, setIsModalMenu] = useState(false);
    const [dataMenu, setDataMenu] = useState([]);
    const [selectedProductKeys, setSelectedProductKeys] = useState([]);
    const [tableData, setTableData] = useState([]);

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
    }, [selectedBooking]);

    const fetchMenuData = async () => {
        try {
            const response = await fetchMenus();
            if (response && response.data) {
                console.log(response?.data, 123123);
                const mappingData = (response?.data || []).map((item) => ({
                    ...item,
                    key: item?._id,
                }));
                setDataMenu(mappingData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);

    const EditableRow = ({ index, ...propsRow }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...propsRow} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log("Save failed:", errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `Vui lòng nhập ${title}.`,
                        },
                        {
                            type: "number",
                            min: 1,
                            max: +record?.quantity,
                            message: `Vui lòng nhập số lượng từ 1 đến ${record?.quantity}`,
                        },
                    ]}
                >
                    <InputNumber
                        ref={inputRef}
                        onPressEnter={save}
                        onBlur={save}
                    />
                </Form.Item>
            ) : (
                <div
                    className={
                        selectedProductKeys.includes(record?.key) &&
                        "editable-cell-value-wrap"
                    }
                    style={{ paddingRight: 24 }}
                    onClick={selectedProductKeys.includes(record?.key) && toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const EditableContext = React.createContext(null);

    const editColumns = columnsMenu.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const handleSave = (row) => {
        const newData = [...dataMenu];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataMenu(newData);
        setTableData(
            newData
                .filter((product) => selectedProductKeys.includes(product?._id))
                .map((item) => {
                    return {
                        ...item,
                        total: item?.quantity * item?.price,
                    };
                })
        );
    };

    const handleCreateBill = () => {

        const dataDishes = tableData.map((item) => {
            return {
                dishName: item.name,
                category: item.category,
                quantity: item.quantity,
                total: item.total,
            };
        });
        const dataBills = {
            totalAmount: dataDishes.reduce((accumulator, currentDish) => {
                return accumulator + currentDish.total;
            }, 0),
            fullName: form.getFieldValue(
                "fullName"
            ),
            phoneNumber: form.getFieldValue(
                "phoneNumber"
            ),
            employeeCode: form.getFieldValue(
                "employeeCode"
            ),
            idRestaurant: form.getFieldValue(
                "idRestaurant"
            ),
            dishes: [...dataDishes],
        };

        fetchCreateBills(dataBills);
        formRef.current.resetFields();
        closeOrder();
    };


    return (
        <div>
            <Drawer
                width={650}
                title="Thông tin order của khách hàng"
                open={isOpenOrder}
                onClose={closeOrder}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={handleCreateBill}
                            style={{
                                backgroundColor: "#35B968",
                                borderColor: "#35B968",
                                color: "#FFF",
                            }}
                        >
                            Tạo mới bill
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" initialValues={selectedBooking} ref={formRef}>
                    <div>
                        <div className="form-divide">
                            <div className="child-form">
                                <Form.Item label="Tên khách hàng" name="fullName">
                                    <Input disabled />
                                </Form.Item>
                            </div>
                            <div className="child-form">
                                <Form.Item label="Số điện thoại" name="phoneNumber">
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
                            <div className="child-form">
                                <Form.Item
                                    label="Mã nhà hàng"
                                    name="idRestaurant"
                                    initialValue={
                                        localStorage.getItem("user")
                                            ? JSON.parse(localStorage.getItem("user")).idRestaurant
                                            : ""
                                    }
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-divide">
                            <div className="child-form">
                                <Form.Item label="Món ăn" name="dishes">
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
                    dataSource={tableData}
                />
                <Button
                    style={{
                        marginTop: "10px",
                    }}
                >
                    Tổng tiền :{" "}
                </Button>
            </Drawer>
            <Modal
                title="Danh sách món ăn"
                width={600}
                open={isModalMenu}
                onCancel={closeModalMenu}
                onOk={closeModalMenu}
                okText="Xác nhận"
                cancelText="Hủy"
                centered
                className="modal-create"
            >
                <div>
                    <Table
                        className="main-table"
                        columns={editColumns}
                        dataSource={dataMenu}
                        pagination={false}
                        components={components}
                        rowSelection={{
                            columnWidth: 52,
                            hideSelectAll: true,
                            selectedRowKeys: selectedProductKeys,
                            onChange: (newSelectedRowKeys) => {
                                setSelectedProductKeys(newSelectedRowKeys);
                                setTableData(
                                    dataMenu
                                        .filter((product) =>
                                            newSelectedRowKeys.includes(product?._id)
                                        )
                                        .map((item) => {
                                            return {
                                                ...item,
                                                total: item?.quantity * item?.price,
                                            };
                                        })
                                );
                            },
                            onSelect: (record, selected) => {
                                if (!selected) {
                                    handleSave({
                                        ...record,
                                    });
                                }
                            },
                        }}
                        rowKey="key"
                        rowClassName={() => "editable-row"}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default DrawerOrder;
