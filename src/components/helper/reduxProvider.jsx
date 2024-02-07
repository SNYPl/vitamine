"use client";
import { Provider } from "react-redux";
import store from "@/store/index";

export const ReduxToolkitProvider = ({ children }) => {
  return <Provider store={store}>{children} </Provider>;
};
