import { useDispatch, useSelector } from "react-redux";
import { authSetUsername, authSetPassword, signIn } from "../../domains/redux/actions/auth";

export default function AuthForm() {
    const { username, password, isLoading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onChangeUsername = ({target: { value }}) => dispatch(authSetUsername(value));
    const onChangePassword = ({target: { value }}) => dispatch(authSetPassword(value));

    const onSignIn = (event) => {
        event.preventDefault();
        dispatch(signIn(username, password));
    };

    return (
        <form onSubmit={onSignIn}>
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
            {error && error.username && (
              <div className="error-message">{error.username}</div>
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
              {error && error.password && (
                <div className="error-message">{error.password}</div>
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
    );
}