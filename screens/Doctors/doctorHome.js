import { Center, NativeBaseProvider , Text} from "native-base";
import React,{useEffect,useState} from "react";
import WelcomeSVG from "../../components/WelcomeSVG";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { BackHandler, Alert } from 'react-native'

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

const Doctorhome=({navigation})=>{
    const {t,i18n} = useTranslation();
    useEffect(()=>{
        navigation.addListener('beforeRemove',(e)=>{
          e.preventDefault();
          Alert.alert(t("Stop"),t("Are you sure you want to exit the app?"),[
            {
              text: t("Cancel"),
              onPress: ()=>null,
              style:"cancel"
            },
            {
              text:t("Yes"),
              onPress: ()=>BackHandler.exitApp(),
              style: "default"
            }
          ])      
        })
      },[])

    return(
        <NativeBaseProvider>
            <Center mt='20%' height="50%">
                <WelcomeSVG/>
            </Center>
            <Center mt='10'>
                <Text fontSize='3xl' color='danger.500'>{t('Hello Doctor')}</Text>
                <Text mt='5'  textAlign='center' px='4' >{t('Your Application is pending and is being checed by our Admins. Click the icon on the top left most of your screen to see what is availabe for now')}</Text>
            </Center>
        </NativeBaseProvider>
    )
}

export default Doctorhome;