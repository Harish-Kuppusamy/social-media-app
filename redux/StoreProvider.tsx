"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/Store";

interface StoreProviderProps {
  children: React.ReactNode;
} // Define the props type

// Define the StoreProvider component that accepts children and provides the store to the children components
export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
