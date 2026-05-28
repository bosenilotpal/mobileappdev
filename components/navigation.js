import React from "react";
import { Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "../screens/people/peopleScreen";
import DecisionScreenNavigation from "../screens/decisionScreenNavigation";
import RestaurantsScreen from "../screens/restaurants/restaurantsScreen";

const Tab = createMaterialTopTabNavigator();

const renderTabIcon = (color) => (
  <Image
    source={require("../assets/icon.png")}
    style={{ width: 20, height: 20, tintColor: color }}
    resizeMode="contain"
  />
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Restaurants"
        screenOptions={{
          tabBarShowIcon: true,
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarActiveTintColor: "#ff0000",
          swipeEnabled: true,
          animationEnabled: true,
          lazy: false,
        }}
      >
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          options={{ tabBarIcon: ({ color }) => renderTabIcon(color) }}
        />
        <Tab.Screen
          name="Decision"
          component={DecisionScreenNavigation}
          options={{ tabBarIcon: ({ color }) => renderTabIcon(color) }}
        />
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{ tabBarIcon: ({ color }) => renderTabIcon(color) }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
