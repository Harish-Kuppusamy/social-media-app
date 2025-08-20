import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../redux/slices/ModalSlice";
import userReducer from "../redux/slices/UserSlice";
import loaderReducer from "../redux/slices/LoadingScreenSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    loading: loaderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
