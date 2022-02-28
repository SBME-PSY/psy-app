import { Button, Center, NativeBaseProvider,Spinner,Text, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import axios from "axios";
import { Formik } from "formik";
import { Dimensions } from "react-native";
import * as yup from 'yup';
import { Rating ,AirbnbRating} from "react-native-ratings";


const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

  const Clinics = ({navigation})=>{
    
    const {t,i18n} = useTranslation();
      
    const [loading , Isloading] = useState(true);

    const [clinics,setClinics] = useState();

    const ReviewSchema = yup.object().shape({
        address: yup.string().min(5,t('Your Clinic address is invalid')).required(t('This field is required')),
        rating : yup.number().lessThan(0,t('Clinic rating is not valid')).required(t('This field is required')),
        phoneNumbers : yup.string().required(t('Phone number is required')),
        price: yup.number().required(t('This field is required')),
    })

    const getClinics = async()=>{
        let token = await AsyncStorage.getItem('token')
        // try{
        //     const  clinicsData = await axios.get(`http://${api}/psy/doctors/clinics/`,{
        //         headers:{
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //     setTimeout(()=>{
        //         setClinics(clinicsData.data.data);
        //     },500)
        //     Isloading(false);
        //     console.log(clinics);
        // }
        // catch (err){
        //     console.log(err);
        // }
        axios.get(`http://${api}/psy/doctors/clinics/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
            Isloading(false);
            setClinics(res.data.data);
            console.log(clinics)
        })
    }



    useEffect(()=>{
        setTimeout(()=>{
            getClinics();
        },500)
    },[])

    return(
        <NativeBaseProvider>
            <VStack backgroundColor='white' height={Dimensions.get('window').height} safeArea>
                <Center>
                <Text my={5}  textAlign='center'>  {t('Through this page, you can get, Edit, or Add Clinics and their info')} </Text>
                {loading && <Spinner size='lg' color='success.500'/> }
                {clinics &&
                   <Text mx={4} textAlign='center' fontSize={18} fontWeight='bold' color='error.500'  >{t('Sorry But You have no Clinics data. You should fill Yor clinics Data below')}</Text>
                }
                <AirbnbRating
                    selectedColor="#facc15"
                    reviewColor="#003049"
                    count={5}
                    reviews={["Terrible", "Decent","OK", "Good", "Amazing"]}
                    defaultRating={1.5}
                    size={40}
                    onFinishRating={(rating)=>{
                        console.log(rating);
                    }}
                />
                </Center>
            </VStack>
        </NativeBaseProvider>
    )
}
export default Clinics;