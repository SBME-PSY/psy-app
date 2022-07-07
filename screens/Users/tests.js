import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet} from "react-native";
import depressed from '../../assets/Img/depression.png'
import { TouchableOpacity } from "react-native";
import responses from "../../assets/responses";
import { Formik } from "formik";
// declare module 'react-native-simple-survey'

export default function tests(){
    let results={}
    const handleSubmit = () => {
        results.questionnaireID = responses.data._id
        results.category = responses.data.category
        console.log(results)
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
                            {question.answers.map((answer,index)=>{
                                return(
                                    // <Checkbox.Group colorScheme="success" onChange={(val)=>console.log(val[0])}>
                                    //     <Checkbox value={I18nManager.isRTL ? answer.body.ar :answer.body.en}>
                                    //         <Text key={index}>{I18nManager.isRTL ? answer.body.ar :answer.body.en}</Text>
                                    //     </Checkbox>
                                    // </Checkbox.Group>
                                    <Radio.Group key={index} colorScheme="success" onChange={(val)=>{catchValue(val,Index)}}>
                                        <Radio value={I18nManager.isRTL ? answer.body.ar :answer.body.en}>
                                            <Text >{I18nManager.isRTL ? answer.body.ar :answer.body.en}</Text>
                                        </Radio>
                                    </Radio.Group>

                                )
                            })}
                            <Button onPress={handleSubmit} >Submit</Button>
                            </Center>
                        </>
                    )
                })}
                </Center>
            </VStack>
        </NativeBaseProvider>
    )
}