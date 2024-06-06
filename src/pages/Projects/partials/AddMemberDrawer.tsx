import React from "react";
import { Button, Drawer, DrawerProps, Flex } from "antd";
import { Project } from "../Project.type";

type Props = {
  open: boolean;
  loading: boolean;
  project?: Project;
  onClose: () => void;
};

const AddMemberDrawer: React.FC<Props> = (props) => {
  const { open, loading, project, onClose } = props;

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
