import Landing from "./screens/Landing_Page";
import React from "react";
import i18n from './languages/i18n';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Doctorlanding from "./screens/Doctors/Doctor Landing";
import Userregister from "./screens/Users/User Register";
import { useTranslation } from "react-i18next";
import Doctorregister from "./screens/Doctors/Doctor Register";
import Doctorsignin from "./screens/Doctors/Sign-in_Doctors";
import Usersignin from "./screens/Users/Sign-in_User";
import { I18nManager, View } from "react-native";
import Doctorhome from "./screens/Doctors/doctorHome";
import Userhome from "./screens/Users/userHome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewDoctorProfile from "./screens/Doctors/View Doctor Profile";
import ViewUserProfile from './screens/Users/View User Profile';
import Clinics from './screens/Doctors/clinics';
I18nManager.allowRTL(false)
I18nManager.allowRTL(false);


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function DoctorTabs () {
  const {t,i18n} = useTranslation();
  return(
    <Tab.Navigator initialRouteName='Home' 

      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown:false,
        tabBarStyle:{
          height:60,
          position: 'absolute',
          bottom: 16,
          marginHorizontal:16,
          borderRadius: 20,
        }
      }}
    >
      <Tab.Screen options={{
        tabBarLabel:t('Home'),
      }} name='Doctorhome'  component={Doctorhome} />
      <Tab.Screen options={{
        tabBarLabel:t('Profile'),
      }} name='ViewDoctorProfile'  component={ViewDoctorProfile} />
      {/* <Tab.Screen options={{
        tabBarLabel: t('Clinics')
      }}  name='Clinics' component={Clinics} /> */}
    </Tab.Navigator>
  )
}

function UserTabs (){
  const {t,i18n} = useTranslation();
  return(
    <Tab.Navigator initialRouteName="Home" 
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      headerShown:false,
      tabBarStyle:{
        height:60,
        position: 'absolute',
        bottom: 16,
        marginHorizontal:16,
        borderRadius: 20,
      }
    }}
    >
      <Tab.Screen   
        options={{
          tabBarLabel:t('Home'),
        }} name='UserHome'  component={Userhome} 
      />
      <Tab.Screen options={{
        tabBarLabel:t('Profile'),
      }} name='ViewUserProfile'  component={ViewUserProfile} />
    </Tab.Navigator>
  )
}

// function UserDrawer() {
//   return (
//       <Drawer.Navigator initialRouteName="Userhome">
//         <Drawer.Screen name="Userhome" component={Userhome} />
//       </Drawer.Navigator>
//   );
// }
// function DoctorDrawer() {
//   const {t,i18n} = useTranslation();
//   return (
//       <Drawer.Navigator  initialRouteName="Doctorhome">
//         <Drawer.Screen  options={{title:t('Home') }} name="Doctorhome" component={Doctorhome} />  
//         <Drawer.Screen options={{title:t('Profile') }} name="ViewDoctorProfile" component={ViewDoctorProfile}/>  
//       </Drawer.Navigator>
//   );
// }


export default function App() {
  const {t,i18n} = useTranslation();
  return (
    <>
      <NavigationContainer >
        <Stack.Navigator  >
          
          <Stack.Screen name="Landing" options={{ headerShown: false }}  component={Landing}></Stack.Screen>
          <Stack.Screen name="Doctorlanding" options={{ headerShown: false }} component={Doctorlanding} />
          <Stack.Screen name="Userregister" options={{
            title:t("Register"),
            headerTintColor:"white",
            headerTitleAlign: 'center',
            headerTitleStyle:{color:"#FEFDFF"},
            headerStyle:{backgroundColor:"#003049"}}} component={Userregister} />
          <Stack.Screen  name='Doctorregister'  component={Doctorregister} options={{
            title:t("Register"),
            headerTitleAlign: 'center',
            headerTintColor:"white",
            headerTitleStyle:{color:"#FEFDFF"},
            headerStyle:{backgroundColor:"#003049"}
          }}/>
          <Stack.Screen  name='clinics'  component={Clinics} options={{
            title:t("Clinics"),
            headerTintColor:"white",
            headerTitleAlign: 'center',
            headerStyle:{backgroundColor:"#003049"},
            headerTitleStyle:{color:"#FEFDFF"},
          }}/>
          <Stack.Screen name="Doctorsignin" options={{ headerShown: false }}  component={Doctorsignin}/>
          <Stack.Screen name="Usersignin" options={{ headerShown: false }}  component={Usersignin}/>
          <Stack.Screen name="Doctorhome" options={{ headerShown: false }}  component={DoctorTabs}  />
          <Stack.Screen name="Userhome" options={{ headerShown: false }}  component={UserTabs}  />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}