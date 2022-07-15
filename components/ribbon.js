import React from 'react'
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Svg ,{SvgProps,Path,Polygon,G,Rect,Text,Line} from 'react-native-svg';

const Ribbon = ({color,textColor,text}) =>{
    return(
        <Svg height="70" width="70">
            <Polygon points="0 0, 0 10, 10 10" fill={color} strokeWidth="0" />
            <Polygon points="0 0, 70 70, 70 40, 30 0" fill={color} strokeWidth="0" />
            <Polygon points="60 60, 60 70, 70 70" fill={color} strokeWidth="0" />
            <G rotation="45" origin="130, -20">
                <Text x="100" y="80" stroke={textColor} fill={textColor} textAnchor="middle">{text}</Text>
            </G>
        </Svg>
    )
}
export default Ribbon