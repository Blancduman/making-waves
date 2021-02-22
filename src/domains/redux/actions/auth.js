import Cookies from "js-cookie";
import TestAPI from "../../../networks/api";
import {
  SIGN_IN_ERROR,
  SIGN_IN_LOADING,
  SIGN_IN_OPEN_DIALOG,
  SIGN_IN_RESET_ERRORS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_IN_SET_USERNAME,
  SIGN_IN_SET_PASSWORD,
} from "../types";

const api = new TestAPI();

export const openSignInDialog = (openDialog) => (dispatch) =>
  dispatch({
    type: SIGN_IN_OPEN_DIALOG,
    payload: openDialog,
  });

export const signOut = () => (dispatch) => {
  Cookies.remove("token");
  dispatch({
    type: SIGN_OUT,
  });
};

export const signIn = (username, password) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_LOADING,
  });
  const response = await api.login(username, password);

  if (response.status === "ok") {
    Cookies.set("token", response.message.token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    dispatch({
      type: SIGN_IN_SUCCESS,
    });
  } else {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: response.message,
    });
  }
};

export const SignInResetErrors = (field) => async (dispatch) => {
  dispatch({ type: SIGN_IN_RESET_ERRORS, payload: field });
};

export const authSetUsername = (username) => (dispatch) =>
  dispatch({
    type: SIGN_IN_SET_USERNAME,
    payload: username,
  });

export const authSetPassword = (password) => (dispatch) =>
  dispatch({
    type: SIGN_IN_SET_PASSWORD,
    payload: password,
  });
