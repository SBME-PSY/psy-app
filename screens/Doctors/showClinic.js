import { Avatar, Center, HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select,Accordion,Box, Toast} from 'native-base';
import { useTranslation } from "react-i18next";
import React,{useState,useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import getAuthData from '../../hooks/getAuthData';
import axios from 'axios';

export default function showClinics({navigation}){
    const {t,i18n} = useTranslation();

    const[isempty,setIsEmpty] = useState(false);

    const[loading,Isloading]= useState(true);


    const getClinics = async () => {
        const authData = await getAuthData()

        axios.get('/psy/doctors/clinics/',{
            headers: {
                Authorization: `Bearer ${authData.token}`}
        }).then(res => {
            console.log(res.data.data);
            if(res.data.data.length === 0){
                setIsEmpty(true)
            }
            Isloading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getClinics()
    },[])

        return(
            <NativeBaseProvider>
                <Center>
                    {loading && <Spinner size={40} mt={40} color='#003049' /> }
                    {isempty && 
                        <>
                            <Text fontWeight='bold' textAlign='center' mt={10} >{t('You have no clinics available. go add some new one')}</Text>
                            <TouchableOpacity  onPress={()=> navigation.navigate('addClinics') } ><Text fontSize={15} mt={15} textDecorationStyle='solid' color='danger.500' textDecorationLine={10}  textDecoration='underline' >{t('Add Clinics')}</Text></TouchableOpacity>
                        </>
                    }
                </Center>
            </NativeBaseProvider>
        )

}