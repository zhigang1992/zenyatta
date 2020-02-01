import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationNativeContainer,
  useTheme
} from "@react-navigation/native";
import RecentPage from "./pages/recent/RecentPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MorePage from "./pages/recent/MorePage";
import MoreIcon from "../assets/more.svg";
import RecentIcon from "../assets/recent.svg";
import { useColorScheme } from "react-native-appearance";
import { useAppTheme } from "./styles/Theme";

type NavStackParams = {
  home: undefined;
};

const NavStack = createStackNavigator<NavStackParams>();
const ModalStack = createStackNavigator<ModelStackParams>();

type ModelStackParams = {
  homeNav: undefined;
};

type HomeTabParams = {
  recent: undefined;
  more: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParams>();

const HomeTabPage = () => {
  const { tabActive, tabInactive } = useAppTheme().colors;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: tabActive,
        inactiveTintColor: tabInactive
      }}
    >
      <Tab.Screen
        name={"recent"}
        component={RecentPage}
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <RecentIcon fill={color} />
        }}
      />
      <Tab.Screen
        name={"more"}
        component={MorePage}
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <MoreIcon fill={color} />
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNav = () => (
  <NavStack.Navigator>
    <NavStack.Screen
      name={"home"}
      component={HomeTabPage}
      options={{ title: "Zenyatta" }}
    />
  </NavStack.Navigator>
);

const Routes = () => {
  const scheme = useColorScheme();
  return (
    <NavigationNativeContainer
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <ModalStack.Navigator mode={"modal"} headerMode={"none"}>
        <ModalStack.Screen name="homeNav" component={HomeNav} />
      </ModalStack.Navigator>
    </NavigationNativeContainer>
  );
};

// Modal -> NavStack -> TabPage -> [Recent, More]
export default Routes;
