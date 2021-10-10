import Landing from "./screens/Landing_Page";
import React from "react";
import i18n from './languages/i18n';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Doctorlanding from "./screens/Doctor Landing";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" options={{ headerShown: false }}  component={Landing}></Stack.Screen>
        <Stack.Screen name="Doctorlanding" options={{ headerShown: false }}  component={Doctorlanding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}