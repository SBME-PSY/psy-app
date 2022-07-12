import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox, FormControl, ScrollView, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet, ToastAndroid,Dimensions, Alert} from "react-native";
import { TouchableOpacity } from "react-native";
import getAuthData from "../../hooks/getAuthData";
import { Formik } from "formik";
// declare module 'react-native-simple-survey'

export default function tests({navigation,route}){
    const {t,i18n} = useTranslation();
    const [responses,setResponses] = useState([])
    const [error,setError] = useState(false);
    const [loading,isLoading] = useState(true)
    const [qCounter,setQCounter] = useState(0)
    // let qCounter = 0
    const testID = route.params._id
    // let results={}
    const [results,setResults] = useState({})

    const getQuestionaire = ()=>{
        axios.get(`/psy/questionnaires/${testID}`).then(res=>{
            setResponses(res.data)
            isLoading(false)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getQuestionaire()
        },1000)
    },[])


    const catchValue = (value,questions) => {
        for(let i=0;i<questions.length;i++){
            delete questions[i]._id 
            delete  questions[i].createdAt
            delete  questions[i].updatedAt          
            for(let j = 0; j<questions[i].answers.length;j++){
                delete questions[i].answers[j]._id
                delete questions[i].answers[j].createdAt
                delete questions[i].answers[j].updatedAt 
                if(questions[i].answers[j].body.en == value && questions[i].answers[j].body.en == value){
                    questions[i].answers[j].choosen = true
                }
                else{
                    questions[i].answers[j].choosen = false
                    
                }
            }
            setQCounter(qCounter+1)
            results['questions'] = questions
        }
    }

    const handleSubmit = async () => {
        results.questionnaireID = responses.data._id
        results.category = responses.data.category
        results.rules = {}

        if(!results.questions || results.questions.length != qCounter){
            setError(true)
            setInterval(() => {
                setError(false)
            }, 5000);
        }
        else{
            setQCounter(0)
            let authData  = await getAuthData();
            console.log(results)
            axios.post('/psy/results',results,{
                headers:{
                    'Accept': 'application/json',
                    Authorization: `Bearer ${authData.token}`
            }}).then(res=>{
                Alert.alert(t('Thank you for your participation'),`${i18n.language === 'ar' ? res.data.data.result.ar:res.data.data.result.ar}`,[
                    {
                        text: t("Cancel"),
                        onPress: ()=>null,
                        style:"cancel"
                    },
                    {
                        text:t("Go to Home Page"),
                        onPress: ()=> navigation.navigate('Profile'),
                        style: "default"
                    }

                ])
            }).catch(err=>{
                console.log(err.message)
            })
        }
    }
    return(
        <NativeBaseProvider>
            {loading && <HStack mt='10%' justifyContent='center' alignItems='center' ><Spinner size='lg'   color='success.300' /></HStack> }
            {!loading && 
                <ScrollView>
                    <VStack safeArea >
                        {/* <Text textAlign='center' color='danger.900' fontSize={20} mt={2} >{I18nManager.isRTL ? responses.data.rules.ar :responses.data.rules.en}</Text> */}
                        <Center>
                        {responses.data.questions.map((question,Index)=>{
                            return(
                                <Center key={Index}>
                                    <Text textAlign='center' fontSize='lg' fontWeight='bold' mt={2} key={Index} >{Index+1}  :  {I18nManager.isRTL ?   question.body.ar + " ؟" :question.body.en + " ?"} </Text>
                                    <Center>
                                        {question.answers.map((answer,index)=>{
                                            return(
                                                <FormControl key={index} isRequired>
                                                    <Radio.Group   my={2} key={index} colorScheme="success" onChange={(val)=>{catchValue(val,responses.data.questions)}}>
                                                        <Radio mx={5} value={I18nManager.isRTL ? answer.body.ar :answer.body.en}>
                                                            <Text mx={1} >{I18nManager.isRTL ? answer.body.ar :answer.body.en}</Text>
                                                        </Radio>
                                                    </Radio.Group>   
                                                </FormControl>
                                            )
                                        })}
                                    </Center>
                                </Center>
                            )
                        })}
                        <FormControl>
                            <Center>
                                {error && <Text italic={true} color='error.700'>{t('Please Answer all the above Questions')}</Text>}
                                <Button width={200}  my={2} colorScheme='emerald' borderRadius={35} onPress={handleSubmit} >{t('Submit')}</Button>
                            </Center>
                        </FormControl>
                        </Center>
                    </VStack>
                </ScrollView>
            }
        </NativeBaseProvider>
    )
}

