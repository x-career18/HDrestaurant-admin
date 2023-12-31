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
    message,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchMenus } from "../../../services/MenuServices";
import { fetchCreateBills, fetchGetBillsId, fetchGetBookingId, fetchUpdateBills } from "../../../services/billsServices";
import { deleteBooking } from "../../../services/BookingServices";

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
    const { isOpenOrder, closeOrder, selectedBooking, setLatestBookings } = props;

    const [form] = Form.useForm();
    const formRef = useRef();
    const [isModalMenu, setIsModalMenu] = useState(false);
    const [dataMenu, setDataMenu] = useState([]);
    const [selectedProductKeys, setSelectedProductKeys] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [billId, setBillId] = useState(null);

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

    useEffect(() => {
        if (isOpenOrder) {
            fetchBookingId();
        }
    }, [isOpenOrder]);

    const fetchBookingId = async () => {
        try {
            const response = await fetchGetBookingId(selectedBooking?._id);
            if (response && response.data) {
                setBillId(response.data._id);
                setTableData(response.data.dishes
                    .map((item) => {
                        return {
                            name: item.dishName,
                            category: item.category,
                            quantity: item.quantity,
                            total: item.total,
                        };
                    }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMenuData = async () => {
        try {
            const response = await fetchMenus();
            if (response && response.data) {
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
            bookingId: selectedBooking?._id,
        };

        fetchCreateBills(dataBills);
        formRef.current.resetFields();
        closeOrder();
        message.success("Tạo mới bill thành công!");
    };

    const handleUpdateBill = async () => {
        try {
            // Lấy thông tin của bill cần cập nhật
            const billResponse = await fetchGetBookingId(selectedBooking?._id);

            if (billResponse && billResponse.data) {
                const bill = billResponse.data;

                // Kiểm tra xem status của bill có phải là "active" không
                if (bill.status === "active") {
                    // Hiển thị thông báo cảnh báo khi status là "active"
                    message.warning("Không thể cập nhật bill với status là active!");
                    return;
                }

                // Tiếp tục xử lý cập nhật bill
                const dataDishes = tableData.map((item) => ({
                    dishName: item.name,
                    category: item.category,
                    quantity: item.quantity,
                    total: item.total,
                }));

                const dataBills = {
                    totalAmount: dataDishes.reduce((accumulator, currentDish) => accumulator + currentDish.total, 0),
                    fullName: form.getFieldValue("fullName"),
                    phoneNumber: form.getFieldValue("phoneNumber"),
                    employeeCode: form.getFieldValue("employeeCode"),
                    idRestaurant: form.getFieldValue("idRestaurant"),
                    dishes: [...dataDishes],
                    bookingId: selectedBooking?._id,
                    _id: billId,
                };

                // Gọi API để cập nhật bill
                const updateBillResponse = await fetchUpdateBills(billId, dataBills);

                if (updateBillResponse && updateBillResponse.data) {
                    message.success("Cập nhật bill thành công!");
                    closeOrder();
                }
            } else {
                message.error("Không thể lấy thông tin bill để cập nhật!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật bill:", error);
            message.error("Đã xảy ra lỗi khi cập nhật bill!");
        }
    };


    const handleDelete = async () => {
        try {
            // Lấy thông tin của bill cần xóa
            const billResponse = await fetchGetBillsId(billId);
            console.log(billResponse);

            if (billResponse && billResponse.data) {
                const bill = billResponse.data;

                // Kiểm tra xem status của bill có phải là active không
                if (bill.status === "active") {
                    // Lấy bookingId của bill
                    const bookingIdToDelete = bill.bookingId;

                    // Xóa booking nếu bookingId trùng khớp
                    const deleteBookingResponse = await deleteBooking(bookingIdToDelete);

                    if (deleteBookingResponse && deleteBookingResponse.data) {
                        message.success("Xóa booking thành công!");
                        setLatestBookings();
                        closeOrder();
                    }
                } else {
                    message.error("Không thể xóa booking vì status của bill không phải là active!");
                }
            } else {
                message.error("Không thể lấy thông tin bill để xóa booking!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa booking:", error);
            message.error("Đã xảy ra lỗi khi xóa booking!");
        }
    };

    const handleDeleteButton = () => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa booking và bill này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: () => handleDelete(),
        });
    };


    return (
        <div>
            <Drawer
                width={650}
                title={billId ? "Cập nhật bill" : "Tạo mới bill"}
                open={isOpenOrder}
                onClose={closeOrder}
                extra={
                    <Space>
                        <Button
                            type="primary"
                            onClick={billId ? handleUpdateBill : handleCreateBill}
                            style={{
                                backgroundColor: "#35B968",
                                borderColor: "#35B968",
                                color: "#FFF",
                            }}
                        >
                            {billId ? "Cập nhật" : "Tạo mới bill"}
                        </Button>
                        <Button
                            type="danger"
                            onClick={handleDeleteButton}
                            style={{
                                backgroundColor: "#FF4D4F",
                                borderColor: "#FF4D4F",
                                color: "#FFF",
                            }}
                        >
                            Xóa
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
                    Tổng tiền :
                    {tableData.map((item) => {
                        return {
                            total: item.total,
                        };
                    }).reduce((accumulator, currentDish) => {
                        return accumulator + currentDish.total;
                    }, 0) && typeof tableData.map((item) => {
                        return {
                            total: item.total,
                        };
                    }).reduce((accumulator, currentDish) => {
                        return accumulator + currentDish.total;
                    }, 0) === "number"
                        ? tableData.map((item) => {
                            return {
                                total: item.total,
                            };
                        }).reduce((accumulator, currentDish) => {
                            return accumulator + currentDish.total;
                        }, 0).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })
                        : tableData.map((item) => {
                            return {
                                total: item.total,
                            };
                        }).reduce((accumulator, currentDish) => {
                            return accumulator + currentDish.total;
                        }, 0)}
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
