import React, { useEffect } from "react";
import {Text,NativeBaseProvider,VStack,Box,Button, HStack,Select} from "native-base";
import { ImageBackground ,Dimensions} from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt,faUserPlus, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Slidercarousel from "../components/Slider";
import { useTranslation } from "react-i18next"; 
import { BackHandler, Alert } from 'react-native';
import { I18nManager } from "react-native";

const {width} = Dimensions.get("window");
const Quotes= [
  {
      body:"“ We cannot change anything until we accept it. Condemnation does not liberate, it oppresses.”",
      author: "– Carl Jung –",
      id:1
  },
  {
    body:"“The self thus becomes aware of itself, at least in its practical action, and discovers itself as a cause among other causes and as an object subject to the same laws as other objects.”",
    author: "– Jean Piaget –",
    id:2
  },
  {
    body:"“Genuine feelings cannot be produced, nor can they be eradicated… the body sticks to the facts.”",
    author: "– Alice Miller –",
    id:3
  },
];
let globe = <FontAwesomeIcon   color="#fff" icon={faGlobe} />;
export default function Landing({navigation}) {
  console.log(I18nManager.isRTL)
  const {t,i18n} = useTranslation();
  useEffect(()=>{
    navigation.addListener('beforeRemove',(e)=>{
      e.preventDefault();
      Alert.alert(t("Stop"),t("Are you sure you want to exit the app?"),[
        {
          text: t("Cancel"),
          onPress: ()=>null,
          style:"cancel"
        },
        {
          text:t("Yes"),
          onPress: ()=>BackHandler.exitApp(),
          style: "default"
        }
      ])      
    })
  },[])
  return (
    <NativeBaseProvider>
        <VStack width="100%" height="100%">
          <Box   height="62%" width="100%" borderBottomRadius={35}  bgColor="black">
            <ImageBackground blurRadius={2}   style={{flex:1}} borderRadius={35}   imageStyle={{opacity: 0.6}} source={Therapy_session} resizeMode='cover' >
              <HStack direction={I18nManager.isRTL ? 'row-reverse' : 'row'}    mt='15%'>
                <Text  color="#FEFDFF"  w="80%" fontSize="3xl" fontWeight="bold"  mb="5%" mr='3%' ml="4%">Psy-Awareness</Text>
                
                <Select pt={6} onValueChange={(val)=> {
                  i18n.changeLanguage(val)
                  if(val === 'ar'){ 
                    I18nManager.allowRTL(true)
                    I18nManager.forceRTL(true)
                    i18n.changeLanguage(val)
                  }else{
                    I18nManager.forceRTL(false)
                    I18nManager.allowRTL(false)
                    i18n.changeLanguage(val)
                  }
                }} dropdownIcon={globe} variant='unstyled'>
                  <Select.Item label="Arabic (ع)" value="ar" />
                  <Select.Item label="English (en) " value="en" />
                </Select>
              </HStack>
              <Text color="#FEFDFF" w="90%" fontSize="lg"  mx={5} fontWeight='bold'>
                  {t('A Personal Psychiatrist at the Palm of your hand')}
              </Text>
              <VStack alignItems="center" mt="12%">
                <Button  mb={7} size="md" onPress={()=>navigation.navigate('Userregister')} borderRadius={25} px={20}><Text fontSize="lg" color="#FEFDFF" fontWeight="bold">{t('Sign-Up')} <FontAwesomeIcon  color='#fff' icon={ faUserPlus } /> </Text></Button>
                <Button borderRadius={25}  onPress={()=>navigation.navigate('Usersignin')} px={20} variant="outline" colorScheme="light"><Text fontSize="lg" color='#fff'   fontWeight="bold">{t('Sign-In')} <FontAwesomeIcon color="#FEFDFF" icon={ faSignInAlt } /> </Text></Button>
                <Button variant="link" onPress={()=>navigation.navigate('Doctorlanding')} ><Text color="amber.600" fontWeight="bold" style={{textDecorationLine:"underline"}}  mt={5}>{t('Are you a doctor?')}</Text></Button>
              </VStack>
            </ImageBackground>
          </Box>
          <VStack width="100%"  height="40%"  mt="20%"  style={{width}}>
            <Slidercarousel Quotes={Quotes} />
          </VStack>
        </VStack>
    </NativeBaseProvider>
  );
}