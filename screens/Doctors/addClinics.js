import React,{useEffect,useState} from 'react'
import * as yup from 'yup';
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import getAuthData from '../../hooks/getAuthData';
import { ToastAndroid } from 'react-native';
import { NativeBaseProvider,VStack,Center,Box,Text,Input, Icon,  Select, Button,FormControl,ScrollView,Heading, HStack, IconButton} from "native-base";
import { faClinicMedical, faLocationArrow, faMinus, faMoneyBill, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';



export default function addClinics(){

    const {t,i18n} = useTranslation();


    const [selected,setSelected]=useState(false); 

    const [clinicData,setClinicData]=useState({
        address:'',
        pictures:[],
        rating:'',
        phoneNumbers:[''],
        price:''
    });

    const ReviewSchema = yup.object().shape({
        address: yup.string().required(t('Clinic address is required')),
        price: yup.string().required(t('Price is required')),
        phoneNumbers: yup.array().of(
            yup.string().length(11,t('Phone number should be 11 numbers')).required(t('Clinic phone is required')),
        ),
        rating: yup.string().required(t('Clinic rating is required')),
    })

    const addClinic = async () => {
        let authData = await getAuthData()
        ReviewSchema.isValid(clinicData).then( () =>{
            axios.post('/psy/doctors/clinics/',clinicData,{
                headers:{
                    Authorization: `Bearer ${authData.token}`,
                }
            })
            .then(()=>{
                ToastAndroid.show(t('Clinic added successfully'),ToastAndroid.SHORT)
                setClinicData({
                    address:'',
                    pictures:[],
                    rating:'',
                    phoneNumbers:[''],
                    price:''
                })
                setSelected(false)
            })
            .catch(()=>{
                ToastAndroid.show(t('Sorry, Some thing went wrong'),ToastAndroid.SHORT)
            })
        }).catch(()=>{
            ToastAndroid.show(t('Clinic not added, Check the form info'),ToastAndroid.SHORT)
        })
    }


    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection:true,
        allowsEditing: true,
        base64:true,
        quality: 1,
      });
  
      
      if (!result.cancelled) {
        const values ={...clinicData}
        values.pictures.push(`data:image/jpg;base64,${result.base64}`) 
        setClinicData(values)
        setSelected(true);
        console.log(clinicData)
    }
    };

    const addPhoneNumber =()=>{
        let values = {...clinicData}
        values.phoneNumbers.push('')
        setClinicData(values)
    }

    const removePhoneNumber = (index)=>{
        const values = {...clinicData}
        if(values.phoneNumbers.length === 1){
            return
        }
        else{
            values.phoneNumbers.splice(index,1)
            setClinicData(values)
        }
    }

    const handlePhoneNumber = (index,number)=>{
        const values = {...clinicData}
        values.phoneNumbers[index] = number
        setClinicData(values)
        console.log(clinicData)
    }




    return(
        <NativeBaseProvider>
            <ScrollView mt={5} px={5} >
                <FormControl isRequired>
                    <FormControl.Label _text={{color:'#003049'}}>{t('Clinc Address')}</FormControl.Label>
                        <Input
                            variant="underlined"
                            placeholder= {t('Clinic Address')}
                            onChangeText={address=>{clinicData.address=address}}
                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faClinicMedical} />}  mr={5} />}
                        />
                </FormControl>
                
                <FormControl isRequired>
                    <FormControl.Label _text={{color:'#003049'}}>{t("Clinic Pictures")}</FormControl.Label>
                        {selected && <Text my='3' color='success.500' textAlign='center'  >{t('Clinic Picture has been selected')}</Text>}
                        <Button onPress={pickImage} ><Text color='white' >{t('Add Clinic Pictures')}</Text></Button>
                    <Text color='danger.500' ></Text>
                </FormControl>

                <FormControl isRequired>
                    <FormControl.Label _text={{color:'#003049'}}>{t('Rating')}</FormControl.Label>
                        <AirbnbRating
                            
                            count={5}
                            defaultRating={0}
                            size={20}
                            reviewColor='#003049'
                            reviewSize={20}
                            onFinishRating={rating=>{clinicData.rating = rating}}
                        />
                </FormControl>

                <FormControl isRequired>
                    <FormControl.Label _text={{color:'#003049'}}>{t('Price')}</FormControl.Label>
                        <Input
                            type='number'
                            keyboardType='numeric'
                            variant="underlined"
                            placeholder= {t('Price')}
                            onChangeText={price=>{clinicData.price = price}}
                            InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faMoneyBill} />}  mr={5} />}
                        />
                </FormControl>
                {clinicData.phoneNumbers.map((phoneNum,index)=>{
                    return(
                        <FormControl mt={3} key={index} isRequired>
                            <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number') + '  ' + (index+1)}</FormControl.Label>
                            <HStack>
                                <Input
                                    type='number'
                                    keyboardType='numeric'
                                    width='83%'
                                    variant="underlined"
                                    onChangeText={(number)=>{ handlePhoneNumber(index,number) }}
                                    placeholder= {t('Phone Number')}
                                    InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}
                                />
                                <HStack  mt={5} >
                                    <IconButton onPress={addPhoneNumber} icon={<FontAwesomeIcon color='#059669' icon={faPlus} />} />
                                </HStack>
                                <HStack  mt={5} >
                                    <IconButton onPress={()=>{removePhoneNumber(index)}} icon={<FontAwesomeIcon  color='#003049'  icon={faMinus} />} />
                                </HStack>
                            </HStack>
                        </FormControl>
                    )
                })}
                <FormControl my="5">
                    <Button  onPress={addClinic} bgColor="#003049"  _pressed={{bgColor:"success.500"}} borderRadius={50}>{t('Add Clinic')}</Button>
                </FormControl>
            </ScrollView>
        </NativeBaseProvider>
    )
}