import Landing from "./screens/Landing_Page";
import React from "react";
import './languages/i18n'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Doctorlanding from "./screens/Doctors/Doctor Landing";
import Userregister from "./screens/Users/User Register";
import { useTranslation } from "react-i18next";
import Doctorregister from "./screens/Doctors/Doctor Register";
import Doctorsignin from "./screens/Doctors/Sign-in_Doctors";
import Usersignin from "./screens/Users/Sign-in_User";
import Doctorhome from "./screens/Doctors/doctorHome";
import Userhome from "./screens/Users/userHome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewDoctorProfile from "./screens/Doctors/View Doctor Profile";
import ViewUserProfile from './screens/Users/View User Profile';
import addClinics from "./screens/Doctors/addClinics";
import waiting from "./screens/WaitingPage";
import { faHome, faList, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios  from 'axios';
import Constants from "expo-constants";
import testCategories from "./screens/Users/testCategories";
import showClinics from "./screens/Doctors/showClinic";
import tests from "./screens/Users/tests";
import selectTest from "./screens/Users/selectTest";
import testResults from "./screens/Users/testResults";

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev? manifest.debuggerHost.split(`:`).shift().concat(`:8000`): `api.example.com`;
const baseURL = axios.defaults.baseURL = 'https://psy-web.herokuapp.com'



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
          backgroundColor:'#003049',
          height:60,
          position: 'absolute',
          bottom: 16,
          paddingBottom: 3,
          marginHorizontal:12,
          borderRadius: 20,
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
  const {t,i18n} = useTranslation()


  return(
    <Tab.Navigator initialRouteName="Home" 
    screenOptions={{

      tabBarInactiveTintColor:'#cbd5e1',
      tabBarActiveTintColor: '#fff',
      headerShown:false,
      tabBarStyle:{
        backgroundColor:'#059669',
        height:60,
        position: 'absolute',
        bottom: 16,
        paddingBottom: 3,
        marginHorizontal:12,
        borderRadius: 20,
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
      <Tab.Screen options={{
        tabBarLabel:t('Tests'),
        tabBarIcon: ({focused,size})=> (<FontAwesomeIcon size={size} color={focused ? '#fff':'#cbd5e1'} icon={faList} />)
      }} name='testsCat'  component={testCategories} />
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
          <Stack.Screen  name='addClinics'  component={addClinics} options={{
            title:t("Add Clinics"),
            headerTintColor:"white",
            headerTitleAlign: 'center',
            headerStyle:{backgroundColor:"#003049"},
            headerTitleStyle:{color:"#FEFDFF"},
          }}/>
          <Stack.Screen  name='showClinics'  component={showClinics} options={{
            title:t("Show Clinics"),
            headerTintColor:"white",
            headerTitleAlign: 'center',
            headerStyle:{backgroundColor:"#003049"},
            headerTitleStyle:{color:"#FEFDFF"},
          }}/>
          <Stack.Screen name="Doctorsignin" options={{ headerShown: false }}  component={Doctorsignin}/>
          <Stack.Screen name="Usersignin" options={{ headerShown: false }}  component={Usersignin}/>
          <Stack.Screen name="Doctortabs" options={{ headerShown: false }}  component={DoctorTabs}  />
          <Stack.Screen name="Usertabs" options={{ headerShown: false }}  component={UserTabs}  />
          <Stack.Screen name="selectTest" 
          options={{
            title:t("Availabe Tests"),
            headerTintColor:"white",
            headerTitleAlign: 'center',
            headerStyle:{backgroundColor:"#059669"},
            headerTitleStyle:{color:"#FEFDFF"},
          }}
          component={selectTest}  />
          <Stack.Screen name="tests" 
            options={{
              title:t("Test Questions"),
              headerTintColor:"white",
              headerTitleAlign: 'center',
              headerStyle:{backgroundColor:"#059669"},
              headerTitleStyle:{color:"#FEFDFF"},
            }}
            component={tests}  />
            <Stack.Screen name="testResults" 
            options={{
              title:t("Test Results"),
              headerTintColor:"white",
              headerTitleAlign: 'center',
              headerStyle:{backgroundColor:"#059669"},
              headerTitleStyle:{color:"#FEFDFF"},
            }}
            component={testResults}  />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}