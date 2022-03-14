import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Box,Text,Heading,  KeyboardAvoidingView, Center, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import axios from "axios";

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

export default function tests(){
    const {t,i18n} = useTranslation();
    const [questions, setquestions] = useState(['hello']);
    const [loading,isLoading] = useState(true)
    const getQuetsioniares=()=>{
        axios.get(`http://${api}/psy/questionnaires`)
        .then((res)=>{
            // console.log(res.data.data)
            setquestions(res.data.data[0].questions)
            isLoading(false)
            console.log(questions)
        })
        .catch(err=>{
            console.log(err.message)
            
        })
    }
    useEffect(()=>{
        setTimeout(()=>{
            getQuetsioniares()
        },500)
    },[])

    return(
        <NativeBaseProvider>
            <VStack safeArea >
                {isLoading && <Spinner color='success.500' size='xl'/>}
                <Text>hekkk</Text>
            </VStack>
        </NativeBaseProvider>
    )
}