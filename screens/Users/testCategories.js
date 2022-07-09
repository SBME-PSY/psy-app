import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import depressed from '../../assets/Img/depression.png'
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import SkeletonContent from "react-native-skeleton-content";

const {manifest} = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev? manifest.debuggerHost.split(`:`).shift().concat(`:8000`): `api.example.com`;

export default function testCategories({navigation}){
    const [loading,isLoading] = useState(true);
    const {t,i18n} = useTranslation();
    const [tests, setTests] = useState([]);
    const getTests=()=>{
        axios.get('/psy/questionnaires/category').then((res)=>{
            console.log(res.data)
            setTests(res.data.data)
        }).then(
            isLoading(false)
        )
    }

    useEffect(()=>{
        setTimeout(()=>{
            getTests()
        },500)
    },[])


    return(
        <NativeBaseProvider>
            {isLoading && <Spinner mt={50} size='lg'/>}
            {!isLoading &&                 <HStack justifyContent='center' flexWrap='wrap' px={15} safeArea>
                {tests && tests.map((test,index)=>{
                        return(
                            <TouchableOpacity onPress={()=>{navigation.navigate('tests')}}  key={index}>
                                <VStack>
                                    <Card height={150} width='100%'>
                                        <Avatar size={70}  alignSelf='center' source={{uri:`https://www.flaticon.com/premium-icon/anxiety_2266068?related_id=2266068h`}}/>
                                        <Text textAlign='center' mt={5} fontWeight='bold' >{I18nManager.isRTL ? test.name.ar : test.name.en}</Text>
                                    </Card>
                                </VStack>
                            </TouchableOpacity>
                        )
                    })}
                </HStack>}
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    testCategory:{
        width:'50%', height:'60px' 
    }
})