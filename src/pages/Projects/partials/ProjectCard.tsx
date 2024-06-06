import React from "react";
import { Project } from "../Project.type";
import { Edit, InfoCircle, More, Trash, User, UserAdd } from "iconsax-react";
import { Avatar, Button, Dropdown, Modal } from "antd";
import type { MenuProps } from "antd";

type Props = {
  project: Project;
  openUpdateModal: (project: Project) => void;
  onRemoveProject: (id: Project["id"]) => void;
  openAddMemberDrawer: (project: Project) => void;
};

const { confirm } = Modal;

const ProjectCard: React.FC<Props> = (props) => {
  const { project, onRemoveProject, openUpdateModal, openAddMemberDrawer } = props;
  const { name, projectImage, description } = project;

  const showDeleteConfirm = () => {
    confirm({
      okText: "Delete",
      title: "Delete the project",
      onOk: () => onRemoveProject(project.id),
      content: "Are you sure to delete this project?",
      icon: <InfoCircle variant="Bold" color="#faad14" />,
    });
  };

  const actions: MenuProps["items"] = [
    {
      label: "Edit",
      key: "edit",
      icon: <Edit size={20} />,
      onClick: () => openUpdateModal(project),
    },
    {
      label: "Add Member",
      key: "add-member",
      icon: <UserAdd size={20} />,
      onClick: () => openAddMemberDrawer(project),
    },
    {
      type: "divider",
    },
    {
      label: "Delete Project",
      key: "delete",
      icon: <Trash size={20} />,
      danger: true,
      onClick: showDeleteConfirm,
    },
  ];

  return (
    <div className="project-card">
      <div className="project-card-header">
        <Avatar shape="square" src={projectImage} size="large" icon={<User />} />
        <p>{name}</p>
        <Dropdown menu={{ items: actions }} trigger={["click"]} overlayStyle={{ minWidth: 200 }}>
          <Button type="text" shape="circle" icon={<More />} onClick={(e) => e.preventDefault()} />
        </Dropdown>
      </div>
      <p className="project-card-desc">{description}</p>
    </div>
  );
};

export default ProjectCard;
