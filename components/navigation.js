import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PeopleScreen from "../screens/people/peopleScreen";
import DecisionScreenNavigation from "../screens/decisionScreenNavigation";
import RestaurantsScreen from "../screens/restaurants/restaurantsScreen";

const Tab = createMaterialTopTabNavigator();

const renderTabIcon = (activeName, inactiveName) => ({ color, focused }) => (
  <Ionicons name={focused ? activeName : inactiveName} size={22} color={color} />
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
          tabBarInactiveTintColor: "#999",
          swipeEnabled: true,
          animationEnabled: true,
          lazy: false,
        }}
      >
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          options={{ tabBarIcon: renderTabIcon("people", "people-outline") }}
        />
        <Tab.Screen
          name="Decision"
          component={DecisionScreenNavigation}
          options={{ tabBarIcon: renderTabIcon("shuffle", "shuffle-outline") }}
        />
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{ tabBarIcon: renderTabIcon("restaurant", "restaurant-outline") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
