import React,{useState} from "react";
import {Text,NativeBaseProvider,VStack,Box,Button, Link, HStack, ScrollView, View, Center} from "native-base";
import { ImageBackground ,Dimensions,StyleSheet} from "react-native";
import Therapy_session from '../assets/Img/Therapy_Session.jpeg';
import { faSignInAlt,faUserPlus,faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Slidercarousel from "../components/Slider";


const {width} = Dimensions.get("window");
// const height =  width *0.6 ;
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
export default function Landing() {
  const [active,setActive]=useState(0);
  const change=({nativeEvent})=>{
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if(slide !== active){
      setActive(slide);
    }
  }
  return (
    <NativeBaseProvider>
        <VStack width="100%" height="100%">
          
          <Box height="60%" width="100%" borderBottomRightRadius={50}  bgColor="black"  >
            <ImageBackground blurRadius={3}  borderBottomRightRadius={50} imageStyle={{opacity: 0.6}} source={Therapy_session} style={{flex:1}} resizeMode="cover" >
              <HStack>
                <Text color="#FEFDFF" w="80%" fontSize="4xl" fontWeight="bold" mt="15%" mb="5%" ml="5%">Psy-Awareness</Text>
                <Button w="10%" h="20%"  mt="20%" variant="subtle" bgColor="amber.600" _pressed={{bg:"gray.700"}} ><FontAwesomeIcon color="white" icon={faLanguage}/></Button>
              </HStack>
              <Text color="#FEFDFF" w="90%" fontSize="xl"  ml="5%" fontWeight='bold'>
                  A Personal Psychiatrist at the Palm of your hand
              </Text>
              <VStack alignItems="center" mt="12%">
                <Button  mb={7} size="md" borderRadius={25} px={20}><Text fontSize="xl" color="#FEFDFF" fontWeight="bold">Sign-Up <FontAwesomeIcon color="#FEFDFF" icon={ faSignInAlt } /> </Text></Button>
                <Button borderRadius={25} px={20} variant="outline"><Text fontSize="xl" color="#FEFDFF" fontWeight="bold">Sign-In <FontAwesomeIcon color="#FEFDFF" icon={ faUserPlus } /></Text></Button>
                <Link><Text color="amber.600" fontWeight="bold" style={{textDecorationLine:"underline"}}  mt={5}>Are you a doctor?</Text></Link>
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