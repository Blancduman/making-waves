import Cookies from 'js-cookie';
import TestAPI from "../../../networks/api";
import {
  EDIT_TASK_SET_TEXT,
  EDIT_TASK_SET_STATUS,
  EDIT_TASK_LOADING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_OPEN_DIALOG,
  SIGN_OUT,
} from "../types";

const api = new TestAPI();

export const openEditDialog = (showDialog, task) => (dispatch, getState) => {
  if (getState().auth.auth) {
    dispatch({
      type: EDIT_TASK_OPEN_DIALOG,
      payload: {
        showDialog,
        task,
      },
    });
  }
};
export const editTastSetText = (text) => (dispatch) =>
  dispatch({
    type: EDIT_TASK_SET_TEXT,
    payload: text,
  });

export const editTaskSetStatus = (status) => (dispatch) =>
  dispatch({
    type: EDIT_TASK_SET_STATUS,
    payload: status,
  });

export const editTask = (id, text, status) => async (dispatch, getState) => {
  const state = getState();
  if (state.editTask.isLoading) {
    return;
  }

  dispatch({
    type: EDIT_TASK_LOADING,
  });

  const response = await api.editTask({ id, text, status });

  if (response.status === "ok") {
    dispatch({
      type: EDIT_TASK_SUCCESS,
      payload: { id, text, status },
    });
  } else {
    if (response.message.token) {
      setTimeout(() => {
        Cookies.remove('token');
        dispatch({
          type: SIGN_OUT,
        });
        dispatch({
          type: EDIT_TASK_OPEN_DIALOG,
          payload: {showDialog: false,}
        });
      }, 3000);
    }
    dispatch({
      type: EDIT_TASK_ERROR,
      payload: response.message,
    });
  }
};
