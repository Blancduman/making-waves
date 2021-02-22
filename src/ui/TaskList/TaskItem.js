import { useDispatch } from "react-redux";
import { openEditDialog } from '../../domains/redux/actions/editTask';
import "./TaskItem.css";

export default function TaskItem(props) {
  const {
    task: { id, username, email, text, status },
    isClickable,
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
      case 10:
        return "задача выполнена";
      case 11:
        return "задача отредактирована админом и выполнена";

      default:
        return "";
    }
  };
  // return (
  //   <div className="card" onClick={onClick}>
  //     <div className="container">
  //       <h4>{username}</h4>
  //       <p>{email}</p>
  //       <p>{text}</p>
  //       <p>{renderStatus()}</p>
  //     </div>
  //   </div>
  // );
  const statusText = renderStatus();
  return (
    <tr style={{ cursor: isClickable ? 'pointer' : 'default' }} onClick={onClick}>
      <td>{id}</td>
      <td title={username}>{username}</td>
      <td title={email}>{email}</td>
      <td title={text}>{text}</td>
      <td title={statusText}>{statusText}</td>
    </tr>
  )
}
