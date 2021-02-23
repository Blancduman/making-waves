import { useDispatch, useSelector } from "react-redux";
import {
  addTaskSetEmail,
  addTaskSetText,
  addTaskSetUsername,
  createTask,
} from "../../domains/redux/actions/addTask";
import { openCreateTaskDialog } from "../../domains/redux/actions/addTask";

export default function CreateTaskForm() {
  const { username, email, text, isLoading, error, success } = useSelector(
    (state) => state.addTask
  );
  const dispatch = useDispatch();

  const onChangeUsername = ({ target: { value } }) =>
    dispatch(addTaskSetUsername(value));
  const onChangeEmail = ({ target: { value } }) =>
    dispatch(addTaskSetEmail(value));
  const onChangeText = ({ target: { value } }) =>
    dispatch(addTaskSetText(value));

  const onCreateTask = (event) => {
    event.preventDefault();
    dispatch(createTask(username, email, text));
  };

  const onClose = () => {
    dispatch(openCreateTaskDialog(false));
  }

  return (
    <form onSubmit={onCreateTask}>
      <div className="row">
        <div className="col-25">
          <label htmlFor="username">Username</label>
        </div>
        <div className="col-75">
          <input
            onChange={onChangeUsername}
            value={username}
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
          />
        </div>
        {error && error.username && (
          <div className="error-message">{error.username}</div>
        )}
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="email">Email</label>
        </div>
        <div className="col-75">
          <input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
            onChange={onChangeEmail}
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
          />
          {error && error.password && (
            <div className="error-message">{error.password}</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="text">Text</label>
        </div>
        <div className="col-75">
          <input
            onChange={onChangeText}
            value={text}
            type="text"
            id="text"
            name="text"
            placeholder="text"
            required
          />
          {error && error.text && (
            <div className="error-message">{error.text}</div>
          )}
          {success && <div className="success-message">Задача добавлена</div>}
        </div>
      </div>
      <div className="row">
        {success ? (
          <input type="button" value="Закрыть" onClick={onClose} />
        ) : (
          <input
            type="submit"
            value="Submit"
            disabled={isLoading || !username || !email || !text}
            style={
              isLoading || !username || !email || !text
                ? { backgroundColor: "grey" }
                : {}
            }
          />
        )}
      </div>
    </form>
  );
}
