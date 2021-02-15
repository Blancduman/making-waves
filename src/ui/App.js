import { Provider } from "react-redux";

import store from "../domains/redux/store";
import Topbar from "./Topbar";
import Pagination from "./Pagination/Pagination";
import AuthDialog from "./modals/AuthDialog";
import CreateTaskDialog from "./modals/CreateTaskDialog";
import TaskList from "./TaskList/TaskList";
import EditTaskDialog from './modals/EditTaskDialog';
import "./App.css";

function App() {
  return (
    <Provider store={store()}>
      <Topbar />
      <TaskList />
      <Pagination />
      <AuthDialog />
      <CreateTaskDialog />
      <EditTaskDialog />
    </Provider>
  );
}

export default App;
