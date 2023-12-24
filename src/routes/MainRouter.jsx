import React from "react";
import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ButtonNavigationIcon } from "../components/ButtonNavigationIcon";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/colors";
import TabsRouter from "./TabsRouter";
import { CommentsScreen } from "../screens/CommentsScreen";
import { MapScreen } from "../screens/MapScreen";

const MainRouter = () => {
  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ gestureEnabled: false }}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={TabsRouter}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <ButtonNavigationIcon
                iconName="arrow-left"
                color={colors.iconColor}
                type="goBack"
              />
            ),
            headerTitle: "Коментарі",
            headerLeftContainerStyle: {
              paddingLeft: 16,
            },
            headerTitleAlign: "center",
          })}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerLeft: () => (
              <ButtonNavigationIcon
                iconName="arrow-left"
                color={colors.iconColor}
                navigateTo="ProfileScreen"
              />
            ),
            headerTitle: "Карта",
            headerLeftContainerStyle: {
              paddingLeft: 16,
            },
          }}
        />
        {/* <MainStack.Screen name="CreatePost" component={CreatePostsScreen} /> */}
        {/* <MainStack.Screen
          name="Posts"
          component={TabsRouter}
          options={{
            title: "Публікації",
            headerTitleAlign: "center",
            headerRightContainerStyle: {
              paddingRight: 16,
            },
            headerStyle: {
              shadowColor: "#000",
              shadowOpacity: 0.3,
            },
            headerRight: () => (
              <ButtonNavigationIcon
                iconName="log-out"
                color={colors.iconLogOut}
                navigateTo="Registration"
              />
            ),
          }}
        /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
