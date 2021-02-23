import TestAPI from "../../../networks/api";
import {
  FETCH_TASKS_LOADING,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  TASKS_SET_PAGE,
} from "../types";

const api = new TestAPI();

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
    payload: {
      sort_field,
      sort_direction,
      page,
    },
  });
  const response = await api.getTaskList({
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
};

export const setPage = (page) => (dispatch) =>
  dispatch({
    type: TASKS_SET_PAGE,
    payload: page,
  });
