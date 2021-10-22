import React from "react";
import {Text,NativeBaseProvider,VStack,Box,Button, Link, HStack, ScrollView, View, Center, Select} from "native-base";
import { ImageBackground ,Dimensions,StyleSheet} from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt,faUserPlus, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Slidercarousel from "../components/Slider";
import { useTranslation } from "react-i18next";
import { useState } from "react/cjs/react.development";

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
    body:"“If you plan on being anything less than you are capable of being, you will probably be unhappy all the days of your life.”",
    author: "– Abraham Maslow –",
    id:3
  },
];
let globe = <FontAwesomeIcon   color="#dc2626" icon={faGlobe} />;
export default function Landing({navigation}) {
  const {t,i18n} = useTranslation();
  return (
    <NativeBaseProvider>
        <VStack width="100%" height="100%">
          <Box height="60%" width="100%" borderBottomRightRadius={50}  bgColor="black">
            <ImageBackground blurRadius={3}  borderBottomRightRadius={50} imageStyle={{opacity: 0.6}} source={Therapy_session} style={{flex:1}} resizeMode="cover" >
              <HStack>
                <Text  color="#FEFDFF"  w="80%" fontSize="4xl" fontWeight="bold" mt="15%" mb="5%" ml="5%">Psy-Awareness</Text>
                <Select mt="18%" dropdownIcon={globe} variant='unstyled'>
                  <Select.Item label="Arabic (ع)" value="ar"  onPress={()=> i18n.changeLanguage("ar")} />
                  <Select.Item label="English (en) " value="en"  onPress={()=> i18n.changeLanguage("en")}/>
                </Select>
              </HStack>
              <Text color="#FEFDFF" w="90%" fontSize="xl"  ml="5%" fontWeight='bold'>
                  {t('A Personal Psychiatrist at the Palm of your hand')}
              </Text>
              <VStack alignItems="center" mt="12%">
                <Button  mb={7} size="md" onPress={()=>navigation.navigate('Userregister')} borderRadius={25} px={20}><Text fontSize="lg" color="#FEFDFF" fontWeight="bold">{t('Sign-Up')} <FontAwesomeIcon color="#FEFDFF" icon={ faSignInAlt } /> </Text></Button>
                <Button borderRadius={25} px={20} variant="outline"><Text fontSize="lg" color="#FEFDFF" fontWeight="bold">{t('Sign-In')} <FontAwesomeIcon color="#FEFDFF" icon={ faUserPlus } /></Text></Button>
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