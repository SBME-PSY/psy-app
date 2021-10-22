import { NativeBaseProvider,VStack,Center,Box,Text,Heading, FormControl,Input, Icon,  Select, Button, ScrollView} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView } from "native-base";
import Registerform from "../components/Register form";

const Doctorregister=()=>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    // const [email,setEmail]= useState('');
    // const [emailValidated,setEmailValidated]= useState(false);
    // const [username,setUsername]=useState('');
    // const [password,setPassword]=useState('');
    // const validate=(data)=>{
    //     const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // }
    return(
        <NativeBaseProvider>
            <ScrollView>
            <VStack  width="100%">
                <KeyboardAvoidingView  width="100%">
                        <Heading mt="10" fontSize="2xl" fontWeight="bold"  textAlign="center" color="#003049" >{t('Hello Doctor')} </Heading>
                        <Heading fontSize="sm" mt="2"  textAlign="center" color="#003049" >{t('Just a few more steps to start')} !!!</Heading>
                </KeyboardAvoidingView>
                <Registerform  isdoctor={true} username='Username' certificate="Certificate" certificate_pic='Certificate Picture' address="Address" signup ='Sign-Up' />
            </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Doctorregister;