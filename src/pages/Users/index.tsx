import {
  Avatar,
  Button,
  Flex,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableProps,
  Typography,
} from "antd";
import {
  Profile2User,
  User as UserIcon,
  UserAdd,
  Copy,
  TickCircle,
  CloseCircle,
} from "iconsax-react";
import React, { useEffect } from "react";
import useUsersStore from "../../store/useUsersStore";
import { User } from "./User.type";
import dayjs from "dayjs";

const CopyIcon = () => <Copy size={18} style={{ transform: "translateY(4px)" }} />;

const Users: React.FC = () => {
  const { fetchUsers, users, loading } = useUsersStore();

  const popConfirmProps: PopconfirmProps = {
    title: "Delete the user",
    description: "Are you sure to delete this user?",
    okText: "Yes",
    cancelText: "No",
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value) => (
        <Flex align="center" gap={8}>
          <Avatar icon={<UserIcon size={20} />} />
          <span>{value}</span>
        </Flex>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (value) => (
        <Typography.Text copyable={{ icon: <CopyIcon /> }}>{value}</Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value) => (
        <Typography.Text copyable={{ icon: <CopyIcon /> }}>{value}</Typography.Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive) => (
        <Flex align="center" justify="center">
          {isActive ? (
            <TickCircle color="#24d164" variant="Bold" />
          ) : (
            <CloseCircle color="#F44336" variant="Bold" />
          )}
        </Flex>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (
        <Typography.Text>{dayjs(value).format("DD-MM-YYYY HH:mm:ss")}</Typography.Text>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => (
        <Typography.Text>{dayjs(value).format("DD-MM-YYYY HH:mm:ss")}</Typography.Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Flex align="center" justify="center" gap={8}>
          <Button type="primary">Edit</Button>
          <Popconfirm {...popConfirmProps}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []); //eslint-disable-line

  return (
    <div className="users">
      <div className="users-header">
        <div className="users-header-left">
          <Profile2User size={28} />
          <p className="users-header-title">Users</p>
        </div>
        <div className="users-header-right">
          <Button type="primary">
            <Flex gap={8}>
              <UserAdd size={20} />
              <span>Add User</span>
            </Flex>
          </Button>
        </div>
      </div>
      <div className="users-body">
        <Table bordered dataSource={users.items} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

export default Users;
