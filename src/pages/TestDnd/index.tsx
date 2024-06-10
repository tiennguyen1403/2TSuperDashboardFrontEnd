import React, { useState } from "react";

const fakeTasks = [
  {
    id: "aaaaa",
    title: "Task A",
    description: "Task A's description",
    status: "open",
  },
  {
    id: "bbbbb",
    title: "Task B",
    description: "Task B's description",
    status: "in_progress",
  },
  {
    id: "ccccc",
    title: "Task C",
    description: "Task C's description",
    status: "done",
  },
  {
    id: "ddddd",
    title: "Task D",
    description: "Task D's description",
    status: "open",
  },
  {
    id: "eeeee",
    title: "Task E",
    description: "Task E's description",
    status: "in_progress",
  },
  {
    id: "fffff",
    title: "Task F",
    description: "Task F's description",
    status: "done",
  },
];

const TestDnd: React.FC = () => {
  const [tasks, setTasks] = useState(fakeTasks);
  const containerStyle = {
    background: "#ffffff",
    height: "100%",
    width: "100%",
    padding: 24,
    borderRadius: 8,
  };
  return <div style={containerStyle}>TestDnd</div>;
};

export default TestDnd;
