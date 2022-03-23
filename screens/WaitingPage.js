import React, { useEffect} from "react";
import {NativeBaseProvider,VStack,Image} from "native-base";
import { StyleSheet, View } from "react-native";
import psyLogo from '../assets/Img/psy-logo1.png'
import TypingText from "react-native-typical";
import getAuthData from "../hooks/getAuthData";

export default function waiting({navigation}){
    useEffect(()=>{
        setTimeout(async()=>{
            let authData = await getAuthData();
            if(authData !== null){
              authData.role === 'doctor' ? navigation.navigate('Doctortabs') : navigation.navigate('Usertabs')
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
