import React, { useEffect } from "react";
import {Text,NativeBaseProvider,VStack,Box,Button, HStack,Select, Center} from "native-base";
import { ImageBackground ,Dimensions} from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt,faUserPlus, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTranslation } from "react-i18next"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function waiting({navigation}){
    return(
        <NativeBaseProvider>
            <Center height={Dimensions.get('screen').height} backgroundColor='success.100'>
                <VStack >

                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}