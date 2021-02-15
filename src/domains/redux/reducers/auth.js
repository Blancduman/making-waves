import {
  SIGN_IN_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_OPEN_DIALOG,
  SIGN_OUT,
  SIGN_IN_RESET_ERRORS,
  SIGN_IN_SET_USERNAME,
  SIGN_IN_SET_PASSWORD,
} from "../types";

const getLocalToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
}

export const auth = (
  state = {
    auth: getLocalToken() || false,
    username: '',
    password: '',
  },
  action
) => {
  switch (action.type) {
    case SIGN_IN_LOADING: {
      const { error, ...oldState } = state;
      return {
        isLoading: true,
        ...oldState,
        username: '',
        password: ''
      };
    }

    case SIGN_IN_SUCCESS: {
      return {
        auth: true,
        username: '',
        password: ''
      };
    }

    case SIGN_IN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case SIGN_IN_OPEN_DIALOG: {
      return {
        ...state,
        showDialog: action.payload,
      };
    }

    case SIGN_OUT: {
      return {
        showDialog: false,
        username: '',
        password: ''
      };
    }

    case SIGN_IN_RESET_ERRORS: {
      const newState = { ...state };
      delete newState.error[action.payload];

      return {
        ...newState,
      };
    }

    case SIGN_IN_SET_USERNAME: {
      const {error, ...oldState} = state;
      
      return {
        ...oldState,
        username: action.payload,
      }
    }

    case SIGN_IN_SET_PASSWORD: {
      const {error, ...oldState} = state;
      
      return {
        ...oldState,
        password: action.payload,
      }
    }

    default:
      return state;
  }
};
