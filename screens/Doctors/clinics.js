import { Button, NativeBaseProvider,Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

const Clinics = ({navigation})=>{
    const {t,i18n} = useTranslation();
    return(
        <NativeBaseProvider>
            <VStack safeArea>
                
            </VStack>
        </NativeBaseProvider>
    )
}
export default Clinics;