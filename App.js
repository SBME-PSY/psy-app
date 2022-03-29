import Landing from "./screens/Landing_Page";
import React,{useEffect} from "react";
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
import waiting from "./screens/WaitingPage";
import { faHome, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios ,{Axios} from 'axios';
import Constants from "expo-constants";

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev? manifest.debuggerHost.split(`:`).shift().concat(`:8000`): `api.example.com`;

const baseURL = axios.defaults.baseURL = `http://${api}`



const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function DoctorTabs () {
  const {t,i18n} = useTranslation();
  return(
    <Tab.Navigator  

      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerShown:false,
        tabBarStyle:{
          height:60,
          backgroundColor:'#003049',
          borderTopLeftRadius:20,
          borderTopRightRadius:20
        }
      }}
    >
      <Tab.Screen options={{
        tabBarLabel:t('Home'),
        tabBarIcon: ({focused,size})=> (<FontAwesomeIcon size={size} color={!focused ? '#a8a29e':'#fff'} icon={faHome} />)
      }} name='Doctorhome'  component={Doctorhome}
      />
      <Tab.Screen options={{
        tabBarLabel:t('Profile'),
        tabBarIcon: ({focused,size})=> (<FontAwesomeIcon size={size} color={!focused ? '#a8a29e':'#fff'} icon={faUserCircle} />)
      }} name='ViewDoctorProfile'  component={ViewDoctorProfile} />
    </Tab.Navigator>
  )
}

function UserTabs (){
  const {t,i18n} = useTranslation();


  return(
    <Tab.Navigator initialRouteName="Home" 
    screenOptions={{

      tabBarInactiveTintColor:'#cbd5e1',
      tabBarActiveTintColor: '#fff',
      headerShown:false,
      tabBarStyle:{
        height:60,
        backgroundColor:'#059669',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
      }
    }}
    >
      <Tab.Screen   
        options={{
          tabBarLabel:t('Home'),
          tabBarLabelStyle:{
            fontSize:12,
          },
          tabBarIcon: ({focused,size})=> (<FontAwesomeIcon size={size} color={focused ? '#fff':'#cbd5e1'} icon={faHome} />)
        }} name='UserHome'  component={Userhome} 
      />
      <Tab.Screen options={{
        tabBarLabel:t('Profile'),
        tabBarIcon: ({focused,size})=> (<FontAwesomeIcon size={size} color={focused ? '#fff':'#cbd5e1'} icon={faUserCircle} />)
      }} name='ViewUserProfile'  component={ViewUserProfile} />
    </Tab.Navigator>
  )
}


export default function App() {
  const {t,i18n} = useTranslation();
  return (
    <>
      <NavigationContainer >
        <Stack.Navigator  >
          <Stack.Screen name="waiting" options={{ headerShown: false }}  component={waiting}></Stack.Screen>
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
          <Stack.Screen name="Doctortabs" options={{ headerShown: false }}  component={DoctorTabs}  />
          <Stack.Screen name="Usertabs" options={{ headerShown: false }}  component={UserTabs}  />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}