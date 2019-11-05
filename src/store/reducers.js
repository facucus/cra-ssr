import { combineReducers } from "redux";
import loadData from "../helpers/loadData";

export const getTodos = () => {
  return async dispatch => {
    try {
      loadData("todos").then(data => {
        dispatch({
          type: "ADD_TODOS",
          todos: data
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  todos: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODOS":
      return {
        ...state,
        todos: action.todos
      };

    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
