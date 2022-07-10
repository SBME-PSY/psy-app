import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox, FormControl} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet, ToastAndroid} from "react-native";
import { TouchableOpacity } from "react-native";
import responses from "../../Constants/responses";
import { Formik } from "formik";
// declare module 'react-native-simple-survey'

export default function tests(){
    const {t,i18n} = useTranslation();
    const [error,setError] = useState(false);
    const [radioValue,setRadioValue] = useState();
    let results={}
    const handleSubmit = () => {
        results.questionnaireID = responses.data._id
        results.category = responses.data.category
        if(!results.questions || results.questions[0].answers.length !== responses.data.questions.length){
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
    const catchValue = (value,questions) => {
        for(let i=0;i<questions.length;i++){
            for(let j = 0; j<questions[i].answers.length;j++){
                if(questions[i].answers[j].body.en == value && questions[i].answers[j].body.en == value){
                    questions[i].answers[j].chosen = true
                }
                else{
                    questions[i].answers[j].chosen = false
                }
            }
        }
        results.questions = questions
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
                                        <Radio.Group key={index} value={radioValue} colorScheme="success" onChange={(val)=>{catchValue(val,responses.data.questions)}}>
                                            <Radio value={I18nManager.isRTL ? answer.body.ar :answer.body.en}>
                                                <Text mx={5} >{I18nManager.isRTL ? answer.body.ar :answer.body.en}</Text>
                                            </Radio>
                                        </Radio.Group>   
                                )
                            })}
                                
                                </FormControl>
                            </Center>
                        </>
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
        </NativeBaseProvider>
    )
}