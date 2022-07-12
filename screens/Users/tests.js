import React, { useState ,useEffect} from "react";
import { NativeBaseProvider,VStack,Text,Card,Avatar, HStack, Center,Radio, Button,Checkbox, FormControl, ScrollView, Spinner} from "native-base";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { I18nManager ,StyleSheet, ToastAndroid,Dimensions, Alert} from "react-native";
import { TouchableOpacity } from "react-native";
import getAuthData from "../../hooks/getAuthData";

export default function tests({navigation,route}){
    const {t,i18n} = useTranslation();
    const [responses,setResponses] = useState([])
    const [error,setError] = useState(false);
    const [loading,isLoading] = useState(true)
    const [answered,setAnswered] = useState(false)
    let qCounter = 0
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
                if(questions[i].answers[j].body.en == value || questions[i].answers[j].body.ar == value){
                    questions[i].answers[j].choosen = true
                }
            }
            
            results['questions'] = questions
        }
        qCounter++
    }

    const handleSubmit = async () => {
        results.questionnaireID = responses.data._id
        results.category = responses.data.category
        results.rules = {}

        if(!results.questions || results.questions.length != qCounter ){
            setError(true)
            setInterval(() => {
                setError(false)
            }, 5000);
        }
        else{
            console.log(qCounter)
            qCounter = 0
            let authData  = await getAuthData();
            axios.post('/psy/results',results,{
                headers:{
                    'Accept': 'application/json',
                    Authorization: `Bearer ${authData.token}`
            }}).then(res=>{
                Alert.alert(t('Thank you for your participation'),`${ t('Your test result is:  ') + i18n.language === 'ar' ? res.data.data.result.ar:res.data.data.result.ar}`,[
                    {
                        text: t("Take the test again"),
                        onPress: ()=> navigation.navigate('testsCat'),
                        style:"cancel"
                    },
                    {
                        text:t("Go to Home Page"),
                        onPress: ()=> navigation.navigate('ViewUserProfile'),
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
                        <Center>
                        <Text textAlign='center' my={2} px={2} color='warning.800'>{t('Desclaimer !!!, This test is only an indication you should visit a doctor to get a more trusted diagnosis')}</Text>
                        {responses.data.questions.map((question,Index)=>{
                            return(
                                <Center key={Index}>
                                    <Text textAlign='center' fontSize='lg' fontWeight='bold' mt={2} key={Index} >{Index+1}  :  {I18nManager.isRTL ?   question.body.ar + " ؟" :question.body.en + " ?"} </Text>
                                    <Center>
                                        {question.answers.map((answer,index)=>{
                                            return(
                                                <FormControl key={index} isRequired>
                                                    <Radio.Group shadow={answered}  my={2} key={index} colorScheme="success" onChange={(val)=>{catchValue(val,responses.data.questions)}}>
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

