import { NativeBaseProvider,VStack,Heading, ScrollView} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView } from "native-base";
import Registerform from "../components/Register form";
const Userregister=()=>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);

    return(
        <NativeBaseProvider>
            <ScrollView>
            <VStack  width="100%">
                <KeyboardAvoidingView  width="100%">
                        <Heading mt="10" fontSize="2xl" fontWeight="bold"  textAlign="center" color="#003049" >{t('Welcome to our App')} </Heading>
                        <Heading fontSize="sm" mt="2"  textAlign="center" color="#003049" >{t('Just a few more steps to start')} !!!</Heading>
                </KeyboardAvoidingView>
                <Registerform  isdoctor={false} username='Username'  address="Address" signup ='Sign-Up' />
            </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Userregister;