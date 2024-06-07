import React, { useState } from "react";
import { Button } from "antd";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Add, TaskSquare } from "iconsax-react";
import TaskGroup from "./partials/TaskGroup";
import { Task, TaskStatus } from "./Task.type";
import { User } from "../Users/User.type";

const fakeTasks: Task[] = [
  {
    id: "aaaa",
    title: "Tien test task 1",
    status: TaskStatus.OPEN,
    isCompleted: false,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    createdAt: "hom nay",
    updatedAt: "hom nay",
    assignedFor: {} as User,
  },
  {
    id: "bbbb",
    title: "Tien test task 2",
    status: TaskStatus.IN_PROGRESS,
    isCompleted: false,
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    createdAt: "tomorrow",
    updatedAt: "tomorrow",
    assignedFor: {} as User,
  },
];

const Tasks: React.FC = () => {
  const containers = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  const [tasks] = useState(fakeTasks);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("active :>> ", active);
    console.log("over :>> ", over);
  };

  return (
    <div className="tasks">
      <div className="tasks-header">
        <div className="tasks-header-left">
          <TaskSquare variant="Broken" />
          <p className="tasks-header-title">Tasks Management</p>
        </div>
        <div className="tasks-header-right">
          <Button type="primary" icon={<Add />}>
            Add Task
          </Button>
        </div>
      </div>
      <div className="tasks-body">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {containers.map((id) => (
            <TaskGroup id={id} key={id} tasks={tasks.filter((task) => task.status === id)} />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Tasks;
