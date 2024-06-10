import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Add, InfoCircle, TaskSquare } from "iconsax-react";
import TaskGroup from "./partials/TaskGroup";
import useTaskGroupStore from "src/store/useTaskGroupStore";
import useTaskStore from "src/store/useTaskStore";
import { ModalType, Task, TaskDto, TaskGroup as TaskGroupType, TaskGroupDto } from "./Task.type";
import TaskModal from "./partials/TaskModal";
import _ from "lodash";
import { ELoading } from "src/generalTypes";
import { initialTaskGroup, initialValues } from "./constants";
import useUsersStore from "src/store/useUsersStore";
import TaskGroupModal from "./partials/TaskGroupModal";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const { confirm } = Modal;

const Tasks: React.FC = () => {
  const { fetchUsers, users } = useUsersStore();
  const { fetchTaskGroups, createTaskGroup, updateTaskGroup, deleteTaskGroup, taskGroups } =
    useTaskGroupStore();
  const { fetchTasks, createTask, updateTask, deleteTask, tasks, loading } = useTaskStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskDto, setTaskDto] = useState<TaskDto>(initialValues);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);
  const [taskGroupDto, setTaskGroupDto] = useState<TaskGroupDto>(initialTaskGroup);
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const openCreateOrUpdateTask = (task?: Task) => {
    if (_.isEmpty(task)) {
      setIsOpenModal(true);
      setTaskDto(initialValues);
      setModalType(ModalType.CREATE_TASK);
    } else {
      setIsOpenModal(true);
      setModalType(ModalType.UPDATE_TASK);
      setTaskDto({ ...task, status: task.status.id, assignedFor: task.assignedFor.id });
    }
  };

  const openCreateOrUpdateTaskGroup = (taskGroup?: TaskGroupType) => {
    if (_.isEmpty(taskGroup)) {
      setIsOpenModal(true);
      setTaskGroupDto(initialTaskGroup);
      setModalType(ModalType.CREATE_TASK_GROUP);
    } else {
      setIsOpenModal(true);
      setTaskGroupDto(taskGroup);
      setModalType(ModalType.UPDATE_TASK_GROUP);
    }
  };

  const handleCreateTask = (taskDto: TaskDto) => {
    createTask(taskDto).then(closeModal);
  };

  const handleUpdateTask = (taskDto: TaskDto) => {
    updateTask(taskDto).then(closeModal);
  };

  const handleRemoveTask = (taskId: string) => deleteTask(taskId);

  const handleCreateTaskGroup = (taskGroupDto: TaskGroupDto) => {
    createTaskGroup(taskGroupDto).then(closeModal);
  };

  const handleUpdateTaskGroup = (taskGroupDto: TaskGroupDto) => {
    updateTaskGroup(taskGroupDto, false);
  };

  const handleRemoveTaskGroup = (taskGroupId: string) => deleteTaskGroup(taskGroupId);

  const closeModal = () => {
    setIsOpenModal(false);
    setTaskDto(initialValues);
    setModalType(ModalType.DEFAULT);
    setTaskGroupDto(initialTaskGroup);
  };

  const showDeleteTaskConfirm = (taskId: string) => {
    confirm({
      okText: "Delete",
      title: "Delete the task",
      onOk: () => handleRemoveTask(taskId),
      content: "Are you sure to delete this task?",
      icon: <InfoCircle variant="Bold" color="#faad14" />,
    });
  };

  const generateModalInfo = (): any => {
    switch (modalType) {
      case ModalType.CREATE_TASK: {
        return {
          okText: "Create",
          title: "Create Task",
          onSubmit: handleCreateTask,
          loading: loading.includes(ELoading.CREATE),
        };
      }
      case ModalType.UPDATE_TASK: {
        return {
          okText: "Update",
          title: "Update Task",
          onSubmit: handleUpdateTask,
          loading: loading.includes(ELoading.UPDATE),
        };
      }
      case ModalType.CREATE_TASK_GROUP: {
        return {
          okText: "Create",
          title: "Create Task Group",
          onSubmit: handleCreateTaskGroup,
          loading: false,
        };
      }
      default: {
        return {
          title: "",
          okText: "",
          loading: false,
          onSubmit: () => {},
        };
      }
    }
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("active :>> ", active);
    console.log("over :>> ", over);
  };

  useEffect(() => {
    fetchTasks();
    fetchTaskGroups();
    fetchUsers({ page: 1, size: 10 });
  }, []); //eslint-disable-line

  return (
    <>
      <div className="tasks">
        <div className="tasks-header">
          <div className="tasks-header-left">
            <TaskSquare variant="Broken" />
            <p className="tasks-header-title">Tasks Management</p>
          </div>
          <div className="tasks-header-right">
            <Button type="primary" icon={<Add />} onClick={() => openCreateOrUpdateTaskGroup()}>
              Add Task Group
            </Button>
            <Button type="primary" icon={<Add />} onClick={() => openCreateOrUpdateTask()}>
              Add Task
            </Button>
          </div>
        </div>
        <div className="tasks-body">
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            collisionDetection={closestCenter}
          >
            {taskGroups.map((taskGroup) => (
              <TaskGroup
                id={taskGroup.id}
                key={taskGroup.id}
                taskGroup={taskGroup}
                onDeleteTaskGroup={handleRemoveTaskGroup}
                handleUpdateTaskGroup={handleUpdateTaskGroup}
                showDeleteTaskConfirm={showDeleteTaskConfirm}
                openCreateOrUpdateTask={openCreateOrUpdateTask}
                tasks={tasks.filter((task) => task.status.id === taskGroup.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
      <TaskModal
        taskDto={taskDto}
        modalType={modalType}
        onCancel={closeModal}
        userOptions={users.items}
        statusOptions={taskGroups}
        title={generateModalInfo().title}
        okText={generateModalInfo().okText}
        loading={generateModalInfo().loading}
        onSubmit={generateModalInfo().onSubmit}
        open={isOpenModal && [ModalType.CREATE_TASK, ModalType.UPDATE_TASK].includes(modalType)}
      />
      <TaskGroupModal
        taskGroupDto={taskGroupDto}
        modalType={modalType}
        onCancel={closeModal}
        title={generateModalInfo().title}
        okText={generateModalInfo().okText}
        loading={generateModalInfo().loading}
        onSubmit={generateModalInfo().onSubmit}
        open={
          isOpenModal &&
          [ModalType.CREATE_TASK_GROUP, ModalType.UPDATE_TASK_GROUP].includes(modalType)
        }
      />
    </>
  );
};

export default Tasks;
