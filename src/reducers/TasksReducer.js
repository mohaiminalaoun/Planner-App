const initialState = {
    loggedin: false,
    userName: ""
  },
  ACT_TYPES = {
    SHOW_SUG_FN: "showSuggestionFn",
    HIDE_SUG_FN: "hideSuggestionFn",
    ADD_SEARCH_Q: "addSearchQuery",
    UPDATE_SEARCH: "updateCurrentSearch"
  };

const TasksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === "undefined") {
    return state;
  } else if (type === "facebookLogin") {
    console.log("dispatch worked!!");
    return Object.assign({}, initialState, {
      loggedin: payload.loggedin,
      userName: payload.userName
    });
  }
  return state;
};

export default TasksReducer;
