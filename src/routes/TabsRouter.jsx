import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { PostsScreen } from "../screens/PostsScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ButtonNavigationIcon } from "../components/ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { View, StyleSheet } from "react-native";

const TabsRouter = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "PostsScreen") {
            iconName = "grid";
          }
          if (route.name === "CreatePostsScreen") {
            iconName = "plus";
          }
          if (route.name === "ProfileScreen") {
            iconName = "user";
          }
          return (
            <View style={focused && styles.iconActive}>
              <Feather
                name={iconName}
                size={24}
                color={focused && colors.btnTextColor}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: { height: 83 },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
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
              type="logOut"
              iconName="log-out"
              color={colors.iconColor}
              navigateTo="Login"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            shadowColor: "#000",
            shadowOpacity: 0.3,
          },
          headerLeft: () => (
            <ButtonNavigationIcon
              iconName="arrow-left"
              color={colors.iconColor}
              navigateTo="PostsScreen"
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          tabBarStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconActive: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.btnBgColor,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabsRouter;
