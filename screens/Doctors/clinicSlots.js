import { Avatar, Center, HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select,Accordion,Box, Toast, Card, Image, Link, Checkbox} from 'native-base';
import { useTranslation } from "react-i18next";
import React,{useState,useEffect} from 'react';
import {TouchableOpacity,Dimensions,Linking,Platform} from 'react-native';
import getAuthData from '../../hooks/getAuthData';
import axios from 'axios';
import Lightbox from 'react-native-lightbox-v2'
import DateTimePicker from '@react-native-community/datetimepicker';

const clinicSlots = ({navigation,route})=>{
    const {t,i18n} = useTranslation();
    const [openingTimeVisible,setOpeningVisible] = useState(false)
    const [closingTimeVisible,setClosingTimeVisible] = useState(false)
    const [openTime,setOpenTime]= useState('')
    const [closeTime,setCloseTime]= useState('')
    const [reserved,setReserved] = useState(false)
    const clinic_ID  = route.params._id
    const handleSlots= async ()=>{
        const authData = await getAuthData()
        axios.post(`/psy/doctors/clinics/${clinic_ID}/slots`,{
            "from": openTime,
            "to": closeTime,
            "reserved": reserved
        },{
            headers:{
                Authorization: `Bearer ${authData.token}`
            }
        }).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
    }
    return(
        <NativeBaseProvider>
            <Text textAlign='center' mt={5} fontWeight='bold' fontSize='lg' >{t('Pick the slot opening & closing times of your clinic and then click submit')}</Text>
            <Center mt='50%'>
                <HStack>
                    <Button onPress={()=>{
                        setOpeningVisible(true)
                    }} mx={2} borderRadius={35} variant='solid' alignSelf='center' backgroundColor='#003049' ><Text fontWeight='bold' color='white' fontSize='lg' >{t('Opening Time')}</Text></Button>
                    <Button onPress={()=>{
                        setClosingTimeVisible(true)
                    }}  mx={2} borderRadius={35} variant='solid' alignSelf='center'  backgroundColor='#003049'><Text color='white' fontWeight='bold' fontSize='lg' >{t('Closing Time')}</Text></Button>
                    {openingTimeVisible && <DateTimePicker onChange={(openTime)=>{setOpenTime(openTime.nativeEvent.timeStamp)}}  onco themeVariant="dark" mode='time' value={new Date()} />}
                    {closingTimeVisible && <DateTimePicker  mode='time' onChange={(closeTime)=>{setCloseTime(closeTime.nativeEvent.timeStamp)}} value={new Date()} />}
                </HStack>
                <Checkbox mt={5}  onChange={(val)=>{setReserved(val)}} >{t('Reserved')}</Checkbox>
                <Button px={10} mt={20} borderRadius={35} onPress={handleSlots} ><Text color='white' fontWeight='bold' fontSize='lg' >{t('Confirm')}</Text></Button>
            </Center>
            
        </NativeBaseProvider>
    )
}

export default clinicSlots