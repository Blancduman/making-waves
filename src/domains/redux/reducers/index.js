import { combineReducers } from "redux";
import { addTask } from "./addTask";
import { auth } from "./auth";
import { editTask } from "./editTask";
import { tasks } from "./tasks";

export default combineReducers({
  addTask,
  auth,
  editTask,
  tasks,
});
