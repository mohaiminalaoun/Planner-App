const initialState = {
    loggedin: false,
    userName: ""
  },
  ACT_TYPES = {
    FACEBOOK_LOGIN: "facebookLogin"
  };

const TasksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === "undefined") {
    return state;
  } else if (type === ACT_TYPES.FACEBOOK_LOGIN) {
    return Object.assign({}, initialState, {
      loggedin: payload.loggedin,
      userName: payload.userName
    });
  }
  return state;
};

export default TasksReducer;
