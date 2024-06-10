import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  children?: React.ReactNode;
  id: string | number;
};

const TaskItem: React.FC<Props> = (props) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} className="task-item" style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
  // return <div className="task-item">{children}</div>;
};

export default TaskItem;
