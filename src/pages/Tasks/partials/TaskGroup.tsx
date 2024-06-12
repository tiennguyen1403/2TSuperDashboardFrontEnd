import React from "react";
import { Task, TaskGroupDto, TaskGroup as TaskGroupType } from "../Task.type";
import TaskItem from "./TaskItem";
import { Button, Dropdown, Flex, MenuProps, Popconfirm, PopconfirmProps, Typography } from "antd";
import { CardAdd, Edit, Edit2, Menu, More, Trash } from "iconsax-react";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  tasks: Task[];
  taskGroup: TaskGroupType;
  openCreateOrUpdateTask: (task?: Task, taskGroupId?: string) => void;
  showDeleteTaskConfirm: (taskId: string) => void;
  onDeleteTaskGroup: (taskGroupId: string) => void;
  handleUpdateTaskGroup: (taskGroupDto: TaskGroupDto) => void;
};

const { Title } = Typography;

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const TaskGroup: React.FC<Props> = (props) => {
  const {
    id,
    tasks = [],
    taskGroup,
    openCreateOrUpdateTask,
    showDeleteTaskConfirm,
    onDeleteTaskGroup,
    handleUpdateTaskGroup,
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    animateLayoutChanges,
  });
  const dndKitTaskGroupStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: `2px solid ${isDragging ? "#2CD673" : "transparent"}`,
  };

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
      handleUpdateTaskGroup({ id, name: value });
    }
  };

  return (
    <div ref={setNodeRef} style={dndKitTaskGroupStyle} className="task-group">
      <div className="task-group-header">
        <Title
          level={4}
          style={{ margin: 0, flex: 1 }}
          ellipsis={{ rows: 1, expandable: false, tooltip: taskGroup.name, symbol: "..." }}
          editable={{
            tabIndex: 5,
            tooltip: false,
            triggerType: ["icon"],
            onChange: onTaskNameChange,
            icon: <Edit2 size={20} variant="Bulk" style={{ transform: "translateY(5px)" }} />,
          }}
        >
          {taskGroup.name}
        </Title>
        <Flex align="center">
          <Popconfirm {...popConfirmProps}>
            <Button
              danger
              type="text"
              shape="circle"
              icon={<Trash size={20} variant="Bulk" color="#FF0000" />}
            />
          </Popconfirm>
          <Button
            type="text"
            shape="circle"
            icon={<Menu size={20} />}
            {...attributes}
            {...listeners}
          />
        </Flex>
      </div>
      <div className="task-group-body">
        {/* <SortableContext items={_.map(tasks, "id")} strategy={verticalListSortingStrategy}> */}
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id}>
            <div className="task-item-header">
              <Title
                level={5}
                style={{ margin: 0 }}
                ellipsis={{ rows: 1, symbol: "...", tooltip: task.title }}
              >
                {task.title}
              </Title>
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
        {/* </SortableContext> */}
      </div>
      <div className="task-group-footer">
        <Button
          block
          type="primary"
          onClick={() => openCreateOrUpdateTask(undefined, taskGroup.id)}
        >
          <CardAdd size={20} />
          <span style={{ fontWeight: 600 }}>Add new task</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskGroup;
