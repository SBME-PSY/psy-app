import { Text,Button,NativeBaseProvider} from "native-base";
import React, { useState ,useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as ImagePicker from 'expo-image-picker';

const CVPicture =({navigator,values_object})=>{
    const {t,i18n} = useTranslation();
    const [selected,setSelected]=useState(false);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const uploadCV = async ()=> {
        let _cvImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
            base64:true,
        });
        if(_cvImage.cancelled === false){
            const extension  = _cvImage.uri.slice(_cvImage.uri.length - 3);
            console.log(extension);   
            values_object.cvFile =  `data:image/${extension};base64,${_cvImage['uri']}`;
            setSelected(true);
        }
    }

    return (
        <NativeBaseProvider>
            {selected && <Text my='3' color='success.500' textAlign='center'  >{t('Resume has been selected')}</Text>}
            <Button borderRadius={50} px='5' onPress={uploadCV}>{t('Upload your Resume')}</Button>
        </NativeBaseProvider>
    )
}

export default CVPicture;