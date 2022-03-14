import React, { useEffect, useState} from "react";
import {Text,NativeBaseProvider,VStack,Box,Button, HStack,Select, Center,Image} from "native-base";
import { StyleSheet, View } from "react-native";
import { ImageBackground ,Dimensions} from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt,faUserPlus, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTranslation } from "react-i18next"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import psyLogo from '../assets/Img/psy-logo.png'
import TypingText from "react-native-typical";
import { flexDirection } from "styled-system";

export default function waiting({navigation}){
    useEffect(()=>{
        setTimeout(async()=>{
            let stringAuthData= await AsyncStorage.getItem('authData')
            let authData = JSON.parse(stringAuthData)
            if(authData !== null){
              authData.role === 'doctor' ? navigation.navigate('Doctorhome') : navigation.navigate('Userhome')
            }
            else{
              navigation.navigate('Landing')
            }
          },2000)
    }
,[])
    return(
        <NativeBaseProvider>
                <VStack safeArea>
                    <Image source={psyLogo} alt='psy-logo' size={500}/>
                    {/* <Text textAlign='center' fontWeight='bold' fontSize={20} ></Text> */}
                    <TypingText
                        steps={['Psy-Awareness',1000]}
                        loop={1}
                        style={style.typewriter}
                    />
                </VStack>
        </NativeBaseProvider>
    )
};
const style = StyleSheet.create({
    // container:{
    //     display: 'flex'
    // },
    typewriter:{
        textAlign: "center",
        fontSize:20,
        fontWeight: "bold"
    }
})
