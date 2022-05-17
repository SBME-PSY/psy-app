import {NativeBaseProvider} from 'native-base'
import React,{useEffect,useState} from 'react';
import Viewprofile from '../../components/View profile';



const ViewDoctorProfile=({navigation})=>{
    return(
        <NativeBaseProvider>
            <Viewprofile navigation={navigation} navigator={navigator} role='doctor' Address_label='Clinic Address' Name_label='Doctor Name' header_color='#003049' />
        </NativeBaseProvider>
    )
}

export default ViewDoctorProfile;
