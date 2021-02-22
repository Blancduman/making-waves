import Topbar from "./Topbar";
import Pagination from "./Pagination";
import TaskList from "./TaskList";
import "./App.css";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { openCreateTaskDialog } from "../domains/redux/actions/addTask";
import { openEditDialog } from "../domains/redux/actions/editTask";
import { openSignInDialog } from "../domains/redux/actions/auth";
import AuthForm from "./Forms/AuthForm";
import CreateTaskForm from "./Forms/CreateTaskForm";
import EditTaskForm from "./Forms/EditTaskForm";

function App() {
  const isAuth = useSelector(state => state.auth.auth);
  const showAuthDialog = useSelector(state => state.auth.showDialog);
  const showCreateTaskDialog = useSelector(state => state.addTask.showDialog);
  const showEditTaskDialog = useSelector(state => state.editTask.showDialog);
  return (
    <>
      <Topbar />
      <TaskList />
      <Pagination />
      { !isAuth && <Modal title='Auth' showDialog={showAuthDialog} onClose={openSignInDialog} child={<AuthForm />}/> }
      <Modal title='Add task' showDialog={showCreateTaskDialog} onClose={openCreateTaskDialog} child={<CreateTaskForm />}/>
      { isAuth && <Modal title='Edit task' showDialog={showEditTaskDialog} onClose={openEditDialog} child={<EditTaskForm />}/> }
    </>
  );
}

export default App;
