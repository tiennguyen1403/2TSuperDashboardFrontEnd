import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
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
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";

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
  const [taskColumns, setTaskColumns] = useState<TaskGroupType[]>([]);
  const [activeColumn, setActiveColumn] = useState();

  // const pointSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

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

  const onDragStart = (event: any) => {
    setActiveColumn(event.active.id);
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (_.isNull(over)) return;

    if (active.id !== over.id) {
      const oldIndex = _.findIndex(taskColumns, { id: active.id });
      const newIndex = _.findIndex(taskColumns, { id: over.id });
      const newTaskColumns = arrayMove(taskColumns, oldIndex, newIndex);
      setTaskColumns(newTaskColumns);
      setActiveColumn(undefined);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTaskGroups();
    fetchUsers({ page: 1, size: 10 });
  }, []); //eslint-disable-line

  useEffect(() => {
    setTaskColumns(taskGroups);
  }, [taskGroups]);

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
          <DndContext sensors={sensors} onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <SortableContext
              items={_.map(taskColumns, "id")}
              strategy={horizontalListSortingStrategy}
            >
              {taskColumns.map((taskGroup) => (
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
              <DragOverlay>
                <p>Hello world {activeColumn}</p>
              </DragOverlay>
            </SortableContext>
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
