import { useColorScheme } from "react-native-appearance";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    tabActive: "#2C2C2E",
    tabInactive: "#999999"
  }
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    tabActive: "#999999",
    tabInactive: "#2C2C2E"
  }
};

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkTheme : lightTheme;
};
