import { NativeBaseProvider,VStack,Center,Box,Text,Heading, FormControl,Input, Icon,  Select, Button, ScrollView, Spinner} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  faCertificate, faEnvelope, faEye, faHome, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Imageupload from "./Image Upload";
import { Formik } from "formik";
import * as yup from 'yup';
import { alignContent, flex } from "styled-system";



const Registerform = ({name,address,isdoctor,certificate,certificate_pic_label,signup}) =>{
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    const {t,i18n} = useTranslation();
    const ReviewSchema= yup.object({
        Username: yup.string().required(t('Your name is Required')).min(5,t('minimum letters in the name field is 5')),
        email: yup.string().required(t('Email is Required')).email(t('your Email format is not right')),
        // password: yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,t("Password must contain at least 8 characters, one uppercase, one number and one special case character")).required(t('Password is Required')),
    })
    return(
        <NativeBaseProvider>
                <Box width="100%">
                    <VStack>
                        <Center mt="10%" px={5}>
                            <Formik initialValues={{Username:'',email:'',password:'',certificate:'',sex:'',marital_status:'',address:'',phone_num:''}}
                                onSubmit={(values)=> console.log(values) }
                                validationSchema={ReviewSchema}
                                >
                                {(props)=>(
                                    <>
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t(name)}</FormControl.Label>
                                            <Input
                                                variant="underlined"
                                                placeholder= {t('Username')}
                                                onChangeText={props.handleChange('Username')}
                                                value={props.values.Username}
                                                InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faUser} />}  mr={5} />}
                                                onBlur={props.handleBlur('Username')}
                                                />
                                        <Text color='danger.500' >{ props.touched.Username &&  props.errors.Username}</Text>
                                    </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Profile Picture')}</FormControl.Label>
                                        <Imageupload values_object={props.values} pic_label='profile picture'  btn_caption='Pick a Picture'/>
                                    </FormControl>
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
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Password')}</FormControl.Label>
                                        <FormControl.HelperText>{t("the password should be 8 characters. you must also use 1 numbers and 1 special character like !")}</FormControl.HelperText>
                                        <Input  
                                            onChange={props.handleChange('password')}
                                            onBlur={props.handleBlur('password')}
                                            value={props.values.password}
                                            type={isPasswordShown ? "text":"password"}
                                            variant="underlined"
                                            InputRightElement={<Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}  />}
                                            placeholder= {t('Password')}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                            <Text color='danger.500' >{ props.touched.password && props.errors.password}</Text>
                                    </FormControl>
                                    {isdoctor && (
                                        <>
                                            <FormControl my={2} isRequired>
                                                <FormControl.Label _text={{color:'#003049'}}>{t(certificate)}</FormControl.Label>
                                                    <Input 
                                                        onChange={props.handleChange('certificate')}
                                                        value={props.values.certificate}
                                                        variant="underlined"
                                                        placeholder= {t('Enter your collage certificate')}
                                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faCertificate} />}  mr={5} />}/>
                                            </FormControl>
                                            <FormControl my={2} isRequired>
                                                <FormControl.Label _text={{color:'#003049'}}>{t(certificate_pic_label)}</FormControl.Label>
                                                <Imageupload values_object={props.values} pic_label='Certificate Picture' btn_caption='upload a picture of your college degree' />
                                            </FormControl>
                                        </>
                                    )}
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label><Text color='#003049'>{t('choose your gender')}</Text></FormControl.Label>
                                        <Select onValueChange={props.handleChange('sex')} value={props.values.sex} placeholder={t('Sex')}>
                                            <Select.Item label={t('Male')} value={t('Male')}></Select.Item>
                                            <Select.Item label={t('Female')} value={t('Male')}></Select.Item>
                                        </Select>
                                    </FormControl>
                                    <FormControl my={2} isRequired >
                                        <FormControl.Label><Text color='#003049'>{t('Marital Status')}</Text></FormControl.Label>
                                            <Select onValueChange={props.handleChange('marital_status')} value={props.values.marital_status} placeholder={t('Marital Status')}>
                                                <Select.Item label={t('Married')} value={t('Married')}></Select.Item>
                                                <Select.Item label={t('Single')} value={t('Single')}></Select.Item>
                                            </Select>
                                        </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t(address)}</FormControl.Label>
                                            <Input 
                                            onChangeText={props.handleChange('address')}
                                            value={props.values.address}
                                            variant="underlined"
                                            placeholder= {t(address)}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faHome} />}  mr={5} />}/>
                                    </FormControl>
                                    <FormControl my={2} isRequired>
                                        <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number')}</FormControl.Label>
                                            <Input 
                                            onChangeText={props.handleChange('phone_num')}
                                            value={props.values.phone_num}
                                            type={'number'}
                                            keyboardType={'phone-pad'}
                                            variant="underlined"
                                            placeholder= {t('Phone Number')}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                    </FormControl>
                                    <FormControl my="5">
                                        <Button   onPress={props.handleSubmit} bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50}>{t(signup)}</Button>
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