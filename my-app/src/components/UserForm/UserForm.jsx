import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/reset.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const UserForm = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const showModal = (index) => {
    setIsModalVisible(true);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingIndex(null);
  };

  const handleSave = (values) => {
    setIsModalVisible(false);
    console.log("values............", values);
  
    if (editingIndex !== null) {
      const updatedData = [...dataSource];
      const editedItemIndex = updatedData.findIndex(
        (item) => item.id === editingIndex
      );
      if (editedItemIndex !== -1) {
        updatedData[editedItemIndex] = values;
        setDataSource(updatedData);
        setEditingIndex(null);
      }
    } else {
      setDataSource([...dataSource, values]);
      setEditingIndex(null);
    }
  };
  const handleDelete = (index) => {
    const updatedData = [...dataSource];
    updatedData.splice(index, 1);
    setDataSource(updatedData);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => (
        <span>
          <Button type="primary" onClick={() => showModal(index)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(index)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)}>
        OPEN Form
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editingIndex !== null ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Formik
          initialValues={
            editingIndex !== null
              ? {
                  firstName: dataSource[editingIndex].firstName,
                  lastName: dataSource[editingIndex].lastName,
                  email: dataSource[editingIndex].email,
                }
              : {
                  firstName: "",
                  lastName: "",
                  email: "",
                }
          }
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, {setSubmitting}) => {
            console.log("values....", values);
            handleSave(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field type="text" name="firstName" as={Input} />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" as={Input} />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" as={Input} />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UserForm;
