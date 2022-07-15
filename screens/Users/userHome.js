import { Center, NativeBaseProvider ,Text,Card, VStack,Avatar,HStack,Button,ScrollView, View} from "native-base";
import React,{useEffect} from "react";
import { useTranslation } from "react-i18next";
import { BackHandler ,Alert} from "react-native";

const Userhome=({navigation})=>{
    const {t} = useTranslation();
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
    return(
        <NativeBaseProvider >
            <Center safeArea>
                <VStack mt={5}>

                    {/* <Text textAlign='center'>Welcome to</Text>
                    <Text textAlign='center' >Psy-Awareness</Text> */}
                    <Card mt={3} >
                        <HStack>
                            <Avatar size='lg' mx={3} />
                            <VStack mt={2} >
                                <Text fontWeight='bold' >John Doe</Text>
                                <Text  fontWeight='bold' >JohnDoe123@gmail.com</Text>
                                <Text color='green.800' fontWeight='bold' >Specialized in Eating disorders</Text>
                                <Button mt={2} w={20} >Book</Button>
                            </VStack>
                        </HStack>
                    </Card>
                    <Card mt={3} >
                        <HStack>
                            <Avatar size='lg' mx={3} />
                            <VStack mt={2} >
                                <Text fontWeight='bold' >Sam Smith</Text>
                                <Text  fontWeight='bold' >SamSmith123@gmail.com</Text>
                                <Text color='green.800' fontWeight='bold' >Specialized in Eating disorders</Text>
                                <Button mt={2}  w={20} >Book</Button>
                            </VStack>
                        </HStack>
                    </Card>
                    <Card mt={3} >
                        <HStack>
                            <Avatar size='lg' mx={3} />
                            <VStack mt={2} >
                                <Text fontWeight='bold' >Jane Doe</Text>
                                <Text  fontWeight='bold' >JaneDoe123@gmail.com</Text>
                                <Text color='green.800' fontWeight='bold' >Specialized in Eating disorders</Text>
                                <Button mt={2}  w={20} >Book</Button>
                            </VStack>
                        </HStack>
                    </Card>
                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Userhome;