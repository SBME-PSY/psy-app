import { NativeBaseProvider} from 'native-base';
import React from 'react';
import Viewprofile from '../../components/View profile';

const ViewUserProfile=({navigation})=>{
    return(
        <NativeBaseProvider>
            <Viewprofile navigation={navigation} navigator={navigator} role='user' Address_label='Address' Name_label='Username' header_color='success.500' />
        </NativeBaseProvider>
    )
}

export default ViewUserProfile;