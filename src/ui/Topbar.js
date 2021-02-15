import { useDispatch, useSelector } from "react-redux";
import {
  openCreateTaskDialog,
  openSignInDialog,
  signOut,
} from "../domains/redux/actions";

export default function Topbar(props) {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();

  const dispatchAuthOpenDialog = () => dispatch(openSignInDialog(true));

  const dispatchSignOut = () => dispatch(signOut());

  const dispatchAddTaskOpenDialog = () => dispatch(openCreateTaskDialog(true));

  if (auth) {
    return (
      <nav className="topbar">
        <button onClick={dispatchAddTaskOpenDialog}>Create</button>
        <button onClick={dispatchSignOut}>Sign Out</button>
      </nav>
    );
  }

  return (
    <nav className="topbar">
      <button onClick={dispatchAddTaskOpenDialog}>Create</button>
      <button onClick={dispatchAuthOpenDialog}>Sign In</button>
    </nav>
  );
}
