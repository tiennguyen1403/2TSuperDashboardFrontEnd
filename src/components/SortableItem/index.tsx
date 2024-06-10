import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  id: string;
  children: React.ReactElement;
};

const SortableItem: React.FC<Props> = (props) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {React.cloneElement(children, { id })}
    </div>
  );
};

export default SortableItem;
