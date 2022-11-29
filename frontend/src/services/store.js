import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Functions/userSlice";
import appApi from "./appApi";

//save the current data in store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers
const reducer = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [appApi.reducerPath],
};

//persit store

const persistedUser = persistReducer(persistConfig, reducer);

//creating the store

const store = configureStore({
  reducer: persistedUser,
  middleware: [thunk, appApi.middleware],
});

export default store;
