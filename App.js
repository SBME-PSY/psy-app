import Landing from "./screens/Landing_Page";
import React from "react";
import i18n from './languages/i18n';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Doctorlanding from "./screens/Doctor Landing";
import Userregister from "./screens/User Register";
import { useTranslation } from "react-i18next";
import Doctorregister from "./screens/Doctor Register";


const Stack = createNativeStackNavigator();

export default function App() {
  const {t,i18n} = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" options={{ headerShown: false }}  component={Landing}></Stack.Screen>
        <Stack.Screen name="Doctorlanding" options={{ headerShown: false }} component={Doctorlanding} />
        <Stack.Screen name="Userregister" options={{
        title:t("Register"),
        headerTintColor:"white",
        headerTitleStyle:{color:"#FEFDFF"},
        headerStyle:{backgroundColor:"#003049"}}} component={Userregister} />
        <Stack.Screen  name='Doctorregister'  component={Doctorregister} options={{
          title:t("Register"),
          headerTintColor:"white",
          headerTitleStyle:{color:"#FEFDFF"},
          headerStyle:{backgroundColor:"#003049"}
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}