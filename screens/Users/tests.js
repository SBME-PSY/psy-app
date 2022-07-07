import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox, FormControl} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet, ToastAndroid} from "react-native";
import depressed from '../../assets/Img/depression.png'
import { TouchableOpacity } from "react-native";
import responses from "../../assets/responses";
import { Formik } from "formik";
// declare module 'react-native-simple-survey'

export default function tests(){
    const {t,i18n} = useTranslation();
    const [error,setError] = useState(false);
    let results={}
    const handleSubmit = () => {
        results.questionnaireID = responses.data._id
        results.category = responses.data.category
        if(!results.answers){
            setError(true)
            setInterval(() => {
                setError(false)
            }, 5000);
        }
        else{
            console.log(results)
            ToastAndroid.showWithGravityAndOffset(
                t("Your answers have been submitted"),
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }
    const catchValue = (value,index) => {
        results.answers =[]
        if(results.answers.length == 0){
            results.answers.push({qIndex:index,answer:value})
        }
        else{
            for(let i=0;i<results.answers.length;i++){
                if(results.answers[i].index==index && results.answers[i].answer ==value){
                    return;
                }
                else if(results.answers[i].index==index && results.answers[i].answer !=value){
                    results.answer[i].answer = value
                }
                else{
                    results.answer.push({qIndex:index,answer:value})
                }
            }
        }
    }
    return(
        <NativeBaseProvider>
            <VStack safeArea >
                <Text textAlign='center' fontSize={20} mt={2} >{I18nManager.isRTL ? responses.data.rules.ar :responses.data.rules.en}</Text>
                <Center>
                    
                {responses.data.questions.map((question,Index)=>{
                    return(
                        <>
                            <Text textAlign='center' fontSize={15} mt={2} key={Index} >{Index+1}  :  {I18nManager.isRTL ?   question.body.ar + " ؟" :question.body.en + " ?"} </Text>
                            <Center>
                                <FormControl isRequired>
                            {question.answers.map((answer,index)=>{
                                return(
                                        <Radio.Group key={index}  colorScheme="success" onChange={(val)=>{catchValue(val,Index)}}>
                                            <Radio value={I18nManager.isRTL ? answer.body.ar :answer.body.en}>
                                                <Text mx={5} >{I18nManager.isRTL ? answer.body.ar :answer.body.en}</Text>
                                            </Radio>
                                        </Radio.Group>   
                                )
                            })}
                                {error && <Text italic={true} color='error.700'>{t('Please Answer the above Questions')}</Text>}
                                <FormControl>
                                    <Button my={2} colorScheme='emerald' borderRadius={35} onPress={handleSubmit} >{t('Submit')}</Button>
                                </FormControl>
                                </FormControl>
                            </Center>
                        </>
                    )
                })}
                </Center>
            </VStack>
        </NativeBaseProvider>
    )
}