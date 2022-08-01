import { Avatar, Center, HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select,Accordion,Box, Toast, Card, Image, Link} from 'native-base';
import { useTranslation } from "react-i18next";
import React,{useState,useEffect} from 'react';
import {TouchableOpacity,Dimensions,Linking,Platform} from 'react-native';
import getAuthData from '../../hooks/getAuthData';
import axios from 'axios';
import Lightbox from 'react-native-lightbox-v2'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function showClinics({navigator,navigation}){
    const {t,i18n} = useTranslation();

    const[isempty,setIsEmpty] = useState(false);

    
    const[loading,Isloading]= useState(true);

    const [clinics,setClinics] = useState([])

    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height

    const getClinics = async () => {
        const authData = await getAuthData()

        axios.get('/psy/doctors/clinics/',{
            headers: {
                Authorization: `Bearer ${authData.token}`}
        }).then(res => {
            setClinics(res.data.data)
            // delete clinics[0].pictures
            // console.log(clinics[0])
            if(res.data.data.length === 0){
                setIsEmpty(true)
            }
            Isloading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getClinics()
    },[])

    const makeCall = (phone) =>{
        Platform.OS === 'android' ?Linking.openURL(`tel:${phone}`):Linking.openURL(`telprompt:${phone}`)
    }

        return(
            <NativeBaseProvider>
                <Center safeArea >
                    {loading && <Spinner size={40} mt={40} color='#003049' /> }
                    {isempty && 
                        <>
                            <Text fontWeight='bold' textAlign='center' mt={10} >{t('You have no clinics available. go add some new one')}</Text>
                            <TouchableOpacity  onPress={()=> navigation.navigate('addClinics') } ><Text fontSize={15} mt={15} textDecorationStyle='solid' color='danger.500' textDecorationLine={10}  textDecoration='underline' >{t('Add Clinics')}</Text></TouchableOpacity>
                        </>
                    }
                    {(isempty || clinics) && <Text fontWeight='bold' mt={2} color='#003049' textAlign='center' >{t('By pressing the clinic card you can edit its information')}</Text>}
                    <ScrollView
                        mt={5} 
                        horizontal
                        height={screenHeight-300} 
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{screenWidth}}
                    >
                    {clinics && clinics.map((clinic,index)=>(
                        <Card shadow={0} borderTopWidth={4} borderBottomWidth={4} borderTopColor='#003049' borderBottomColor='#003049' key={index}  mx={2}  width={screenWidth-20} >
                            <TouchableOpacity  >
                                <Lightbox style={{width:'100%',height:'40%'}} navigator={navigator} ><Image  width='100%'  height='100%' alt='clinic-picture' source={{ uri:clinic.pictures[0] }} /></Lightbox>
                                <Text my={2} fontSize='md' fontWeight='bold'>{t('Clinc Address') + ' :' + clinic.address}</Text>
                                <HStack>
                                    <Text my={2}  fontSize='md'  fontWeight='bold'>{t('Phone Number')+ ' :' }</Text>
                                    <VStack>
                                        {clinic.phoneNumbers.map((number,i)=>(
                                            <Link  mt={2} mx={2} onPress={()=>{makeCall(number)}} key={i} colorScheme='success' >{number}</Link>
                                        ))}
                                    </VStack>
                                </HStack>
                                <Text my={2} fontSize='md' fontWeight='bold'>{t('Reservation Price') + ' : ' + clinic.price  + '  ' + t('EGP')}</Text>
                                <Text my={2} fontSize='md' fontWeight='bold'>{t('Rating') + ' :' + clinic.rating + '/5'}</Text>
                                {clinic.slots.length !== 0 ? clinic.slots.map((slot,j)=>(
                                    <Text>{slot}</Text>
                                )) 
                                :<Button onPress={()=>{
                                    navigation.navigate('clinicSlots',{
                                        _id: clinic._id
                                    })
                                }} borderRadius={35} mb={4} alignSelf='center' width={300}>{t('Add available slots to your clinic')}</Button> 
                                }
                            </TouchableOpacity>
                        </Card>
                    ))}
                    </ScrollView>
                    
                </Center>
            </NativeBaseProvider>
        )
}