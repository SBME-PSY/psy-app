import Landing from "./screens/Landing_Page";
import React from "react";
import i18n from './languages/i18n';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Doctorsignup from "./screens/Doctor Signup";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" options={{ headerShown: false }}  component={Landing}></Stack.Screen>
        <Stack.Screen name="Doctorsignup" options={{ headerShown: false }}  component={Doctorsignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}