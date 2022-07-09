import { NativeBaseProvider,Center,FormControl,Input, Icon,Button,Text} from "native-base";
import React, { useState,useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faEye, faLock,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import Constants from "expo-constants";
import * as yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import storeAuthData from "../hooks/storeAuthData";


const Signin=({btn_color,pressed_btn_color,role})=>{

    const navigation = useNavigation();
    const ref_input_2= useRef();
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    const [token,setToken]= useState('')
    const ReviewSchema  = yup.object().shape({
        email: yup.string().email(t('your Email format is not right')).required(t('Email is Required')),
        password: yup.string().required(t('Password is Required'))
    })


    return(
        <NativeBaseProvider>
                <Center mt="10%" px={5}>
                    <Formik
                        initialValues={{email:'',password:''}}
                        validationSchema={ReviewSchema}
                        onSubmit={ (data,actions)=> {
                            data["role"]= role;
                            axios.post(`/psy/${role}s/login`,data,{
                                headers:{
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(res=>{
                                console.log(role)
                                    storeAuthData(res.data.token,role);
                                    console.log(res.data.token,role);
                                    if(role === 'doctor'){
                                        navigation.navigate('Doctortabs');
                                    }
                                    else{
                                        navigation.navigate('Usertabs');
                                    }
                                    actions.resetForm();  
                            })         
                            .catch(err=>{
                                console.log(err);
                                Alert.alert(t('Opps'),t('Email or Password are invalid. Please make sure u entered the correct Email & Password'))
                            })
                            }
                        } 
                    >
                        {(props)=>(
                            <>
                            <FormControl my={2} isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Email')}</FormControl.Label>
                                <Input
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                    value = {props.values.email}
                                    onSubmitEditing={()=> ref_input_2.current.focus()}
                                    variant="underlined"
                                    InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faEnvelope} />}  mr={5} />}/>
                                    <Text color='danger.500' >{ props.touched.email &&  props.errors.email}</Text>
                            </FormControl>
                            <FormControl my={2} isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Password')}</FormControl.Label>    
                                    <Input  
                                        onChangeText={props.handleChange('password')}
                                        onBlur={props.handleBlur('password')}
                                        value = {props.values.password}
                                        ref={ref_input_2}
                                        type={isPasswordShown ? "text":"password"}
                                        variant="underlined"
                                        InputRightElement={!isPasswordShown ? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}/>}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                    <Text color='danger.500' >{ props.touched.password &&  props.errors.password}</Text>
                            </FormControl>
                            <FormControl my='10'>
                                <Button bgColor={btn_color} onPress={props.handleSubmit} _pressed={{bgColor:pressed_btn_color}} borderRadius={50}>{t('Sign-In')}</Button>
                            </FormControl>
                            </>
                        )}
                    </Formik>
                </Center>
        </NativeBaseProvider>
    )
}

export default  Signin;