import { useDispatch } from "react-redux";
import { openEditDialog } from '../../domains/redux/actions';
import "./TaskItem.css";

export default function TaskItem(props) {
  const {
    task: { id, username, email, text, status },
  } = props;

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(openEditDialog(true, props.task));
  }

  const renderStatus = () => {
    switch (status) {
      case 0:
        return "задача не выполнена";
      case 1:
        return "задача не выполнена, отредактирована админом";
      case 2:
        return "задача выполнена";
      case 3:
        return "задача отредактирована админом и выполнена";

      default:
        return "";
    }
  };
  return (
    <div className="card" onClick={onClick}>
      <div className="container">
        <h4>{username}</h4>
        <p>{email}</p>
        <p>{text}</p>
        <p>{renderStatus()}</p>
      </div>
    </div>
  );
}
