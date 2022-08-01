import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import { TouchableOpacity,Image } from "react-native";
import Constants from "expo-constants";
import { View } from "react-native";
import Ribbon from "../../components/ribbon";


export default function testCategories({navigation}){
    const {t,i18n} = useTranslation();
    const [loading,isLoading] = useState(true);
    const [testCategories, setTestCategories] = useState([]);
    const getTests=()=>{
        axios.get('/psy/questionnaires/categories').then((res)=>{
            setTestCategories(res.data.data)
            isLoading(false)
        }).catch(err=>{console.log(err.message)})
    }

    useEffect(()=>{
        setTimeout(()=>{
            getTests()
        },500)
    },[])


    return(
        <NativeBaseProvider>
            {loading && <HStack mt='90%' justifyContent='center' alignItems='center' ><Spinner size='lg'   color='#059669' /></HStack>}
            {!loading &&                 <HStack justifyContent='center' flexWrap='wrap' px={15} safeArea>
                {testCategories && testCategories.map((test,index)=>{
                        return(
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate('selectTest',{_id:test._id})
                            }}  key={index}>
                                <VStack>
                                    <Card height={150} width='100%'>
                                        <Avatar size={70} alignSelf='center'  source={{uri:test.base64}}/>
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