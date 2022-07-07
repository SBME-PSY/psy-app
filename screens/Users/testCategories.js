import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import depressed from '../../assets/Img/depression.png'
import { TouchableOpacity } from "react-native";

export default function testCategories({navigation}){
    const {t,i18n} = useTranslation();
    const [tests, setTests] = useState([]);
    const getTests=()=>{
        axios.get('/psy/category').then((res)=>{
            console.log(res.data)
            setTests(res.data.data)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getTests()
        },500)
    },[])


    return(
        <NativeBaseProvider>
            <HStack justifyContent='center' flexWrap='wrap' px={15} safeArea>
            {tests && tests.map((test,index)=>{
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate('tests')}}  key={index}>
                            <VStack>
                                <Card height={150} width='100%'>
                                    <Avatar size={70}  alignSelf='center' source={depressed}/>
                                    <Text textAlign='center' mt={5} fontWeight='bold' >{I18nManager.isRTL ? test.name.ar : test.name.en}</Text>
                                </Card>
                            </VStack>
                        </TouchableOpacity>
                    )
                })}
            </HStack>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    testCategory:{
        width:'50%', height:'60px' 
    }
})