import { NativeBaseProvider,VStack,Center,Box,Text,Heading, FormControl,Input, Icon,  Select, Button, ScrollView} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faEnvelope, faEye, faHome, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";

const Registerform = ({username,address,isdoctor,certificate,certificate_pic,signup}) =>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);

    return(
        <NativeBaseProvider>
                <Box width="100%">
                    <VStack>
                        <Center mt="10%" px={5}>
                                <FormControl isRequired >
                                    <FormControl.Label _text={{color:'#003049'}}>{t(username)}</FormControl.Label>
                                    <FormControl.HelperText>{t('The username should be 8 characters length. you can use numbers but not symbols')}</FormControl.HelperText>
                                        <Input
                                            maxLength={8}
                                            variant="underlined"
                                            placeholder= {t('Username')}
                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faUser} />}  mr={5} />}/>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label _text={{color:'#003049'}}>{t('Profile Picture')}</FormControl.Label>
                                    <Button w="80%" borderRadius={50}><Text textAlign="center" color="white">{t('Pick a Picture')} <FontAwesomeIcon color="white" icon={faCamera}/> </Text></Button>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label _text={{color:'#003049'}}>{t('Email')}</FormControl.Label>
                                    <Input 
                                        variant="underlined"
                                        placeholder= {t('Email')}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faEnvelope} />}  mr={5} />}/>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label _text={{color:'#003049'}}>{t('Password')}</FormControl.Label>
                                    <FormControl.HelperText>{t("the password should be 8 characters. you can also use numbers and symbols")}</FormControl.HelperText>
                                    <Input  
                                        maxLength={8}
                                        type={isPasswordShown ? "text":"password"}
                                        variant="underlined"
                                        InputRightElement={<Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}  />}
                                        placeholder= {t('Password')}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                </FormControl>
                                {isdoctor && (
                                    <>
                                        <FormControl my={2} isRequired>
                                            <FormControl.Label _text={{color:'#003049'}}>{t(certificate)}</FormControl.Label>
                                                <Input 
                                                    variant="underlined"
                                                    placeholder= {t('Enter your collage certificate')}
                                                    InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                        </FormControl>
                                        <FormControl my={2} isRequired>
                                            <FormControl.Label _text={{color:'#003049'}}>{t(certificate_pic)}</FormControl.Label>
                                            <Button  borderRadius={50}><Text textAlign="center" color="white">{t('upload a picture of your college degree')} <FontAwesomeIcon color="white" icon={faCamera}/> </Text></Button>
                                        </FormControl>
                                    </>
                                )}
                                <FormControl my={2} isRequired>
                                    <FormControl.Label><Text color='#003049'>{t('choose your gender')}</Text></FormControl.Label>
                                    <Select  placeholder={t('Sex')}>
                                        <Select.Item label={t('Male')} value="male"></Select.Item>
                                        <Select.Item label={t('Female')} value="female"></Select.Item>
                                    </Select>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label><Text color='#003049'>{t('Marital Status')}</Text></FormControl.Label>
                                        <Select  placeholder={t('Marital Status')}>
                                            <Select.Item label={t('Married')} value="maried"></Select.Item>
                                            <Select.Item label={t('Single')} value="single"></Select.Item>
                                        </Select>
                                    </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label _text={{color:'#003049'}}>{t(address)}</FormControl.Label>
                                        <Input 
                                        variant="underlined"
                                        placeholder= {t(address)}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faHome} />}  mr={5} />}/>
                                </FormControl>
                                <FormControl my={2} isRequired>
                                    <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number')}</FormControl.Label>
                                        <Input 
                                        type={'number'}
                                        keyboardType={'phone-pad'}
                                        variant="underlined"
                                        placeholder= {t('Phone Number')}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}/>
                                </FormControl>

                                <FormControl my="5">
                                    <Button bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50}>{t(signup)}</Button>
                                </FormControl>
                        </Center>
                    </VStack>
                </Box>
        </NativeBaseProvider>
    )

}

export default Registerform;