import {
  ADD_TASK_LOADING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  ADD_TASK_RESET,
  ADD_TASK_SET_USERNAME,
  ADD_TASK_SET_EMAIL,
  ADD_TASK_SET_TEXT,
  ADD_TASK_SET_STATUS,
  ADD_TASK_OPEN_DIALOG,
} from "../types";

export const addTask = (
  state = {
    username: "",
    email: "",
    text: "",
    status: "",
    showDialog: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_TASK_RESET: {
      return {
        isLoading: false,
        username: "",
        email: "",
        text: "",
        status: "",
      };
    }

    case ADD_TASK_LOADING: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        isLoading: true,
      };
    }

    case ADD_TASK_SUCCESS: {
      return {
        username: "",
        email: "",
        text: "",
        status: "",
        success: true,
      };
    }

    case ADD_TASK_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case ADD_TASK_SET_USERNAME: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        username: action.payload,
      };
    }

    case ADD_TASK_SET_EMAIL: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        email: action.payload,
      };
    }

    case ADD_TASK_SET_TEXT: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        text: action.payload,
      };
    }

    case ADD_TASK_SET_STATUS: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        status: action.payload,
      };
    }

    case ADD_TASK_OPEN_DIALOG: {
      return {
        ...state,
        showDialog: action.payload,
      };
    }

    default:
      return state;
  }
};
