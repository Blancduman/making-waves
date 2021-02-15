import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../../domains/redux/actions";

import "./TaskList.css";

export default function TaskList() {
  const { tasks, page } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({ page }));
  }, []);

  return (
    <div className="tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id + task.username + task.email} task={task} />
      ))}
    </div>
  );
}
