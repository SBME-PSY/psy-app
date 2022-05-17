import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager } from "react-native";
import depressed from '../../assets/Img/depression.png'
import { TouchableOpacity } from "react-native";

export default function testCategories(){
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
            <VStack safeArea>
                {tests && tests.map((test,index)=>{
                    return(
                        <HStack flexWrap='wrap' px={5} key={index}>
                            <TouchableOpacity>
                                <Card key={index}>
                                    <VStack alignContent='center' justifyContent='center' >
                                        <Avatar size={100} source={depressed}/>
                                        <Text textAlign='center' fontWeight='bold' >{test.name}</Text>
                                    </VStack>
                                </Card>
                            </TouchableOpacity>
                        </HStack>
                    )
                })}
            </VStack>
        </NativeBaseProvider>
    )
}