import React,{useState} from "react";
import {Text, HStack, ScrollView, View, Center} from "native-base";
import { Dimensions} from "react-native";


const {width} = Dimensions.get("window");
const Slidercarousel=({Quotes})=>{

    const [active,setActive]=useState(0);
    const change=({nativeEvent})=>{
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if(slide !== active){
        setActive(slide);
      }
    };
    return(
        <Center>
            <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{width}}
            onScroll={change}
            >
            {
                Quotes.map((item)=>{
                return(
                    <View key={item.id} >
                        <Text textAlign="center" fontWeight="bold" style={{width}}>{item.body}</Text>
                        <Text textAlign="center" mt="5" fontWeight="bold" color="info.500" >{item.author}</Text>
                    </View>
                )
                })
            }
            </ScrollView>
            <HStack alignSelf="center">
            {
                Quotes.map((i,k)=>{
                return(
                    <Text key={k} mx="3" mt="10" color={k===active ? "muted.700":"amber.600"} >⬤</Text>
                )
                })
            }
            </HStack>
        </Center>
    )
}

export default Slidercarousel;