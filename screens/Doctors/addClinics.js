import React,{useEffect,useState} from 'react'
import * as yup from 'yup';
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import getAuthData from '../../hooks/getAuthData';
import { ToastAndroid } from 'react-native';
import { NativeBaseProvider,VStack,Center,Box,Text,Input, Icon,  Select, Button,FormControl,ScrollView,Heading} from "native-base";
import { faClinicMedical, faLocationArrow, faMoneyBill, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';



export default function addClinics(){

    const [image, setImage] = useState(null);
    const [selected,setSelected]=useState(false);


    const addClinic = async (formData,actions) => {
        let authData = await getAuthData()
        axios.post('/psy/doctors/clinics/',formData,{
            headers:{
                Authorization: `Bearer ${authData.token}`,
            }
        })
        .then(res=>{
            console.log(res)
            ToastAndroid.show(t('Clinic added successfully'),ToastAndroid.SHORT)
        })
        .catch(err=>{
            console.log(err.message)
            ToastAndroid.show(t('Clinic not added, Check the form info'),ToastAndroid.SHORT)
        })
        actions.resetForm()
    }


    const pickImage = async (values_object) => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection:true,
        allowsEditing: true,
        base64:true,
        quality: 1,
      });
  
      
      if (!result.cancelled) {
        setImage(result.uri);
        setSelected(true);
        values_object.pictures = `data:image/jpg;base64,${result.base64}`
    }
    };

    const {t,i18n} = useTranslation();

    const ReviewSchema = yup.object().shape({
        address: yup.string().required(t('Clinic address is required')),
        price: yup.string().required(t('Price is required')),
        phoneNumbers: yup.string().length(11,t('Phone number should be 11 numbers')).required(t('Clinic phone is required')),
        rating: yup.string().required(t('Clinic rating is required')),
    })

    return(
        <NativeBaseProvider>
            <ScrollView mt={5} px={5} >
                <Formik 
                    initialValues={{address:'',rating:'',price:'',phoneNumbers:''}}
                    validationSchema={ReviewSchema}
                    onSubmit={ (data,actions)=> addClinic(data,actions)   }
                >
                    {(props)=>(
                        <>
                            <FormControl isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Clinc Address')}</FormControl.Label>
                                    <Input
                                        variant="underlined"
                                        placeholder= {t('Clinic Address')}
                                        onChangeText={props.handleChange('address')}
                                        value={props.values.address}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faClinicMedical} />}  mr={5} />}
                                        onBlur={props.handleBlur('address')}
                                    />
                                <Text color='danger.500' >{ props.touched.address &&  props.errors.address}</Text>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Rating')}</FormControl.Label>
                                    <AirbnbRating 
                                        count={5}
                                        defaultRating={0}
                                        size={20}
                                        reviewColor='#003049'
                                        reviewSize={20}
                                        onFinishRating={(rating)=>props.setFieldValue('rating',rating)}
                                    />
                                <Text color='danger.500' >{ props.touched.rating &&  props.errors.rating}</Text>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Phone Number')}</FormControl.Label>
                                    <Input
                                        variant="underlined"
                                        placeholder= {t('Phone Number')}
                                        onChangeText={props.handleChange('phoneNumbers')}
                                        value={props.values.phoneNumbers}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faPhone} />}  mr={5} />}
                                        onBlur={props.handleBlur('phoneNumbers')}
                                    />
                                <Text color='danger.500' >{ props.touched.rating &&  props.errors.rating}</Text>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t('Price')}</FormControl.Label>
                                    <Input
                                        type='number'
                                        keyboardType='numeric'
                                        variant="underlined"
                                        placeholder= {t('Price')}
                                        onChangeText={props.handleChange('price')}
                                        value={props.values.price}
                                        InputLeftElement={<Icon as={<FontAwesomeIcon  icon={faMoneyBill} />}  mr={5} />}
                                        onBlur={props.handleBlur('price')}
                                    />
                                <Text color='danger.500' >{ props.touched.price &&  props.errors.price}</Text>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label _text={{color:'#003049'}}>{t("Clinic Pictures")}</FormControl.Label>
                                    {selected && <Text my='3' color='success.500' textAlign='center'  >{t('Clinic Picture has been selected')}</Text>}
                                    <Button onPress={pickImage} ><Text color='white' >{t('Add Clinic Pictures')}</Text></Button>
                                <Text color='danger.500' ></Text>
                            </FormControl>
                            <FormControl my="5">
                                <Button  onPress={props.handleSubmit} bgColor="#003049"  _pressed={{bgColor:"success.500"}} borderRadius={50}>{t('Add Clinic')}</Button>
                            </FormControl>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </NativeBaseProvider>
    )
}