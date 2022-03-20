import React, { useEffect} from "react";
import {NativeBaseProvider,VStack,Image} from "native-base";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import psyLogo from '../assets/Img/psy-logo1.png'
import TypingText from "react-native-typical";

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
