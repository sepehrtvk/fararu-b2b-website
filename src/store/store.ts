import { configureStore } from "@reduxjs/toolkit";
import { epicMiddleware, rootEpic } from "./epics";
import persistedReducer from "./slices";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// const customMiddle = (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
