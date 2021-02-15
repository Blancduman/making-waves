import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openEditDialog, editTask, editTastSetText, editTaskSetStatus } from "../../domains/redux/actions";
import "./AuthDialog.css";

export default function EditTaskDialog(props) {
  const { text, status, id, username, email } = useSelector((state) => state.editTask);
  const { auth } = useSelector((state) => state.auth);
  const openDialog = useSelector((state) => state.editTask.showDialog);
  const isLoading = useSelector((state) => state.editTask.isLoading);
  const errors = useSelector((state) => state.editTask.error);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  
  const dispatchCloseEditTask = useCallback(
    () => dispatch(openEditDialog(false)),
    [dispatch]
  );

  const onChangeText = (event) => dispatch(editTastSetText(event.target.value));
  const onChangeStatus = (event) => dispatch(editTaskSetStatus(event.target.value));

  const dispatchCreateTask = (event) => {
    event.preventDefault();
    dispatch(editTask(id, text, status));
  };

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        dispatchCloseEditTask(false);
      }
    };

    if (openDialog) {
      document.addEventListener("click", onOutsideClick, false);
    } else {
      document.removeEventListener("click", onOutsideClick, false);
    }

    return () => document.removeEventListener("click", onOutsideClick, false);
  }, [openDialog, dispatchCloseEditTask]);

  return (
    auth && <div
      ref={modalRef}
      className="modal-content"
      style={openDialog ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-header">
        <span className="close" onClick={dispatchCloseEditTask}>
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
                value={username}
                type="text"
                id="username"
                name="username"
                placeholder="username"
                disabled
              />
            </div>
            {errors && errors.username && (
              <div class="error-message">{errors.username}</div>
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
              {errors && errors.password && (
                <div class="error-message">{errors.password}</div>
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
                <div class="error-message">{errors.text}</div>
              )}
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
              {errors && errors.status && (
                <div class="error-message">{errors.status}</div>
              )}
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              value="Submit"
              disabled={isLoading || !text || !status}
              style={
                isLoading || !text || !status ? { backgroundColor: "grey" } : {}
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
