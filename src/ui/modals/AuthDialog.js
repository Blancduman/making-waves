import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openSignInDialog, SignIn, authSetUsername, authSetEmail } from "../../domains/redux/actions";
import "./AuthDialog.css";

export default function AuthDialog(props) {
  const { username, password } = useSelector((state) => state.auth);
  const openDialog = useSelector((state) => state.auth.showDialog);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errors = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const dispatchCloseSignInDialog = useCallback(
    () => dispatch(openSignInDialog(false)),
    [dispatch]
  );

  const onChangeUsername = (event) => {
    dispatch(authSetUsername(event.target.value));
  };
  const onChangePassword = (event) => dispatch(authSetEmail(event.target.value));

  const dispatchSignIn = (event) => {
    event.preventDefault();
    dispatch(SignIn(username, password));
  };

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        dispatchCloseSignInDialog(false);
      }
    };

    if (openDialog) {
      document.addEventListener("click", onOutsideClick, false);
    } else {
      document.removeEventListener("click", onOutsideClick, false);
    }

    return () => document.removeEventListener("click", onOutsideClick, false);
  }, [openDialog, dispatchCloseSignInDialog]);

  return (
    <div
      ref={modalRef}
      className="modal-content"
      style={openDialog ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-header">
        <span className="close" onClick={dispatchCloseSignInDialog}>
          &times;
        </span>
        <h2>Auth</h2>
      </div>
      <div className="modal-body">
        <form onSubmit={dispatchSignIn}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="auth_username">Username</label>
            </div>
            <div className="col-75">
              <input
                onChange={onChangeUsername}
                value={username}
                type="text"
                id="auth_username"
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
              <label htmlFor="auth_password">Password</label>
            </div>
            <div className="col-75">
              <input
                onChange={onChangePassword}
                value={password}
                type="password"
                id="auth_password"
                name="password"
                placeholder="password"
                required
              />
              {errors && errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              value="Submit"
              disabled={isLoading || !username || !password}
              style={
                isLoading || !username || !password
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
