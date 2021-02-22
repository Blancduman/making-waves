import { useDispatch, useSelector } from "react-redux";
import { openSignInDialog, signOut } from "../domains/redux/actions/auth";
import { openCreateTaskDialog } from "../domains/redux/actions/addTask";

export default function Topbar() {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const dispatchAuthOpenDialog = () => dispatch(openSignInDialog(true));

  const dispatchSignOut = () => dispatch(signOut());

  const dispatchAddTaskOpenDialog = () => dispatch(openCreateTaskDialog(true));

  return (
    <nav className="topbar">
      <button onClick={dispatchAddTaskOpenDialog}>Create</button>
      {auth ? (
        <button onClick={dispatchSignOut}>Sign Out</button>
      ) : (
        <button onClick={dispatchAuthOpenDialog}>Sign In</button>
      )}
    </nav>
  );
}
