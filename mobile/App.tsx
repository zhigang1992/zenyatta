import React from "react";
import Routes from "./src/Routes";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { StatusBar } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const AutoStatusBar = () => {
  const scheme = useColorScheme();
  return (
    <StatusBar
      barStyle={scheme === "dark" ? "light-content" : "dark-content"}
    />
  );
};

export default function App() {
  return (
    <AppearanceProvider>
      <ActionSheetProvider>
        <Routes />
      </ActionSheetProvider>
      <AutoStatusBar />
    </AppearanceProvider>
  );
}
