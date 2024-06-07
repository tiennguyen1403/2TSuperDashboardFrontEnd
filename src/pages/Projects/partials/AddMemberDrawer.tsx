import React, { useEffect, useState } from "react";
import { Button, Drawer, DrawerProps, Flex } from "antd";
import { Project } from "../Project.type";
import useUsersStore from "src/store/useUsersStore";
import { Pagination } from "src/generalTypes";
import { defaultPagination } from "src/helpers/constants";
import { User } from "src/pages/Users/User.type";

type Props = {
  open: boolean;
  project?: Project;
  onClose: () => void;
};

const AddMemberDrawer: React.FC<Props> = (props) => {
  const { fetchUsers } = useUsersStore();
  const { open, project, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination] = useState<Pagination>(defaultPagination);

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetchUsers(pagination);
      setUsers([...users, ...res.items]);
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []); //eslint-disable-line

  const drawerProps: DrawerProps = {
    open,
    loading,
    closable: false,
    placement: "right",
    title: "Add Member",
    destroyOnClose: true,
    onClose,
    footer: (
      <Flex align="center" justify="flex-end" gap={8}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} type="primary">
          Add
        </Button>
      </Flex>
    ),
  };

  return (
    <Drawer {...drawerProps}>
      <p>{project?.name}</p>
    </Drawer>
  );
};

export default AddMemberDrawer;
