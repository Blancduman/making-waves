import {
  FETCH_TASKS_LOADING,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_SUCCESS,
  TASKS_SET_PAGE,
  EDIT_TASK_SUCCESS,
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
        ...action.payload,
      };
    }

    case FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        total_task_count: action.payload.total_task_count,
        isLoading: false,
      };
    }

    case FETCH_TASKS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case TASKS_SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case EDIT_TASK_SUCCESS: {
      const tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            text: action.payload.text,
            status: action.payload.status,
          };
        }
        return task;
      });

      return {
        ...state,
        tasks,
      };
    }

    default:
      return state;
  }
};
