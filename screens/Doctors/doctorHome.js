import { Center, NativeBaseProvider , Text} from "native-base";
import React,{useEffect,useState} from "react";
import WelcomeSVG from "../../components/WelcomeSVG";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

const Doctorhome=({navigation})=>{
    const {t,i18n} = useTranslation();
    const [pending, isPending] = useState(initialState);

    useEffect(async () =>{
        let token =  await AsyncStorage.getItem('token');
        axios.get(`http://${api}/psy/${role}s/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data.data);
            // console.log(response.data);
            setProfileData(response.data.data);
            Isloading(false);
        })
        .catch((error) => {
            console.log(error);
            throw Error('Sorry, there has been a Problem while fetching your data');
        });
    },[])


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