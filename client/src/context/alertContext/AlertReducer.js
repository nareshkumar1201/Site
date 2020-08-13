import { SHOW_ALERT, DISMISS_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload];
    case DISMISS_ALERT:
      return state.filter((err) => err.id !== action.payload);
    default:
      return {
        ...state,
      };
  }
};

export default AlertReducer;
