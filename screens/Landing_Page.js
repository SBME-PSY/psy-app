import React from "react";
import {Text,NativeBaseProvider,VStack,Box,Button} from "native-base";

import { ImageBackground } from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";



export default function Landing() {
  return (
    <NativeBaseProvider>
      <VStack width="100%" height="100%">
        
        <Box height="60%" width="100%" borderBottomRightRadius={50}  bgColor="black"  >
          <ImageBackground blurRadius={3}  borderBottomRightRadius={50} imageStyle={{opacity: 0.6}} source={Therapy_session} style={{flex:1}} resizeMode="cover" >
            <Text color="#FEFDFF" w="90%" fontSize="4xl" fontWeight="bold" mt={75} mb={5} ml={5}>Psy-Awareness</Text>
            <Text color="#FEFDFF" w="90%" fontSize="xl"  ml={5} fontWeight='bold'>
                A Personal Psychiatrist at the Palm of your hand
            </Text>
            <VStack alignItems="center" mt={20}>
              <Button  mb={7} size="md" borderRadius={25} px={20}><Text fontSize="xl" color="#FEFDFF" fontWeight="bold">Sign-Up <FontAwesomeIcon color="#FEFDFF" icon={ faSignInAlt } /> </Text></Button>
              <Button borderRadius={25} px={20} variant="outline"><Text fontSize="xl" color="#FEFDFF" fontWeight="bold">Sign-In <FontAwesomeIcon color="#FEFDFF" icon={ faUserPlus } /></Text></Button>
            </VStack>
          </ImageBackground>
        </Box>
        
        
        </VStack>
        <VStack width="100%" height="40%">
            

        </VStack>
    </NativeBaseProvider>
  );
}