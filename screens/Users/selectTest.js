import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center, Spinner, ScrollView} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import { TouchableOpacity,Image ,View} from "react-native";
import Constants from "expo-constants";
import SkeletonContent from "react-native-skeleton-content";
import Ribbon from "../../components/ribbon";

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
            console.log(error)
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
                {loading  && <HStack mt='20%' size='lg' justifyContent='center' alignItems='center' ><Spinner size='lg'   color='#059669' /></HStack>}
                {(emptyTests && !loading) && <VStack mt={10} mx={5}><Text fontWeight='bold' fontSize='2xl' textAlign='center'> {t('Sorrt, There are no tests available in this category 😥😥😥')} </Text></VStack>}
                {(!loading && !emptyTests) && 
                    <ScrollView>
                        {tests && tests.map((test,index)=>{
                            return(
                                <Card  key={index} mx={5} my={2}>
                                    <View style={{ position: 'absolute', top: -5, right: -10 }} >
                                        <Ribbon color={test.authorModel === 'Admin'? '#831843': '#059669'} text={test.authorModel === 'Admin' ? t('Official'): t('Custom') } textColor={'white'}/>
                                    </View>
                                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate('tests',{_id:test._id})
                                    }} ><Text textAlign='center' fontSize='xl' fontWeight='bold' >{I18nManager.isRTL ? test.title.ar : test.title.en}</Text>
                                        <Text textAlign='center'>{test.description ? (I18nManager.isRTL ? test.description.ar : test.description.en) : null }</Text>
                                    </TouchableOpacity>
                                </Card>
                            )
                        })}
                    </ScrollView>
                }
            </VStack>
        </NativeBaseProvider>
    )
}