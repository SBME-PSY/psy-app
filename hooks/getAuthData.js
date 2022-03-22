import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthData = async ()=>{
    try{
        let stringAuthData = await AsyncStorage.getItem('authData');
        let authData = JSON.parse(stringAuthData);
        return authData;
    }
    catch(error){
        console.log(error)
    }
    
}
export default getAuthData;