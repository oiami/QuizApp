import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/QuizScreen";
import HomeScreen from "../screens/HomeScreen";
import NameInputScreen from "../screens/NameInputScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen as React.FC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NameInput"
        component={NameInputScreen as React.FC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen as React.FC}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
