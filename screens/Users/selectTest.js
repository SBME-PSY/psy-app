import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center, Spinner, ScrollView} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import { TouchableOpacity,Image } from "react-native";
import Constants from "expo-constants";
import SkeletonContent from "react-native-skeleton-content";

export default function selectTest({navigation,route}){

    const [loading,isLoading] = useState(true)
    const {t,i18n} = useTranslation();
    const testCategoryID = route.params._id
    const [tests,setTests] = useState()
    const [emptyTests,setEmptytests] = useState(false)
    const getQuestionaire = ()=>{
        axios.get(`/psy/questionnaires`,{params:{categoryID: testCategoryID}}).then(res=>{
            setTests(res.data.data)
            if(res.data.data.length == 0){
                setEmptytests(true)
            }
            isLoading(false)
        }).catch(error=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getQuestionaire()
        },500)
    },[])
    return(
        <NativeBaseProvider>
            <VStack safeArea>
                {loading  && <HStack mt='20%' size='lg' justifyContent='center' alignItems='center' ><Spinner size='lg'   color='success.300' /></HStack>}
                {(emptyTests && !loading) && <VStack mt={10} mx={5}><Text fontWeight='bold' fontSize='2xl' textAlign='center'> {t('Sorrt, There are no tests available in this category 😥😥😥')} </Text></VStack>}
                {(!loading && !emptyTests) && 
                    <ScrollView>
                        {tests && tests.map((test,index)=>{
                            return(
                                <Card key={index} mx={5} my={2}>
                                    <TouchableOpacity ><Text>{I18nManager.isRTL ? test.title.ar : test.title.en}</Text></TouchableOpacity>
                                </Card>
                            )
                        })}
                    </ScrollView>
                }
            </VStack>
        </NativeBaseProvider>
    )
}