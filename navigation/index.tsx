import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/QuizScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
