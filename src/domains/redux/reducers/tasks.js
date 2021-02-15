import {
  FETCH_TASKS_LOADING,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_SUCCESS,
  TASKS_SET_PAGE,
} from "../types";

export const tasks = (
  state = {
    tasks: [],
    total_task_count: 0,
    sort_field: "",
    sort_direction: "",
    page: 0,
  },
  action
) => {
  switch (action.type) {
    case FETCH_TASKS_LOADING: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        isLoading: true,
      };
    }

    case FETCH_TASKS_SUCCESS: {
      return {
        tasks: action.payload.tasks,
        total_task_count: action.payload.total_task_count,
      };
    }

    case FETCH_TASKS_ERROR: {
      return {
        tasks: state.tasks,
        total_task_count: state.total_task_count,
        error: action.payload,
      };
    }

    case TASKS_SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    default:
      return state;
  }
};
