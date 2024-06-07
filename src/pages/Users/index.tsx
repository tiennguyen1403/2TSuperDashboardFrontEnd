import React, { useEffect, useState } from "react";

//Type Import
import { User, UserDto } from "./User.type";
import type { PopconfirmProps, TableProps } from "antd";
import { ELoading, ModalType, Pagination } from "src/generalTypes";

//Hook Import
import useUsersStore from "../../store/useUsersStore";

//Component Import
import CommonModal from "./partials/CommonModal";
import {
  Profile2User,
  User as UserIcon,
  UserAdd,
  Copy,
  TickCircle,
  CloseCircle,
} from "iconsax-react";
import { Avatar, Button, Flex, Popconfirm, Table, Typography } from "antd";

//Helper and Library Import
import _ from "lodash";
import dayjs from "dayjs";
import { convertImagUrlToUploadItem, convertStringToDay } from "src/helpers/utilities";

//Constants Import
import { initialValues } from "./constants";
import { defaultPagination } from "src/helpers/constants";

const CopyIcon = () => <Copy size={18} style={{ transform: "translateY(4px)" }} />;
const { FETCH, CREATE, UPDATE } = ELoading;

const Users: React.FC = () => {
  const { fetchUsers, addUser, updateUser, deleteUser, users, loadingStates } = useUsersStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);
  const [userDto, setUserDto] = useState<UserDto>(initialValues);
  const [pagination] = useState<Pagination>(defaultPagination);

  const openCreateOrUpdateModal = (user?: User) => {
    if (_.isEmpty(user)) {
      setIsOpenModal(true);
      setUserDto(initialValues);
      setModalType(ModalType.CREATE);
    } else {
      const avatar = convertImagUrlToUploadItem(user.avatar);
      const createdAt = convertStringToDay(user.createdAt);
      const updatedAt = convertStringToDay(user.updatedAt);
      const userDto = { ...user, avatar, createdAt, updatedAt };

      setUserDto(userDto);
      setIsOpenModal(true);
      setModalType(ModalType.UPDATE);
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
      await addUser(payload);
      fetchUsers(pagination);
      closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleUpdateUser = async (values: UserDto) => {
    try {
      const payload = _.omit(values, ["confirmPassword"]);
      await updateUser({ ...payload, id: userDto.id });
      fetchUsers(pagination);
      closeModal();
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
          <Button type="primary" onClick={() => openCreateOrUpdateModal(record)}>
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
    fetchUsers(pagination);
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
            <Button type="primary" onClick={() => openCreateOrUpdateModal()}>
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
