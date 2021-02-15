import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  openCreateTaskDialog,
  createTask,
  addTaskSetUsername,
  addTaskSetEmail,
  addTaskSetText,
} from "../../domains/redux/actions";
import "./AuthDialog.css";

export default function CreateTaskDialog(props) {
  const { username, email, text } = useSelector((state) => state.addTask);
  const openDialog = useSelector((state) => state.addTask.showDialog);
  const isLoading = useSelector((state) => state.addTask.isLoading);
  const errors = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const dispatchCloseCreateTaskDialog = useCallback(
    () => dispatch(openCreateTaskDialog(false)),
    [dispatch]
  );

  const onChangeUsername = (event) => {
    dispatch(addTaskSetUsername(event.target.value));
  };
  const onChangeEmail = (event) => dispatch(addTaskSetEmail(event.target.value));
  const onChangeText = (event) => dispatch(addTaskSetText(event.target.value));

  const dispatchCreateTask = (event) => {
    event.preventDefault();
    dispatch(createTask(username, email, text));
  };

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        dispatchCloseCreateTaskDialog(false);
      }
    };

    if (openDialog) {
      document.addEventListener("click", onOutsideClick, false);
    } else {
      document.removeEventListener("click", onOutsideClick, false);
    }

    return () => document.removeEventListener("click", onOutsideClick, false);
  }, [openDialog, dispatchCloseCreateTaskDialog]);

  return (
    <div
      ref={modalRef}
      className="modal-content"
      style={openDialog ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-header">
        <span className="close" onClick={dispatchCloseCreateTaskDialog}>
          &times;
        </span>
        <h2>Create task</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={dispatchCreateTask}>
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
            {errors && errors.username && (
              <div className="error-message">{errors.username}</div>
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
              {errors && errors.password && (
                <div className="error-message">{errors.password}</div>
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
              {errors && errors.text && (
                <div className="error-message">{errors.text}</div>
              )}
            </div>
          </div>
          <div className="row">
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
          </div>
        </form>
      </div>
    </div>
  );
}
