import { NativeBaseProvider,VStack,Center,Box,Text,Input, Icon,  Select, Button,FormControl} from "native-base";
import React, { useState ,useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  faEnvelope, faEye, faEyeSlash, faHome, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Imageupload from "./Image Upload";
import { Formik } from "formik";
import * as yup from 'yup';
import { Alert } from "react-native";
import ResumeUpload from "./Resume Upload";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from "axios";
import CVPicture from "./CertificatePictureUpload";


const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;


const Registerform = ({navigation,Name_label,address_label,isdoctor,signup,role}) =>{
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    const [isConfirmPasswordShown,setIsConfirmPasswordShown]=useState(false);
    const {t,i18n} = useTranslation();
    const ReviewSchema= yup.object().shape({
        age: yup.number().lessThan(18,t('You must be 18 or older to start using our App')).required(t('Age is required')),
        phone: yup.string().required(t('Phone number is required')),
        name: yup.string().required(t('Your name is Required')).min(5,t('minimum letters in the name field is 5')),
        email: yup.string().required(t('Email is Required')).email(t('your Email format is not right')),
        password: yup.string().matches("^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*",t("Password must contain at least 8 characters, one uppercase, one number and one special case character")).required(t('Password is Required')),
        confirmPassword: yup.string().when("password",{
            is: val=>(val && val.length > 0 ? true : false),
            then:yup.string().oneOf(
                [yup.ref("password")],
                t('Both password need to be the same')
            )
        }).required(t("Please confirm your password"))
    });

    const storeData= async (value,role)=>{
        try{     
            await  AsyncStorage.setItem('authData',JSON.stringify({
            token: value,
            role: role
        }));
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <NativeBaseProvider>
                <Box width="100%">
                    <VStack>
                        <Center mt="10%" px={5}>
                            <Formik
                            initialValues={{name:'',email:'',password:'',age:'',relativePhone:'',confirmPassword:'',sex:'',maritalStatus:'',address:'',phone:''}}
                                onSubmit={ (data,actions)=> {
                                    data["role"]= role;
                                    console.log(data)
                                    axios.post(`http://${api}/psy/${role}s/signup`,data,{
                                        headers:{
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'multipart/form-data; boundry=----aslfakslkf'
                                        }
                                    })
                                    .then(res=>{
                                        storeData(res.data.token,role);
                                        console.log(res.data.token,role);
                                        Alert.alert(t('Congratulations'),t('You have just completed your Sign-up, go and start using the app'),[{text:t('Start using the App'), onPress:()=> {isdoctor ? navigation.navigate('Doctorsignin',data):navigation.navigate('Usersignin',data)}   }]);
                                        actions.resetForm();
                                    }).catch(err=>{
                                        Alert.alert(t('Warning'),t('Some of the data you entered didnt match our critira. Please check the data entered to make sure it follows all the guides we provide to you'),[{text:'go back',onPress: console.log('pressed')}])
                                        console.log('error',err)
                                    })
                                    }
                                } 
                                validationSchema={ReviewSchema}
                                >
                                {(props)=>(
                                    <>
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t(Name_label)}</FormControl.Label>
                                            <Input
                                                variant="underlined"
                                                placeholder= {t(Name_label)}
                                                onChangeText={props.handleChange('name')}
                                                value={props.values.name}
                                                InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faUser} />}  mr={5} />}
                                                onBlur={props.handleBlur('name')}
                                                />
                                        <Text color='danger.500' >{ props.touched.name &&  props.errors.name}</Text>
                                    </FormControl>
                                    {/* <FormControl my={2} isRequired>
                                        <FormControl.Label  _text={{color:'#003049'}}>{t('Profile Picture')}</FormControl.Label>
                                        <Imageupload values_object={props.values}/>
                                    </FormControl> */}
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Email')}</FormControl.Label>
                                        <Input 
                                            onChangeText={props.handleChange('email')}
                                            onBlur={props.handleBlur('email')}
                                            value={props.values.email}
                                            variant="underlined"
                                            placeholder= {t('Email')}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faEnvelope} />}  mr={5} />}
                                            />
                                            <Text color='danger.500' >{ props.touched.email && props.errors.email}</Text>
                                    </FormControl>
                                    {(role === 'user') && 
                                        <FormControl my={2} isRequired>
                                                <FormControl.Label _text={{color:'#003049'}}>{t('Age')}</FormControl.Label>
                                                <Input 
                                                onChangeText={props.handleChange('age')}
                                                value={props.values.age}
                                                variant="underlined"
                                                placeholder= {t('Age')}
                                                keyboardType='phone-pad'
                                                />
                                            <Text color='danger.500' >{ props.touched.age && props.errors.age}</Text>
                                        </FormControl>
                                    }
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Password')}</FormControl.Label>
                                        <FormControl.HelperText>{t("the password should be 8 characters. you must also use 1 numbers and 1 special character like !")}</FormControl.HelperText>
                                        <Input  
                                            placeholder= {t('Password')}
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.password}
                                            onBlur={props.handleBlur('password')}
                                            type={isPasswordShown ? "text":"password"}
                                            variant="underlined"
                                            InputRightElement={!isPasswordShown ? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}/>}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                            <Text color='danger.500' >{ props.touched.password && props.errors.password}</Text>
                                    </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Confirm Password')}</FormControl.Label>
                                        <Input  
                                            placeholder= {t('Confirm Password')}
                                            onChangeText={props.handleChange('confirmPassword')}
                                            value={props.values.confirmPassword}
                                            onBlur={props.handleBlur('confirmPassword')}
                                            type={isConfirmPasswordShown ? "text":"password"}
                                            variant="underlined"
                                            InputRightElement={!isConfirmPasswordShown? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsConfirmPasswordShown(!isConfirmPasswordShown)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsConfirmPasswordShown(!isConfirmPasswordShown)}/>}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                            <Text color='danger.500' >{ props.touched.confirmPassword&& props.errors.confirmPassword}</Text>
                                    </FormControl>
                                    {isdoctor && (
                                        <FormControl my='5'>
                                            <FormControl.Label>{t('Resume')}</FormControl.Label>
                                            {/* <ResumeUpload values_object={props.values} /> */}
                                            <CVPicture values_object={props.values} />
                                        </FormControl>
                                    )}
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label><Text color='#003049'>{t('choose your gender')}</Text></FormControl.Label>
                                        <Select onValueChange={props.handleChange('sex')} value={props.values.sex} placeholder={t('Sex')}>
                                            <Select.Item label={t('Male')} value='Male'></Select.Item>
                                            <Select.Item label={t('Female')} value='Female'></Select.Item>
                                        </Select>
                                    </FormControl>
                                    <FormControl my={2} isRequired >
                                        <FormControl.Label><Text color='#003049'>{t('Marital Status')}</Text></FormControl.Label>
                                            <Select onValueChange={props.handleChange('maritalStatus')} value={props.values.maritalStatus} placeholder={t('Marital Status')}>
                                                <Select.Item label={t('Married')} value='Married'></Select.Item>
                                                <Select.Item label={t('Single')} value='Single'></Select.Item>
                                            </Select>
                                    </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t(address_label)}</FormControl.Label>
                                            <Input 
                                            onChangeText={props.handleChange('address')}
                                            value={props.values.address}
                                            variant="underlined"
                                            placeholder= {t(address_label)}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faHome} />}  mr={5} />}/>
                                    </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number')}</FormControl.Label>
                                         <FormControl.HelperText>{t('The Phone number should consist of 11 numbers and start with 011,012,010, or 015')}</FormControl.HelperText>
                                            <Input 
                                            onChangeText={props.handleChange('phone')}
                                            value={props.values.phone}
                                            type={'number'}
                                            keyboardType='phone-pad'
                                            variant="underlined"
                                            placeholder= {t('Phone Number')}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                    </FormControl>
                                    {!isdoctor && 
                                        <FormControl my={2} isRequired>
                                            <FormControl.Label _text={{color:'#003049'}}>{t('Relative Phone Number')}</FormControl.Label>
                                                <FormControl.HelperText>{t('The Phone number should consist of 11 numbers and start with 011,012,010, or 015')}</FormControl.HelperText>
                                                <FormControl.HelperText>{t('This is optional and not required but prefered')}</FormControl.HelperText>
                                                <Input 
                                                    onChangeText={props.handleChange('relativePhone')}
                                                    value={props.values.relativePhone}
                                                    type={'number'}
                                                    keyboardType='phone-pad'
                                                    variant="underlined"
                                                    placeholder= {t('Relative Phone Number')}
                                                    InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                        </FormControl>
                                    }
                                    <FormControl my="5">
                                        <Button  onPress={props.handleSubmit} bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50}>{t(signup)}</Button>
                                    </FormControl>
                                    </>
                                )}
                            </Formik>
                        </Center>
                    </VStack>
                </Box>

        </NativeBaseProvider>
    )

}

export default Registerform;