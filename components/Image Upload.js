import { Text,Button, Avatar} from "native-base";
import React, { useState ,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera} from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from 'expo-image-picker';


const Imageupload=({navigator,btn_caption})=>{
    const {t,i18n} = useTranslation();
    const [image,setImage]= useState(null);

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