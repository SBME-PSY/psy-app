import { Avatar, Center,  HStack,  NativeBaseProvider, ScrollView, Spinner, VStack,Icon,Text, Button,Modal,FormControl,Input,Select} from 'native-base'
import React,{useEffect,useState} from 'react';
import axios ,{Axios} from 'axios';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faHome, faLock, faPhone, faUser  } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Imageupload from '../../components/Image Upload';
import { SvgUri , SvgCssUri } from 'react-native-svg';
import * as yup from 'yup';
import Viewprofile from '../../components/View profile';



const ViewDoctorProfile=()=>{
    return(
        <NativeBaseProvider>
            <Viewprofile role='doctor' Address_label='Clinc Address' Name_label='Doctor Name' header_color='#003049' />
        </NativeBaseProvider>
    )
}

export default ViewDoctorProfile;
