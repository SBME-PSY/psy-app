import { NativeBaseProvider,VStack,Center,Box,Text,Heading, FormControl,Input, Icon,  Select, Button, ScrollView, Image, HStack, Tooltip, IconButton, Avatar} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faEnvelope, faEye, faHome, faLock, faPhone, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from 'expo-image-picker';


const Imageupload=({navigator,btn_caption})=>{
    const {t,i18n} = useTranslation();
    const [image,setImage]= useState(null);

    const AddImage= async ()=>{
        let _image = await ImagePicker.launchImageLibraryAsync(
            {   aspect:[16,9],
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            }
        );
        console.log(JSON.stringify(_image));
        if(_image.cancelled === false){
            setImage(_image.uri);
        }
    }

    return(
        <>
            {
            image && <Avatar my={2}  size='2xl'  source={{uri:image}} alignSelf='center' borderRadius={100} />
            }
            <Button alignSelf='center' onPress={AddImage} borderRadius={50}><Text textAlign="center" color="white">{t(btn_caption)} <FontAwesomeIcon color="white" icon={faCamera}/> </Text></Button>
        </>
    )

}

export default Imageupload;