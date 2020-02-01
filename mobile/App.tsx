import React from "react";
import Routes from "./src/Routes";
import { AppearanceProvider } from "react-native-appearance";

export default function App() {
  return (
    <AppearanceProvider>
      <Routes />
    </AppearanceProvider>
  );
}
