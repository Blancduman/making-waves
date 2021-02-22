import TestAPI from "../../../networks/api";
import {
  ADD_TASK_OPEN_DIALOG,
  ADD_TASK_LOADING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  ADD_TASK_SET_USERNAME,
  ADD_TASK_SET_EMAIL,
  ADD_TASK_SET_TEXT,
} from "../types";

const api = new TestAPI();

export const openCreateTaskDialog = (openDialog) => (dispatch) =>
  dispatch({
    type: ADD_TASK_OPEN_DIALOG,
    payload: openDialog,
  });

export const createTask = (username, email, text) => async (
  dispatch,
  getState
) => {
  const state = getState();
  if (state.addTask.isLoading) {
    return;
  }
  dispatch({
    type: ADD_TASK_LOADING,
  });

  const response = await api.addTask(username, email, text);

  if (response.status === "ok") {
    dispatch({
      type: ADD_TASK_SUCCESS,
    });
  } else {
    dispatch({
      type: ADD_TASK_ERROR,
      payload: response.message,
    });
  }
};

export const addTaskSetUsername = (username) => (dispatch) =>
  dispatch({
    type: ADD_TASK_SET_USERNAME,
    payload: username,
  });

export const addTaskSetEmail = (email) => (dispatch) =>
  dispatch({
    type: ADD_TASK_SET_EMAIL,
    payload: email,
  });

export const addTaskSetText = (text) => (dispatch) =>
  dispatch({
    type: ADD_TASK_SET_TEXT,
    payload: text,
  });
