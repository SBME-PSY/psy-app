import { Text,Button, Avatar} from "native-base";
import React, { useState ,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  faImages} from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";

const Imageupload=({navigator,btn_caption,values_object,pic_label})=>{
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
            {   
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
                base64:true
            }
        );
        values_object.image_uri= pic_label;
        values_object[pic_label]= _image['base64'];
        // console.log(JSON.stringify(_image));
        if(_image.cancelled === false){
            setImage(_image.uri);
        }
    }
    return(
        <>
          <Formik initialValues={{pic_uri:''}}>
            {(props)=>(
            <>
            {
            image && <Avatar my={2} size='2xl' value={props.values.pic_uri} source={{uri:image}} alignSelf='center' borderRadius={100} />
            }
            <Button alignSelf='center' onPress={()=> AddImage()} borderRadius={50}><Text textAlign="center" color="white">{t(btn_caption)} <FontAwesomeIcon color="white"  icon={faImages}/> </Text></Button>
            </>
            )}
          </Formik>
        </>
    )

}

export default Imageupload;