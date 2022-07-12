import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox, FormControl, ScrollView, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet, ToastAndroid,Dimensions, Alert} from "react-native";
import { TouchableOpacity } from "react-native";
import { Formik } from "formik";
import getAuthData from "../../hooks/getAuthData";

export default function testResults({navigation,route}){
    const [loading,isLoading] = useState(true);
    const [scores,setScores] = useState()

    const getScores = async ()=>{
        let authData = await getAuthData()
        axios.get('/psy/results',{
            headers:{
                'Accept': 'application/json',
                Authorization: `Bearer ${authData.token}`
        }
        }).then(res=>{
            console.log(res.data.data)
            setScores(res.data.data)
            isLoading(false)
        }
        ).catch(error=>{
            console.log(error)
        }
        )
    }
    useEffect(()=>{
        setTimeout(()=>{
            getScores()
        }
        ,1000)
    },[])

    return(
        <NativeBaseProvider>
            {loading && <HStack mt='10%' justifyContent='center' alignItems='center' ><Spinner size='lg'   color='success.300' /></HStack>}
            {}
        </NativeBaseProvider>
    )
}