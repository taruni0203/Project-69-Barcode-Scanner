import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
// import Scanner from './assets/Barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor(){
    super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
      }
  }
  getCameraPermissions = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === 'granted'
    })
  }
  handledBarcodeScanned = async ({type,data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }
  
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner 
          onBarCodeScanned = {scanned ? undefined: this.handledBarcodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(buttonState === 'normal'){
      return (
        <View style= {styles.container}>
        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />
        <Text style = {styles.titleText}>Bar Code Scanner</Text>
          <Text style = {styles.displayText}>
            {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permissions"}
          </Text>
          <TouchableOpacity onPress = {this.getCameraPermissions} style = {styles.scanButton}>
            <Text style = {styles.buttonText}>Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
      
    }
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    displayText: {
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton: {
      backgroundColor: '#2196fe',
      padding: 10,
      margin: 10
    },
    buttonText: {
      fontSize: 20
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    },
    imageIcon: {
        width: 150,
        height: 150,
        alignSelf: "center",
    }
  })