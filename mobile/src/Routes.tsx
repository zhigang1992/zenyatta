import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationNativeContainer
} from "@react-navigation/native";
import RecentPage from "./pages/recent/RecentPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MorePage from "./pages/recent/MorePage";
import MoreIcon from "../assets/more.svg";
import RecentIcon from "../assets/recent.svg";
import { useColorScheme } from "react-native-appearance";
import { useAppTheme } from "./styles/Theme";
import AddIcon from "./pages/recent/components/AddIcon";

type RecentStackParams = {
  recentRoot: undefined;
};

const RecentStack = createStackNavigator<RecentStackParams>();

type ModelStackParams = {
  homeTab: undefined;
};
const ModalStack = createStackNavigator<ModelStackParams>();

const RecentStackPage = () => (
  <RecentStack.Navigator>
    <RecentStack.Screen
      name={"recentRoot"}
      component={RecentPage}
      options={{
        title: "Zenyatta",
        headerRight: () => <AddIcon />
      }}
    />
  </RecentStack.Navigator>
);

type HomeTabParams = {
  recent: undefined;
  more: undefined;
};
const HomeTab = createBottomTabNavigator<HomeTabParams>();

const HomeTabPage = () => {
  const { tabActive, tabInactive } = useAppTheme().colors;
  return (
    <HomeTab.Navigator
      tabBarOptions={{
        activeTintColor: tabActive,
        inactiveTintColor: tabInactive
      }}
    >
      <HomeTab.Screen
        name={"recent"}
        component={RecentStackPage}
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <RecentIcon fill={color} />
        }}
      />
      <HomeTab.Screen
        name={"more"}
        component={MorePage}
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <MoreIcon fill={color} />
        }}
      />
    </HomeTab.Navigator>
  );
};

const Routes = () => {
  const scheme = useColorScheme();
  return (
    <NavigationNativeContainer
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <ModalStack.Navigator mode={"modal"} headerMode={"none"}>
        <ModalStack.Screen name="homeTab" component={HomeTabPage} />
      </ModalStack.Navigator>
    </NavigationNativeContainer>
  );
};

// Modal
//  -> TabPage
//    -> [RecentNav, MoreNav]
export default Routes;
