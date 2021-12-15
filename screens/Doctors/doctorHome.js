import { Center, NativeBaseProvider , Text} from "native-base";
import React from "react";
import WelcomeSVG from "../../components/WelcomeSVG";
import { useTranslation } from "react-i18next";



const Doctorhome=({navigation})=>{
    const {t,i18n} = useTranslation();
    return(
        <NativeBaseProvider>
            <Center mt='20%' height="50%">
                <WelcomeSVG/>
            </Center>
            <Center mt='10'>
                <Text fontSize='3xl' color='danger.500'>{t('Hello Doctor')}</Text>
                <Text mt='5'  textAlign='center' px='4' >{t('Your Application is pending and is being checed by our Admins. Click the icon on the top left most of your screen to see what is availabe for now')}</Text>
            </Center>
        </NativeBaseProvider>
    )
}

export default Doctorhome;