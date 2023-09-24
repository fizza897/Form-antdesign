import React from "react";
import "antd/dist/reset.css";
import { Table } from "antd";

function Pratice() {
  const dataSource = [
    {
      key: "1",
      userName: "fizza",
      lastName: "azam",
      emails: "fiz6@gmail.com",
      age: "19",
      password: "",
    },
    {
      key: "2",
      userName: "merium",
      lastName: "azam",
      emails: "merium@gmail.com",
      age: "23",
      password: "",
    },
    {
      key: "3",
      userName: "asma",
      lastName: "sheikh",
      emails: "asmasheikh@gmail.com",
      age: "",
      password: "",
    },
  ];
  const columns = [
      {
          title:"firstName",
          dataIndex:"userName"
      },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];
  return (
    <>
      <div style={{ display: "block", width: "700px", padding: "30" }}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}
export default Pratice;
