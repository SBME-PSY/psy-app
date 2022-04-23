import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,ScrollView,Text,Heading,  KeyboardAvoidingView,Card, Center, Spinner,Radio, HStack} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as RN from 'react-native'

export default function tests(){
    const {t,i18n} = useTranslation();
    const [tests, setTests] = useState([]);
    const [loading,isLoading] = useState(true)
    const getTests=()=>{
        axios.get(`/psy/questionnaires`).then((res)=>{
            // console.log(res.data.data[0].tests)
            // settests(res)
            setTests(res.data.data)
            isLoading(false)
            // console.log(tests)
            // isLoading(false)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getTests()
        },500)
    },[])


    return(
        <NativeBaseProvider>
            <VStack safeArea>
                <ScrollView>
                </ScrollView>
            </VStack>
        </NativeBaseProvider>
    )
}