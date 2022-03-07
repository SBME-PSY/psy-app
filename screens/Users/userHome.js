import { Center, NativeBaseProvider ,Text, VStack} from "native-base";
import React from "react";

const Userhome=({navigation})=>{
    return(
        <NativeBaseProvider >
            <Center safeArea>
                <VStack>
                    <Text textAlign='center'>Welcome to</Text>
                    <Text textAlign='center' >Psy-Awareness</Text>
                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Userhome;