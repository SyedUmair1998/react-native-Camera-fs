import React from 'react';
import { View,Text,Button } from 'react-native';
import {RNCamera} from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from  'react-native-fs';
const App = () => {

  const [{cameraRef},{takePicture}] =useCamera(); 
  const captureHandle = async() =>{
    try{
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath+'/mytest.jpg';
      RNFS.moveFile(filePath,newFilePath)
      .then(()=>{
        console.log('File Path ',filePath);
        console.log('New File Path ',newFilePath);
      })
      .catch((error)=>{
        console.log('Error while saving an image ',error);
      })
    }
    catch(error)
    {
      console.log('Error');
      console.log(error);
    }
  }
  
  return (
    <View style={{flex:1}}>
      <RNCamera
      ref = {cameraRef} 
      type={RNCamera.Constants.Type.back}
      style={{flex:1,alignItems:'center',justifyContent:'center'}}
      />
      <Button title="take upload" onPress={()=>captureHandle()} />
    </View>
  )
}

export default App
