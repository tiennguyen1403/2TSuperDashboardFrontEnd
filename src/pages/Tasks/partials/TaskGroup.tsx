import React from "react";
import { Task, TaskGroupDto, TaskGroup as TaskGroupType } from "../Task.type";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { Button, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Typography } from "antd";
import { Edit, More, Trash } from "iconsax-react";
import _ from "lodash";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  tasks: Task[];
  taskGroup: TaskGroupType;
  openCreateOrUpdateTask: (task: Task) => void;
  showDeleteTaskConfirm: (taskId: string) => void;
  onDeleteTaskGroup: (taskGroupId: string) => void;
  handleUpdateTaskGroup: (taskGroupDto: TaskGroupDto) => void;
};

const TaskGroup: React.FC<Props> = (props) => {
  const {
    id,
    tasks,
    taskGroup,
    openCreateOrUpdateTask,
    showDeleteTaskConfirm,
    onDeleteTaskGroup,
    handleUpdateTaskGroup,
  } = props;

  const { setNodeRef } = useDroppable({ id });

  const generateTaskActions = (task: Task): MenuProps["items"] => [
    {
      label: "Edit",
      key: "edit-task",
      icon: <Edit size={20} />,
      onClick: () => openCreateOrUpdateTask(task),
    },
    {
      label: "Delete",
      key: "delete-task",
      icon: <Trash size={20} />,
      danger: true,
      onClick: () => showDeleteTaskConfirm(task.id),
    },
  ];

  const popConfirmProps: PopconfirmProps = {
    title: "Delete the task group",
    description: "Are you sure to delete this task group?",
    onConfirm: () => onDeleteTaskGroup(id),
    okText: "Yes",
  };

  const onTaskNameChange = (value: string) => {
    if (value !== taskGroup.name) {
      handleUpdateTaskGroup({ id, name: value, description: undefined });
    }
  };

  return (
    <SortableContext id={id} items={_.map(tasks, "id")} strategy={verticalListSortingStrategy}>
      <div className="task-group">
        <div className="task-group-header">
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
            editable={{ triggerType: ["text"], onChange: onTaskNameChange }}
          >
            {taskGroup.name}
          </Typography.Title>
          <Popconfirm {...popConfirmProps}>
            <Button
              danger
              type="text"
              shape="circle"
              icon={<Trash size={20} variant="Bulk" color="#FF0000" />}
            />
          </Popconfirm>
        </div>
        <div ref={setNodeRef} className="task-group-body">
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id}>
              <div className="task-item-header">
                <p className="task-item-title">{task.title}</p>
                <Dropdown
                  menu={{ items: generateTaskActions(task) }}
                  overlayStyle={{ minWidth: 150 }}
                  trigger={["click"]}
                >
                  <Button type="text" shape="circle" icon={<More size={20} />} />
                </Dropdown>
              </div>
              <div className="task-item-desc">{task.description}</div>
            </TaskItem>
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default TaskGroup;
