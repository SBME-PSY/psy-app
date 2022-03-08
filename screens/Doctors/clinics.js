import { Button, Center, FormControl, Input, NativeBaseProvider,Spinner,Text, VStack,Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import axios from "axios";
import { faPhone} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dimensions } from "react-native";
import * as yup from 'yup';
import { Rating ,AirbnbRating} from "react-native-ratings";


const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

  const Clinics = ({navigation})=>{
    
    const {t,i18n} = useTranslation();
    
    const [emptyClinics,isClinicEmpty] = useState(false);
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
        axios.get(`http://${api}/psy/doctors/clinics/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
            Isloading(false);
            setClinics(res.data.data);
            if(res.data.data.length == 0){
                isClinicEmpty(true)
                console.log('data is Empty')
            }
        })
    }

    const addClinicData  = async () =>{

    } 



    useEffect(()=>{
        setTimeout(()=>{
            getClinics();
        },500)
    },[])

    return(
        <NativeBaseProvider>
            <VStack backgroundColor='white' height={Dimensions.get('window').height} safeArea>
                <Center >
                {loading && <Spinner mt={20} size='lg' color='success.500'/> }
                {emptyClinics &&
                <>
                    <Text mx={5} mt={5} fontWeight='bold'  textAlign='center' color='error.500'  >{t('Sorry But You have no Clinics data. You should fill Yor clinics Data below')}</Text>
                    <Formik
                        initialValues={{address:'',rating:'',pictures:[''],phoneNumbers:'',price:''}}
                        validationSchema={ReviewSchema}
                        onSubmit={(data,actions)=>{
                            axios.post(`http://${api}/psy/doctors/clinics/`,data,{
                                headers:{
                                    Authorization: `Bearer ${token}`
                                }
                            }).then((res)=>{
                                console.log(res);
                                actions.resetForm()
                            }).catch((err)=>{
                                console.log(err);
                            })
                        }}
                    >   
                        {(props)=>{
                            <>
                                <FormControl  my={2}>
                                    <FormControl.Label _text={{color:'#003049'}}>{t('Clinc Address')}</FormControl.Label>
                                    <Input onChangeText={props.handleChange('address')}
                                        value={props.values.address}
                                        onBlur={props.handleBlur('address')}
                                        variant="underlined"
                                    />
                                    <Text color='danger.500' >{ props.touched.address && props.errors.address}</Text>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                            <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number')}</FormControl.Label>
                                            <FormControl.HelperText>{t('The Phone number should consist of 11 numbers and start with 011,012,010, or 015')}</FormControl.HelperText>
                                                <Input 
                                                onChangeText={props.handleChange('phoneNumbers')}
                                                value={props.values.phoneNumbers}
                                                type={'number'}
                                                keyboardType='phone-pad'
                                                variant="underlined"
                                                placeholder= {t('Phone Number')}
                                                InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                </FormControl>
                                <AirbnbRating
                                    selectedColor="#facc15"
                                    reviewColor="#003049"
                                    count={5}
                                    reviews={["Terrible", "Decent","OK", "Good", "Amazing"]}
                                    defaultRating={1.5}
                                    size={40}
                                    onFinishRating={(rating)=>{
                                        props.handleChange('rating')
                                    }}
                                />
                                <FormControl my={2} isRequired>
                                            <FormControl.Label _text={{color:'#003049'}}>{t('Price')}</FormControl.Label>
                                                <Input 
                                                onChangeText={props.handleChange('price')}
                                                value={props.values.price}
                                                type={'number'}
                                                keyboardType='phone-pad'
                                                variant="underlined"
                                                placeholder= {t('Phone Number')}
                                                InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                </FormControl>
                            </>
                        }}
                    </Formik>
                </>
                }
                </Center>
            </VStack>
        </NativeBaseProvider>
    )
}
export default Clinics;