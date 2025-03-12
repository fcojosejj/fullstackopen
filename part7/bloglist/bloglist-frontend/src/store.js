import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: loginReducer,
    users: userReducer,
  },
});

export default store;