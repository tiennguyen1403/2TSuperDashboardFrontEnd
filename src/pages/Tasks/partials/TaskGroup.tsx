import React from "react";
import { Task } from "../Task.type";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { Button } from "antd";
import { More, Trash } from "iconsax-react";
import _ from "lodash";

type Props = {
  id: string;
  tasks: Task[];
};

const TaskGroup: React.FC<Props> = (props) => {
  const { id, tasks } = props;

  return (
    <SortableContext id={id} items={_.map(tasks, "id")} strategy={verticalListSortingStrategy}>
      <div className="task-group">
        <div className="task-group-header">
          <p className="task-group-title">{_.startCase(id)}</p>
          <Button
            danger
            type="text"
            shape="circle"
            icon={<Trash size={20} variant="Bulk" color="#FF0000" />}
          />
        </div>
        <div className="task-group-body">
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id}>
              <div className="task-item-header">
                <p className="task-item-title">{task.title}</p>
                <Button
                  type="text"
                  shape="circle"
                  icon={<More size={20} />}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
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
