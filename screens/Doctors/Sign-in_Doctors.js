import { NativeBaseProvider,VStack,Box,Text,Heading,  KeyboardAvoidingView, Center} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Signin from "../../components/Sign-in";

const Doctorsignin=()=>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    return(
        <NativeBaseProvider>
            <VStack width='100%' height='100%' bg='#003049' >
                <KeyboardAvoidingView>
                        <Box width='100%' mt='20%' height='20%'>
                            <Text textAlign='center' color="#FEFDFF"  fontSize="3xl" fontWeight="bold" >Psy-Awareness</Text>
                            <Text textAlign='center'  ml="10%" width='80%' color="#FEFDFF"  fontSize="2xl" fontWeight="bold"  >{t('Hello Doctor')}</Text>
                        </Box>
                </KeyboardAvoidingView>
                <Box height='80%' width="100%" bg='white' borderTopRadius={50} >
                    <Signin btn_color='#003049' role='doctor' pressed_btn_color='success.500' />
                </Box>
            </VStack>
        </NativeBaseProvider>
    )
}

export default Doctorsignin;