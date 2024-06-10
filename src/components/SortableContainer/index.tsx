import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import SortableItem from "../SortableItem";

type Props = {
  id: string;
  items: any;
};

const SortableContainer: React.FC<Props> = (props) => {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef}>
        {items.map((id: string) => (
          <SortableItem key={id} id={id}>
            <p>Hello world</p>
          </SortableItem>
        ))}
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
