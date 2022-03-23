import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function storeAuthData  (value,role){
        try{     
            await  AsyncStorage.setItem('authData',JSON.stringify({
            token: value,
            role: role
        }));
        }
        catch(err){
            console.log(err);
        }
}