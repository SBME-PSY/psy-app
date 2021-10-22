import { NativeBaseProvider,Center,FormControl,Input, Icon,Button} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faEye, faLock } from "@fortawesome/free-solid-svg-icons";


const Signin=()=>{
    const {t,i18n} = useTranslation();
    const [isPasswordShown,setIsPasswordShown]=useState(false);
    return(
        <NativeBaseProvider>
                <Center mt="10%" px={5}>
                            <FormControl my={2} isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Email')}</FormControl.Label>
                                <Input 
                                    variant="underlined"
                                    placeholder= {t('Email')}
                                    InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faEnvelope} />}  mr={5} />}/>
                            </FormControl>
                            <FormControl my={2} isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Password')}</FormControl.Label>    
                                    <Input  
                                        type={isPasswordShown ? "text":"password"}
                                        variant="underlined"
                                        InputRightElement={<Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsPasswordShown(!isPasswordShown)}  />}
                                        placeholder= {t('Password')}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                            </FormControl>
                            <FormControl my='10'>
                                <Button bgColor="success.500"  _pressed={{bgColor:"#003049"}} borderRadius={50}>{t('Sign-In')}</Button>
                            </FormControl>
                </Center>
        </NativeBaseProvider>
    )
}

export default  Signin;