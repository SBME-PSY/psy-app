import { Avatar, Center,  HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select,Accordion,Box, Toast} from 'native-base';
import React,{useEffect,useState} from 'react';
import axios ,{Axios} from 'axios';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleRight, faArrowRight, faClinicMedical, faEnvelope, faEye, faEyeSlash, faGenderless, faHeart, faHome, faLock, faOutdent, faPhone, faUser, faVenusMars  } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Imageupload from './Image Upload';
import { SvgUri , SvgCssUri } from 'react-native-svg';
import * as yup from 'yup';
import { Alert, I18nManager, TouchableOpacity, View } from 'react-native';


const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

  //address is still to be added
export default function Viewprofile({navigation,role,Address_label,Name_label,header_color}){
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
    
    const getData = async ()=>{
        let token = await AsyncStorage.getItem('token')
        axios.get(`http://${api}/psy/${role}s/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data.data);
            // console.log(response.data);
            setProfileData(response.data.data);
            Isloading(false);
        })
        .catch((error) => {
            console.log(error);
            throw Error('Sorry, there has been a Problem while fetching your data');
        });
    }

    const logout =()=>{
        AsyncStorage.removeItem('token');
        navigation.navigate('Landing');
    }

    const editData = async (newData)=>{
        let token = await AsyncStorage.getItem('token');
        axios.patch(`http://${api}/psy/${role}s/profile`,newData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>{
            console.log(res.data);
            Toast.show({
                title: t('Edited Successfully'),
                placement:'top',
                animation:'ease-in-out',
                status:'success'
            })
            setTimeout(()=>{
                getData();
                setShowNameModal(false);
                setShowEmailModal(false);
                setShowPasswordModal(false);
                setShowMaritalStatusModal(false);
                setShowPhoneModal(false);
                setShowPictureModal(false);

            },500);
        })
        .catch(err => {
            console.error(err);
        })
    }

    useEffect(()=>{
        setTimeout(()=>{getData();},500)
    },[])

    if(loading === true){
        return(
            <NativeBaseProvider>
                <VStack h='100%'>
                    <HStack mt='90%' justifyContent='center' alignItems='center' ><Text>   <Spinner size='lg'   color='success.700' />  </Text></HStack>
                </VStack>
            </NativeBaseProvider>
        )
    }

    else{
        // view doctor or user profile
        return(
            <NativeBaseProvider>
                <VStack justifyContent='center'>
                    <VStack h='30%'>
                        <HStack w='100%' h='50%'  bgColor={header_color} justifyContent='center' >
                                {/* <HStack  style={{aspectRatio:1}} w='auto' borderRadius={50}  mt={12} zIndex={3} justifyContent='center' >
                                    <SvgUri width='200' height='120' uri={profileData.picture}/>
                                </HStack> */}
                                <Avatar size='2xl' source={{uri:profileData.picture}} zIndex={3} mt='10' />
                        </HStack>
                        <HStack  h='70%' justifyContent='center'>
                            <Text textAlign='center'  fontWeight='medium' mt='16'  fontSize='2xl'> {profileData.name}</Text>
                        </HStack>
                    </VStack>
                    <ScrollView h='60%'>
                        <Text mt='5' textAlign='center' color='danger.900'>{t('You can edit any field of your Personal Data by just clicking on it and filing your new data 😊')}</Text>

                        <HStack mt='3' borderWidth={1}  py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowNameModal(true)}>
                                <Text ml='2' fontWeight='light' fontSize='lg' >  {t('Edit your Name')}</Text> 
                            </TouchableOpacity>
                        </HStack>
                        

                        <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowPasswordModal(true)}>
                                <Text  ml='2' fontWeight='light' fontSize='lg' > {t('Edit your Password')}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowPictureModal(true)}>
                                <Text ml='2' fontWeight='light' fontSize='lg' > {t('Edit your Profile Picture')}</Text> 
                            </TouchableOpacity>
                        </HStack>


                        <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowEmailModal(true)}>
                                <Text  ml='2'  fontWeight='light' fontSize='lg' > <FontAwesomeIcon icon={faEnvelope} /> {t('Email')}: {profileData.email}</Text>
                            </TouchableOpacity>
                        </HStack>

                        {(role === 'doctor') && <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> navigation.navigate('clinics',{doctor_id:profileData._id})}>
                                <Text  ml='2'  fontWeight='light' fontSize='lg' > <FontAwesomeIcon icon={faClinicMedical} /> {t('Show Clinics')}</Text>
                            </TouchableOpacity>
                        </HStack>}

                        <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowMaritalStatusModal(true)}>
                                <Text  ml='2' fontWeight='light' fontSize='lg' > <FontAwesomeIcon icon={faHeart} /> {t('Marital Status')}: {profileData.maritalStatus}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack mt='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> Alert.alert(t('Sorry'),t('You cant change your gender after sign up 😞'))}>
                                <Text  ml='2' fontWeight='light' fontSize='lg' > <FontAwesomeIcon icon={faVenusMars} /> {t('Gender')}: {profileData.sex}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack my='3' borderWidth={1} py='2' justifyContent='flex-start' borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={()=> setShowPhoneModal(true)}>
                                <Text  ml='2' fontWeight='light' fontSize='lg' > <FontAwesomeIcon icon={faPhone} /> {t('Phone Number')}: {profileData.phone}</Text>
                            </TouchableOpacity>
                        </HStack>

                        <HStack my='3' borderWidth={1} py='2'  borderColor='warning.800' width='100%'>
                            <TouchableOpacity onPress={logout}>
                                <Text  textAlign='center' ml='2' fontWeight='light' color='error.500' fontSize='lg' > {t('Logout')}</Text>
                            </TouchableOpacity>
                        </HStack>

                        {/* Edit name */}

                        <Modal size='xl' avoidKeyboard={true} isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
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
                                        <Modal.Header>{t('Edit Email')}</Modal.Header>
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
                                        <Modal.Header>{t('Edit Email')}</Modal.Header>
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
                                        <Modal.Header>{t('Edit your Password')}</Modal.Header>
                                        <Modal.Body>
                                            <Formik 
                                            onSubmit={(newData)=>{
                                                console.log(newData);
                                                editData(newData);
                                            }}
                                            initialValues={{currentPassword:``,newPassword:``,confirmNewPassword:``}}
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
                                        <Modal.Header>{t('Edit your Profile Picture')}</Modal.Header>
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
                                        <Modal.Header>{t('Marital Status')}</Modal.Header>
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