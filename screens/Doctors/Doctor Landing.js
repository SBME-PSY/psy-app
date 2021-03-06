import React from "react";
import { useTranslation } from "react-i18next";
import { NativeBaseProvider, VStack,Text, Box, Center, Button,Heading} from "native-base";
import { faSignInAlt,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const Doctorlanding=({navigation})=>{
    const {t,i18n} = useTranslation();
    return(
        <NativeBaseProvider>
            <VStack width="100%" height="100%">
                <Box height="35%" width="100%" borderBottomRadius={50} bgColor="#003049">
                    <Text  color="#FEFDFF" textAlign='center' fontSize="3xl" fontWeight="bold" mt="15%" >Psy-Awareness</Text>
                    <Text  color="#FEFDFF" textAlign='center' fontSize="md" fontWeight="bold" mt={8}>{t('Thank you for trusting us')}</Text>
                </Box>
                <Box width="100%">
                    <VStack>
                        <Center mt="10%">
                            <Text fontSize="xl" >{t('What would you like to do?')} </Text>
                            <Button bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50} onPress={()=>navigation.navigate('Doctorsignin')} px={5} my="10%"><Text color='#FEFDFF' fontSize="lg" >{t('Sign-In')} <FontAwesomeIcon color='#FEFDFF' icon={faSignInAlt}/></Text></Button>
                            <Button bgColor="#003049"  onPress={()=> navigation.navigate('Doctorregister')}    _pressed={{bgColor:"success.500"}} borderRadius={50}  px={5}><Text color='#FEFDFF' fontSize="lg" >{t('Sign-Up as a doctor')} <FontAwesomeIcon color='#FEFDFF' icon={faUserPlus}/></Text></Button>
                        </Center>
                    </VStack>
                </Box>
            </VStack>
        </NativeBaseProvider>
    )
}

export default Doctorlanding;