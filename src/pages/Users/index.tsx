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
import React, { useEffect, useState } from "react";
import useUsersStore from "../../store/useUsersStore";
import { User, UserDto } from "./User.type";
import dayjs from "dayjs";
import CommonModal from "./partials/CommonModal";
import _ from "lodash";
import { initialValues } from "./constants";
import { ELoading, ModalType } from "src/helpers/constants";

const CopyIcon = () => <Copy size={18} style={{ transform: "translateY(4px)" }} />;

const { FETCH, CREATE, UPDATE } = ELoading;

const Users: React.FC = () => {
  const { fetchUsers, fetchUserDetail, addUser, updateUser, deleteUser, users, loadingStates } =
    useUsersStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);
  const [userDto, setUserDto] = useState<UserDto>(initialValues);

  const openCreateModal = () => {
    setIsOpenModal(true);
    setUserDto(initialValues);
    setModalType(ModalType.CREATE);
  };

  const openUpdateModal = async (uid: string) => {
    try {
      const user = await fetchUserDetail(uid);
      setUserDto(user as UserDto);
      setIsOpenModal(true);
      setModalType(ModalType.UPDATE);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setUserDto(initialValues);
    setModalType(ModalType.DEFAULT);
  };

  const handleCreateUser = async (values: UserDto) => {
    try {
      const payload = _.omit(values, ["confirmPassword"]);
      console.log("payload :>> ", payload);
      // await addUser(payload);
      // closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleUpdateUser = async (values: UserDto) => {
    try {
      const payload = _.omit(values, ["confirmPassword"]);
      console.log("payload :>> ", payload);
      // await updateUser({ ...payload, id: userDto.id });
      // closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRemoveUser = (uid: string) => {
    try {
      deleteUser(uid);
      closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

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
      render: (_, record) => (
        <Flex align="center" justify="center" gap={8}>
          <Button type="primary" onClick={() => openUpdateModal(record.id)}>
            Edit
          </Button>
          <Popconfirm {...popConfirmProps} onConfirm={() => handleRemoveUser(record.id)}>
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
    <>
      <div className="users">
        <div className="users-header">
          <div className="users-header-left">
            <Profile2User size={28} />
            <p className="users-header-title">Users</p>
          </div>
          <div className="users-header-right">
            <Button type="primary" onClick={openCreateModal}>
              <Flex gap={8}>
                <UserAdd size={20} />
                <span>Add User</span>
              </Flex>
            </Button>
          </div>
        </div>
        <div className="users-body">
          <Table
            bordered
            columns={columns}
            dataSource={users.items}
            loading={loadingStates.includes(FETCH)}
          />
        </div>
      </div>
      <CommonModal
        userDto={userDto}
        open={isOpenModal}
        modalType={modalType}
        onCancel={closeModal}
        onSubmit={modalType === ModalType.CREATE ? handleCreateUser : handleUpdateUser}
        okText={modalType === ModalType.CREATE ? "Create" : "Update"}
        title={modalType === ModalType.CREATE ? "Create User" : "Update User"}
        loading={loadingStates.includes(ModalType.CREATE ? CREATE : UPDATE)}
      />
    </>
  );
};

export default Users;
