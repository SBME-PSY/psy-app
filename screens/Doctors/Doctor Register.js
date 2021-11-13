import { NativeBaseProvider,VStack,Heading, ScrollView} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView } from "native-base";
import Registerform from "../../components/Register form";

const Doctorregister=({navigation})=>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    return(
        <NativeBaseProvider>
            <ScrollView>
            <VStack  width="100%">
                <KeyboardAvoidingView  width="100%">
                        <Heading mt="10" fontSize="2xl" fontWeight="bold"  textAlign="center" color="#003049" >{t('Hello Doctor')} </Heading>
                        <Heading fontSize="sm" mt="2"  textAlign="center" color="#003049" >{t('Just a few more steps to start')} !!!</Heading>
                </KeyboardAvoidingView>
                <Registerform  isdoctor={true} Name_label='Doctor Name' navigation={navigation} role="doctor" address_label="Clinc Address" signup ='Sign-Up as a doctor' />
            </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Doctorregister;