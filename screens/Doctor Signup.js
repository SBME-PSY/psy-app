import React from "react";
import { useTranslation } from "react-i18next";
import { NativeBaseProvider, VStack,Text, Box, Center, Button,Heading} from "native-base";
import { faSignInAlt,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Doctorsignup=()=>{
    const {t,i18n} = useTranslation();
    return(
        <NativeBaseProvider>
            <VStack width="100%" height="100%">
                <Box height="40%" width="100%" borderBottomRadius={50} bgColor="#003049">
                    <Heading mt="40%" fontSize="2xl" fontWeight="bold"  textAlign="center" color="#FEFDFF" >{t('Hello Doctor')} !!!</Heading>
                </Box>
                <Box width="100%">
                    <VStack>
                        <Center mt="10%">
                            <Text fontSize="xl" >{t('What would you like to do?')} </Text>
                            <Button bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50} px={5} my="10%"><Text color='#FEFDFF' fontSize="lg" >{t('Sign-In')} <FontAwesomeIcon color='#FEFDFF' icon={faSignInAlt}/></Text></Button>
                            <Button bgColor="#003049" _pressed={{bgColor:"success.500"}} borderRadius={50}  px={5}><Text color='#FEFDFF' fontSize="lg" >{t('Sign-Up')} <FontAwesomeIcon color='#FEFDFF' icon={faUserPlus}/></Text></Button>
                        </Center>
                    </VStack>
                </Box>
            </VStack>
        </NativeBaseProvider>
    )
}

export default Doctorsignup;