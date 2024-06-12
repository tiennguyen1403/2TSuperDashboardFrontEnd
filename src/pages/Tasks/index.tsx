import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Add, InfoCircle, TaskSquare } from "iconsax-react";
import TaskGroup from "./partials/TaskGroup";
import useTaskGroupStore from "src/store/useTaskGroupStore";
import useTaskStore from "src/store/useTaskStore";
import { Task, TaskDto, TaskGroupDto } from "./Task.type";
import TaskModal from "./partials/TaskModal";
import _ from "lodash";
import { ELoading, ModalType } from "src/generalTypes";
import { initialValues } from "./constants";
import useUsersStore from "src/store/useUsersStore";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";

const { confirm } = Modal;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const Tasks: React.FC = () => {
  const { fetchUsers, users } = useUsersStore();
  const {
    fetchTaskGroups,
    createTaskGroup,
    updateTaskGroup,
    deleteTaskGroup,
    reorderTaskGroup,
    taskGroups,
  } = useTaskGroupStore();
  const { fetchTasks, createTask, updateTask, deleteTask, tasks, loading } = useTaskStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskDto, setTaskDto] = useState<TaskDto>(initialValues);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);
  const [activeColumn, setActiveColumn] = useState();

  // const pointSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const openCreateOrUpdateTask = (task?: Task, taskGroupId?: string) => {
    if (_.isEmpty(task)) {
      setIsOpenModal(true);
      setModalType(ModalType.CREATE);
      setTaskDto({ ...initialValues, status: taskGroupId ?? null });
    } else {
      setIsOpenModal(true);
      setModalType(ModalType.UPDATE);
      setTaskDto({ ...task, status: task.status.id, assignedFor: task.assignedFor.id });
    }
  };

  const handleCreateTask = (taskDto: TaskDto) => {
    createTask(taskDto).then(closeModal);
  };

  const handleUpdateTask = (taskDto: TaskDto) => {
    updateTask(taskDto).then(closeModal);
  };

  const handleRemoveTask = (taskId: string) => deleteTask(taskId);

  const handleCreateTaskGroup = () => createTaskGroup({ name: "New Column" });

  const handleUpdateTaskGroup = (taskGroupDto: TaskGroupDto) => updateTaskGroup(taskGroupDto);

  const handleRemoveTaskGroup = (taskGroupId: string) => deleteTaskGroup(taskGroupId);

  const closeModal = () => {
    setIsOpenModal(false);
    setTaskDto(initialValues);
    setModalType(ModalType.DEFAULT);
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
      case ModalType.CREATE: {
        return {
          okText: "Create",
          title: "Create Task",
          onSubmit: handleCreateTask,
          loading: loading.includes(ELoading.CREATE),
        };
      }
      case ModalType.UPDATE: {
        return {
          okText: "Update",
          title: "Update Task",
          onSubmit: handleUpdateTask,
          loading: loading.includes(ELoading.UPDATE),
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
      const oldIndex = _.findIndex(taskGroups, { id: active.id });
      const newIndex = _.findIndex(taskGroups, { id: over.id });
      const newTaskGroups = arrayMove(taskGroups, oldIndex, newIndex).map((taskGroup, index) => ({
        ...taskGroup,
        order: index + 1,
      }));
      reorderTaskGroup(newTaskGroups);
      setActiveColumn(undefined);
    }
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
            <Button type="primary" icon={<Add />} onClick={handleCreateTaskGroup}>
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
              items={_.map(taskGroups, "id")}
              strategy={horizontalListSortingStrategy}
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
                  tasks={tasks.filter((task) => {
                    console.log("task :>> ", task);
                    console.log("taskGroup :>> ", taskGroup);
                    return task.status?.id === taskGroup.id;
                  })}
                />
              ))}
              {/* <div
                style={{
                  width: "25%",
                  borderRadius: 8,
                  padding: 16,
                  background: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <AddCircle />
                <span style={{ fontSize: 18, fontWeight: 600 }}>New Column</span>
              </div> */}
              <DragOverlay dropAnimation={dropAnimation}>
                <p>Hello world {activeColumn}</p>
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <TaskModal
        taskDto={taskDto}
        open={isOpenModal}
        modalType={modalType}
        onCancel={closeModal}
        userOptions={users.items}
        statusOptions={taskGroups}
        title={generateModalInfo().title}
        okText={generateModalInfo().okText}
        loading={generateModalInfo().loading}
        onSubmit={generateModalInfo().onSubmit}
      />
    </>
  );
};

export default Tasks;
