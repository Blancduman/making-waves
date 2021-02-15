import {
  EDIT_TASK_LOADING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_SET_TEXT,
  EDIT_TASK_SET_STATUS,
  EDIT_TASK_OPEN_DIALOG,
} from "../types";

export const editTask = (
  state = {
    id: "",
    username: "",
    email: "",
    text: "",
    status: "",
  },
  action
) => {
  switch (action.type) {
    case EDIT_TASK_LOADING: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        isLoading: true,
      };
    }

    case EDIT_TASK_SUCCESS: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        showDialog: false,
        isLoading: false,
      };
    }

    case EDIT_TASK_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case EDIT_TASK_SET_TEXT: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        text: action.payload,
      };
    }

    case EDIT_TASK_SET_STATUS: {
      const { error, ...oldState } = state;
      return {
        ...oldState,
        status: action.payload,
      };
    }

    case EDIT_TASK_OPEN_DIALOG: {
      const { task, showDialog } = action.payload;
      if (task) {
        const {
          id = "",
          username = "",
          email = "",
          text = "",
          status = "",
        } = task;
        return {
          ...state,
          showDialog,
          id,
          username,
          email,
          text,
          status,
        };
      } else {
        return {
          ...state,
          showDialog,
          id: "",
          username: "",
          email: "",
          text: "",
          status: "",
        };
      }
    }

    default:
      return state;
  }
};
