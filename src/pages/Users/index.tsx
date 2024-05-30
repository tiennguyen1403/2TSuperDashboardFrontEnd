import { Button, Flex, Table } from "antd";
import { Profile2User, UserAdd } from "iconsax-react";
import React, { useEffect } from "react";
import useUsersStore from "../../store/useUsersStore";

const Users: React.FC = () => {
  const { fetchUsers, users }: any = useUsersStore();

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("users :>> ", users);

  return (
    <div className="users">
      <div className="users-header">
        <div className="users-header-left">
          <Profile2User size={28} />
          <p className="users-header-title">Users</p>
        </div>
        <div className="users-header-right">
          <Button type="primary" size="large">
            <Flex gap={8}>
              <UserAdd />
              <span>Add User</span>
            </Flex>
          </Button>
        </div>
      </div>
      <div className="users-body">
        <Table bordered dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default Users;
