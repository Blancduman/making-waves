import { useDispatch, useSelector } from "react-redux";
import {
  editTask,
  editTaskSetStatus,
  editTastSetText,
} from "../../domains/redux/actions/editTask";

export default function EditTaskForm() {
  const { text, status, id, username, email, isLoading, error } = useSelector(
    (state) => state.editTask
  );
  const dispatch = useDispatch();

  const onChangeText = ({ target: { value } }) => dispatch(editTastSetText(value));
  const onChangeStatus = ({ target: { value } }) =>
    dispatch(editTaskSetStatus(+value));

  const onEditTask = (event) => {
    event.preventDefault();
    dispatch(editTask(id, text, status));
  };

  return (
    <form onSubmit={onEditTask}>
      <div className="row">
        <div className="col-25">
          <label htmlFor="username">Username</label>
        </div>
        <div className="col-75">
          <input
            value={username}
            type="text"
            id="username"
            name="username"
            placeholder="username"
            disabled
          />
        </div>
        {error && error.username && (
          <div class="error-message">{error.username}</div>
        )}
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="email">Email</label>
        </div>
        <div className="col-75">
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            disabled
          />
          {error && error.password && (
            <div class="error-message">{error.password}</div>
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
          {error && error.text && <div class="error-message">{error.text}</div>}
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="text">Status</label>
        </div>
        <div className="custom-select col-75">
          <select onChange={onChangeStatus} value={status}>
            <option value={0}>задача не выполнена</option>
            <option value={1}>
              задача не выполнена, отредактирована админом
            </option>
            <option value={10}>задача выполнена</option>
            <option value={11}>
              задача отредактирована админом и выполнена
            </option>
          </select>
          {error && error.status && (
            <div class="error-message">{error.status}</div>
          )}
        </div>
      </div>
      {error && error.token && (
        <div className="row">
          <div className="error-message">Не валидный токен</div>
        </div>
      )}
      <div className="row">
        <input
          type="submit"
          value="Submit"
          disabled={isLoading || !text}
          style={
            isLoading || !text ? { backgroundColor: "grey" } : {}
          }
        />
      </div>
    </form>
  );
}
