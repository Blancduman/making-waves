import {
  ADD_TASK_OPEN_DIALOG,
  SIGN_IN_ERROR,
  SIGN_IN_LOADING,
  SIGN_IN_OPEN_DIALOG,
  SIGN_IN_RESET_ERRORS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  FETCH_TASKS_LOADING,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  TASKS_SET_PAGE,
  ADD_TASK_LOADING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  ADD_TASK_SET_USERNAME,
  ADD_TASK_SET_EMAIL,
  ADD_TASK_SET_TEXT,
  SIGN_IN_SET_USERNAME,
  SIGN_IN_SET_PASSWORD,
  EDIT_TASK_SET_TEXT,
  EDIT_TASK_SET_STATUS,
  EDIT_TASK_LOADING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_OPEN_DIALOG
} from "./types";
import TestAPI from "../../networks/api";

const testApi = new TestAPI();

export const openSignInDialog = (openDialog) => (dispatch) =>
  dispatch({
    type: SIGN_IN_OPEN_DIALOG,
    payload: openDialog,
  });

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGN_OUT,
  });
}

export const SignIn = (username, password) => async (dispatch) => {
  dispatch({
    type: SIGN_IN_LOADING,
  });
  const response = await testApi.login(username, password);

  if (response.status === "ok") {
    localStorage.setItem('token', response.message.token);
    dispatch({
      type: SIGN_IN_SUCCESS,
    });
  } else {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: response.message,
    });
  }

  console.log(response);
};

export const SignInResetErrors = (field) => async (dispatch) => {
  dispatch({ type: SIGN_IN_RESET_ERRORS, payload: field });
};

export const openCreateTaskDialog = (openDialog) => (dispatch) =>
  dispatch({
    type: ADD_TASK_OPEN_DIALOG,
    payload: openDialog,
  });

export const fetchTasks = ({ sort_field, sort_direction, page }) => async (
  dispatch,
  getState
) => {
  const state = getState();
  if (state.tasks.isLoading) {
    return;
  }
  dispatch({
    type: FETCH_TASKS_LOADING,
  });
  const response = await testApi.getTaskList({
    sort_field,
    sort_direction,
    page,
  });

  if (response.status === "ok") {
    const { tasks, total_task_count } = response.message;
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: { tasks, total_task_count },
    });
  } else {
    dispatch({
      type: FETCH_TASKS_ERROR,
      payload: response.message,
    });
  }

  console.log(response);
};

export const setPage = (page) => (dispatch) =>
  dispatch({
    type: TASKS_SET_PAGE,
    payload: page,
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

  const response = await testApi.addTask(username, email, text);

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

  console.log(response);
};

export const authSetUsername = (username) => (dispatch) =>
  dispatch({
    type: SIGN_IN_SET_USERNAME,
    payload: username,
  });

export const authSetEmail = (email) => (dispatch) =>
  dispatch({
    type: SIGN_IN_SET_PASSWORD,
    payload: email,
  });

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

export const openEditDialog = (showDialog, task) => (dispatch) =>
  dispatch({
    type: EDIT_TASK_OPEN_DIALOG,
    payload: {
      showDialog,
      task,
    },
  });

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

export const editTask = (id,text, status) => async (dispatch, getState) => {
  const state = getState();
  if (state.editTask.isLoading) {
    return;
  }

  dispatch({
    type: EDIT_TASK_LOADING,
  });

  const response = await testApi.editTask({ id, text, status });

  if (response.status === 'ok') {
    dispatch({
      type: EDIT_TASK_SUCCESS,
    });
  } else {
    if (response.message.token === 'Невалидный токен') {
      dispatch({
        type: SIGN_OUT,
      });
    }
    dispatch({
      type: EDIT_TASK_ERROR,
      payload: response.message,
    })
  }
  console.log(response);
}