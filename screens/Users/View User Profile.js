import { NativeBaseProvider} from 'native-base';
import React from 'react';
import Viewprofile from '../../components/View profile';

const ViewUserProfile=()=>{
    return(
        <NativeBaseProvider>
            <Viewprofile role='user' Address_label='Address' Name_label='Username' header_color='success.500' />
        </NativeBaseProvider>
    )
}

export default ViewUserProfile;