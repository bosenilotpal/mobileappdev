import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DecisionHomeScreen from "./decision/decisionHomeScreen";
import WhosGoingScreen from "./decision/whosGoingScreen";
import ChoiceScreen from "./decision/choiceScreen";
import ResultScreen from "./decision/resultScreen";
import FinalScreen from "./decision/finalScreen";

const Stack = createStackNavigator();

export default function DecisionScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="DecisionHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecisionHome" component={DecisionHomeScreen} />
      <Stack.Screen name="WhosGoing" component={WhosGoingScreen} />
      <Stack.Screen name="Choice" component={ChoiceScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Final" component={FinalScreen} />
    </Stack.Navigator>
  );
}
