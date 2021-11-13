import { NativeBaseProvider ,Button,Text} from 'native-base'
import React,{useState} from 'react';
import { useTranslation } from "react-i18next";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export default function ResumeUpload({values_object}) {
    const [selected,setSelected]=useState(false);
    const [encodedfile,setEncodedfile] = useState('');
    const {t,i18n} = useTranslation();
    const pickCV= async ()=>{
        let _file = await DocumentPicker.getDocumentAsync({
            multiple:false,
            copyToCacheDirectory:true,
        });
        // let {name,size,uri} = _file;
        // let nameParts = name.split('.');
        // let fileType = nameParts[nameParts.length-1];
        // let fileToUpload = {
        //     name : name,
        //     size : size,
        //     uri :uri,
        //     type: "application/" + fileType
        // }
    //    const fileBase64 = await FileSystem.copyAsync({from:_file.uri,to:FileSystem.documentDirectory+ _file.name})
    //    const cv = await FileSystem.readAsStringAsync(fileBase64,{encoding:FileSystem.EncodingType.Base64})
        // const fileBase64 = await FileSystem.readAsStringAsync(FileSystem.documentDirectory,{encoding:FileSystem.EncodingType.UTF8});
        // console.log(fileBase64)
        // FileSystem.downloadAsync(
        //     _file.uri,
        //     FileSystem.documentDirectory + 'get_data_from_dropbox.json'
        //   ).then(({ uri }) => {
        //     console.log('Finished downloading to ', uri)
        //     FileSystem.readAsStringAsync(uri).then(fileResponse => {
        //       console.log(fileResponse)
        //     })
        //   }).catch(error => {
        //     console.error(error)
        //   })
        // values_object.cvFile= {uri: _file['uri'],name: _file['uri'],type: 'application/pdf'};
        setSelected(true)
    }

    return (
        <NativeBaseProvider>
            {selected && <Text my='3' color='success.500' textAlign='center'  >{t('Resume has been selected')}</Text>}
            <Button borderRadius={50} px='5' onPress={pickCV}>{t('Upload your Resume')}</Button>
        </NativeBaseProvider>
    )
}
