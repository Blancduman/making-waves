import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../../domains/redux/actions/tasks";

import "./TaskList.css";

const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};

export default function TaskList() {
  const { tasks, page, isLoading } = useSelector((state) => state.tasks);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [sortField, setSortField] = useState({
    sort_field: "",
    sort_direction: "",
  });

  const onClickHeader = (sort_field) => {
    if (sortField.sort_field === sort_field) {
      if (sortField.sort_direction === "asc") {
        setSortField({
          sort_field,
          sort_direction: "desc",
        });
      } else {
        setSortField({
          sort_field,
          sort_direction: "asc",
        });
      }
    } else {
      setSortField({
        sort_field,
        sort_direction: "asc",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchTasks({ ...sortField, page }));
  }, [page, sortField, dispatch]);

  const renderHeader = (title) => {
    let newTitle = title;
    if (sortField.sort_field === title) {
      newTitle += ` ${sortField.sort_direction === "asc" ? " ↑" : " ↓"}`;
    }
    return (
      <th key={title} onClick={() => onClickHeader(title)}>
        {newTitle}
      </th>
    );
  };

  const renderHeaders = () => {
    return ["id", "username", "email", "text", "status"].map((header) =>
      renderHeader(header)
    );
  };

  const renderEmptyTable = () => {
    return ['1', '2', '3'].map((key) => (
      <tr key={key} style={{height: 35}}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>
        { isLoading ? renderEmptyTable() : tasks.map((task) => (
          <TaskItem key={task.id} task={task} isClickable={auth} />
        ))}
      </tbody>
    </table>
  );
}
