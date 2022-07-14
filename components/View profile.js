import { Avatar, Center, HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select,Accordion,Box, Toast} from 'native-base';
import React,{useEffect,useState} from 'react';
import axios ,{Axios} from 'axios';
import Constants from "expo-constants";
import {Dimensions, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe, faClinicMedical, faEnvelope, faEye, faEyeSlash,faFileSignature,faHeart, faLock, faPhone, faUser, faVenusMars, faSignOutAlt, faPlus, faFile  } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Imageupload from './Image Upload';
import { SvgUri , SvgCssUri } from 'react-native-svg';
import * as yup from 'yup';
import { Alert, I18nManager, TouchableOpacity, Image } from 'react-native';
import getAuthData from '../hooks/getAuthData';
import Lightbox from 'react-native-lightbox-v2';
import { Restart } from 'fiction-expo-restart';


  //address is still to be added
export default function Viewprofile({navigation,role,Address_label,Name_label,header_color,navigator}){
    const {t,i18n} = useTranslation();
    const [loading , Isloading] = useState(true);
    const [profileData,setProfileData] = useState();
    const [showNameModal, setShowNameModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPictureModal, setShowPictureModal] = useState(false);
    const [showMaritalStatusModal, setShowMaritalStatusModal] = useState(false);
    const [isCurrenrtPasswordShown,setIsCurrenrtPasswordShown]=useState(false);
    const [isNewPasswordShown,setIsNewPasswordShown]=useState(false);
    const [isconfirmNewPasswordShowen,setIsconfirmNewPasswordShown] = useState(false);

    const toastSuccessOptions = {
        title: t('Edited Successfully'),
        placement:'top',
        animation:'ease-in-out',
        status:'success'
    }

    const toastFailOptions = {
        title: t('Sorry, Some thing went wrong'),
        placement:'top',
        animation:'ease-in-out',
        status:'error'
    }



    const getData = async ()=>{
        // let token =  await AsyncStorage.getItem('token');
        let authData  = await getAuthData();
        axios.get(`/psy/${role}s/profile`,{
            headers: {
                Authorization: `Bearer ${authData.token}`
            }
        })
        .then((response) => {
            // console.log(response.data);
            setProfileData(response.data.data);
            Isloading(false);
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(t('Sorry, Some thing went wrong'), ToastAndroid.SHORT);
        });
    }

    const logout =()=>{
        AsyncStorage.clear();
        navigation.navigate('Landing');
    }

    const editData = async (newData)=>{
        // let token = await AsyncStorage.getItem('token');
        let authData  = await getAuthData();
        axios.patch(`/psy/${role}s/profile`,newData,{
            headers:{
                Authorization: `Bearer ${authData.token}`
            }
        })
        .then(res =>{
            console.log(res.data);
            setTimeout(()=>{
                getData();
                setShowNameModal(false);
                setShowEmailModal(false);
                setShowPasswordModal(false);
                setShowMaritalStatusModal(false);
                setShowPhoneModal(false);
                setShowPictureModal(false);
            },500);
            Toast.show(toastSuccessOptions)
        })
        .catch(err => {
            console.error(err);
            setTimeout(()=>{
                getData();
                setShowNameModal(false);
                setShowEmailModal(false);
                setShowPasswordModal(false);
                setShowMaritalStatusModal(false);
                setShowPhoneModal(false);
                setShowPictureModal(false);
            },500);
            Toast.show(toastFailOptions)
        })
    }

    const editPassword = async (newData)=>{
        // let token = await AsyncStorage.getItem('token');
        let authData  = await getAuthData();
        axios.patch(`/psy/${role}s/update-password/`,newData,{
            headers:{
                Authorization: `Bearer ${authData.token}`
            }
        })
        .then(res =>{
            console.log(res.data);
            setTimeout(()=>{
                setShowNameModal(false);
                setShowEmailModal(false);
                setShowPasswordModal(false);
                setShowMaritalStatusModal(false);
                setShowPhoneModal(false);
                setShowPictureModal(false);
                Toast.show(toastSuccessOptions)
            },500);
            AsyncStorage.clear()
            console.log('data cleared')
            navigation.navigate('Landing')
        }).catch(err => {
            console.log(err.message)
            Toast.show(toastFailOptions)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{getData();},500)
    },[])

    if(loading === true){
        return(
            <NativeBaseProvider>
                <VStack h='100%'>
                    <HStack mt='90%' justifyContent='center' alignItems='center' ><Text>   <Spinner size='lg'   color='success.300' />  </Text></HStack>
                </VStack>
            </NativeBaseProvider>
        )
    }

    else{
        // view doctor or user profile
        return(
            <NativeBaseProvider>
                <VStack safeArea justifyContent='center'>
                    <VStack h='26%'>
                        <HStack w='100%' h='50%'  bgColor={header_color} justifyContent='center' >
                            <Lightbox navigator={navigator} ><Avatar size='xl' source={{uri:profileData.picture}} zIndex={3} mt='5' /></Lightbox>
                        </HStack>
                        <HStack  h='54%' justifyContent='center'>
                            <Text  fontWeight='bold' mt='12'  fontSize='2xl'> {profileData.name}</Text>
                        </HStack>
                    </VStack>
                    <ScrollView mt={5}  h='65%'>

                        <HStack mt='1' pt='2'>  
                        <TouchableOpacity onPress={()=>{
                            i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar' )
                            I18nManager.allowRTL(i18n.language === 'ar' ? true : false)
                            I18nManager.forceRTL(i18n.language === 'ar' ? true : false)
                            Restart()
                            console.log(i18n.language)
                        }}>
                                <Text ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faGlobe} />  {t('Change Language to:')} { I18nManager.isRTL ? 'English' : 'العربية'}</Text> 
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' pt='2' width='100%'>
                            <TouchableOpacity onPress={()=> setShowNameModal(true)}>
                                <Text ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faFileSignature} />  {t('Edit your Name')}</Text> 
                            </TouchableOpacity>
                        </HStack>

                        {(role === 'user') &&
                            <HStack mt='3' pt='2' width='100%'>
                                <TouchableOpacity onPress={()=> navigation.navigate('testResults')}>
                                    <Text ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faFile} />  {t('Your test results')}</Text> 
                                </TouchableOpacity>
                            </HStack>
                        }
                        

                        <HStack mt='3'  pt='2' >
                            <TouchableOpacity onPress={()=> setShowPasswordModal(true)}>
                                <Text  ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faLock} /> {t('Edit your Password')}</Text>
                            </TouchableOpacity>
                        </HStack>

                        {(role === 'doctor')&&
                        
                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> setShowPictureModal(true)}>
                                <Text ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faUser} /> {t('Edit your Profile Picture')}</Text> 
                            </TouchableOpacity>
                        </HStack>
                        }

                        {(role === 'doctor')&&
                        <>
                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=>  navigation.navigate('addClinics') } >
                                <Text ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faPlus} /> {t('Add Clinics')}</Text> 
                            </TouchableOpacity>
                        </HStack>
                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> navigation.navigate('showClinics')}>
                                <Text  ml='2'  fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faClinicMedical} /> {t('Show Clinics')}</Text>
                            </TouchableOpacity>
                        </HStack>
                        </>
                        }

                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> setShowEmailModal(true)}>
                                <Text  ml='2'  fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faEnvelope} /> {t('Email')}: {profileData.email}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> setShowMaritalStatusModal(true)}>
                                <Text  ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faHeart} /> {t('Marital Status')}: {profileData.maritalStatus}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> Alert.alert(t('Sorry'),t('You cant change your gender after sign up 😞'))}>
                                <Text  ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faVenusMars} /> {t('Gender')}: {profileData.sex}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={()=> setShowPhoneModal(true)}>
                                <Text  ml='2' fontWeight='bold' fontSize='lg' > <FontAwesomeIcon icon={faPhone} /> {t('Phone Number')}: {profileData.phone}</Text>
                            </TouchableOpacity>
                        </HStack>
                        
                        <HStack mt='3' pt='2'>
                            <TouchableOpacity onPress={logout}>
                                <Text  textAlign='center' ml='2' fontWeight='bold' color='error.500' fontSize='lg' > <FontAwesomeIcon icon={faSignOutAlt} /> {t('Logout')}</Text>
                            </TouchableOpacity>
                        </HStack>


                        {/* Edit name */}

                        <Modal size='xl'   avoidKeyboard={true} isOpen={showNameModal} onClose={() => setShowNameModal(false)}   >
                                    <Modal.Content>
                                    <Modal.CloseButton />
                                    <Modal.Header>{t('Edit your Name')}</Modal.Header>
                                    <Modal.Body>
                                        <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{name:`${profileData.name}`}}>
                                            {(props)=>(
                                                <>
                                                    <FormControl isRequired>
                                                        <FormControl.Label _text={{color:'#003049'}}>{t(Name_label)}</FormControl.Label>
                                                            <Input
                                                                variant="underlined"
                                                                placeholder= {t('Doctor Name')}
                                                                onChangeText={props.handleChange('name')}
                                                                value={props.values.name}
                                                                InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faUser} />}  mr={5} />}
                                                                onBlur={props.handleBlur('name')}
                                                                />
                                                        <Text color='danger.500' >{ props.touched.name &&  props.errors.name}</Text>
                                                    </FormControl>
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowNameModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                </>
                                            )}
                                        </Formik>
                                    </Modal.Body>
                                    </Modal.Content>
                        </Modal>

                        {/* Edit Email */}

                                <Modal size='xl' isOpen={showEmailModal} onClose={()=> setShowEmailModal(false)}>
                                    <Modal.Content>
                                        <Modal.CloseButton />
                                        <Modal.Header>Edit Email</Modal.Header>
                                        <Modal.Body>
                                            <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{email:`${profileData.email}`}}
                                            >
                                                {(props)=>(
                                                    <>
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
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowEmailModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                    </>
                                                )}
                                            </Formik>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                                {/* Edit Phone */}
                                <Modal size='xl' isOpen={showPhoneModal} onClose={()=> setShowPhoneModal(false)}>
                                    <Modal.Content>
                                        <Modal.CloseButton />
                                        <Modal.Header>Edit Phone Number</Modal.Header>
                                        <Modal.Body>
                                            <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{phone:`${profileData.phone}`}}
                                            >
                                                {(props)=>(
                                                    <>
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
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowPhoneModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                    </>
                                                )}
                                            </Formik>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>

                                {/* Edit Password */}
                                <Modal size='xl' isOpen={showPasswordModal} onClose={()=> setShowPasswordModal(false)}>
                                    <Modal.Content>
                                        <Modal.CloseButton />
                                        <Modal.Header>Edit your Password</Modal.Header>
                                        <Modal.Body>
                                            <Formik
                                                onSubmit={(newData)=>{
                                                    editPassword(newData)
                                                }
                                                }
                                            initialValues={{currentPassword:``,newPassword:``,confirmNewPassword:``,role:role}}
                                            >
                                                {(props)=>(
                                                    <>
                                                    <FormControl my={2} isRequired>
                                                        <FormControl.Label _text={{color:'#003049'}}>{t('Current Password')}</FormControl.Label>
                                                        <Input  
                                                            placeholder= {t('Current Password')}
                                                            onChangeText={props.handleChange('currentPassword')}
                                                            value={props.values.currentPassword}
                                                            onBlur={props.handleBlur('currentPassword')}
                                                            type={isCurrenrtPasswordShown ? "text":"password"}
                                                            variant="underlined"
                                                            InputRightElement={!isCurrenrtPasswordShown ? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsCurrenrtPasswordShown(!isCurrenrtPasswordShown)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsCurrenrtPasswordShown(!isCurrenrtPasswordShown)}/>}
                                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                                            <Text color='danger.500' >{ props.touched.currentPassword && props.errors.currentPassword}</Text>
                                                    </FormControl>
                                                    <FormControl my={2} isRequired>
                                                        <FormControl.Label _text={{color:'#003049'}}>{t('New Password')}</FormControl.Label>
                                                        <Input  
                                                            placeholder= {t('New Password')}
                                                            onChangeText={props.handleChange('newPassword')}
                                                            value={props.values.newPassword}
                                                            onBlur={props.handleBlur('newPassword')}
                                                            type={isNewPasswordShown? "text":"password"}
                                                            variant="underlined"
                                                            InputRightElement={!isNewPasswordShown ? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsNewPasswordShown(!isNewPasswordShown)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsNewPasswordShown(!isNewPasswordShown)}/>}
                                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                                            <Text color='danger.500' >{ props.touched.confirmNewPassword && props.errors.confirmNewPassword}</Text>
                                                    </FormControl>
                                                    <FormControl my={2} isRequired>
                                                        <FormControl.Label _text={{color:'#003049'}}>{t('Confirm New Password')}</FormControl.Label>
                                                        <Input  
                                                            placeholder= {t('Confirm New Password')}
                                                            onChangeText={props.handleChange('confirmNewPassword')}
                                                            value={props.values.confirmNewPassword}
                                                            onBlur={props.handleBlur('confirmNewPassword')}
                                                            type={isconfirmNewPasswordShowen ? "text":"password"}
                                                            variant="underlined"
                                                            InputRightElement={!isconfirmNewPasswordShowen? <Icon as={<FontAwesomeIcon  icon={faEye} />} onPress={()=> setIsconfirmNewPasswordShown(!isconfirmNewPasswordShowen)}  /> :  <Icon as={<FontAwesomeIcon  icon={faEyeSlash} />} onPress={()=> setIsconfirmNewPasswordShown(!isconfirmNewPasswordShowen)}/>}
                                                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faLock} />}  mr={5} />}/>
                                                            <Text color='danger.500' >{ props.touched.confirmNewPassword&& props.errors.confirmNewPassword}</Text>
                                                    </FormControl>
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowPasswordModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                    </>
                                                )}
                                            </Formik>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                                
                                {/* Edit Profile Picture */}
                                <Modal size='xl' isOpen={showPictureModal} onClose={()=> setShowPictureModal(false)}>
                                    <Modal.Content>
                                        <Modal.CloseButton />
                                        <Modal.Header>Edit your Profile Picture</Modal.Header>
                                        <Modal.Body>
                                            <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{}}
                                            >
                                                {(props)=>(
                                                    <>
                                                    <FormControl my={2} isRequired>
                                                        <FormControl.Label  _text={{color:'#003049'}}>{t('Profile Picture')}</FormControl.Label>
                                                        <Imageupload values_object={props.values}/>
                                                    </FormControl>
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowPictureModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                    </>
                                                )}
                                            </Formik>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>

                                {/* maritalStatus */}
                                <Modal size='xl' isOpen={showMaritalStatusModal} onClose={()=> setShowMaritalStatusModal(false)}>
                                    <Modal.Content>
                                        <Modal.CloseButton />
                                        <Modal.Header>Marital Status</Modal.Header>
                                        <Modal.Body>
                                            <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{maritalStatus:`${profileData.maritalStatus}`}}
                                            >
                                                {(props)=>(
                                                    <>
                                                    <FormControl my={2} isRequired >
                                                        <FormControl.Label><Text color='#003049'>{t('Marital Status')}</Text></FormControl.Label>
                                                            <Select onValueChange={props.handleChange('maritalStatus')} value={props.values.maritalStatus} placeholder={t('Marital Status')}>
                                                                <Select.Item label={t('Married')} value='Married'></Select.Item>
                                                                <Select.Item label={t('Single')} value='Single'></Select.Item>
                                                            </Select>
                                                    </FormControl>
                                                    <Button.Group justifyContent='flex-end' space={2}>
                                                    <Button
                                                        variant="ghost"
                                                        colorScheme="blueGray" onPress={() => {setShowMaritalStatusModal(false);}}>
                                                            {t('Cancel')} 
                                                    </Button>
                                                    <Button onPress={props.handleSubmit} >{t('Edit')}</Button>
                                                    </Button.Group>
                                                    </>
                                                )}
                                            </Formik>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>

                    </ScrollView>
                </VStack>
            </NativeBaseProvider>
        )
    }

}