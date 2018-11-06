/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,Button, Text, View,TouchableOpacity,PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isRun:false
        }
    }
    componentDidMount(){
        PushNotification.configure({
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

        })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native Challenge 2</Text>
        <Text style={styles.instructions}>Başlatma evresinden sonra söylenilen lokasyonlara yaklaşıldığında uygulama arka planda çalışırken bildirim atacaktır.</Text>
        <Button onPress={()=>this.startTracking()} title="Başlat" color="#841584" disabled={this.state.isRun} />
        <Button onPress={()=>this.stopTracking()} title="Durdur" color="#841584"  disabled={!this.state.isRun} />
      </View>
    );
  }
    startTracking(){
        if(!this.state.isRun)
            this.setState({isRun:true});
        BackgroundTimer.runBackgroundTimer(() => {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = parseFloat(position.coords.latitude);
                let lng = parseFloat(position.coords.longitude);
                //Sarah,Rose and Sandra
                //(lat :37.3323, lon:-122.0312) (lat:37.3344 lon:-122.0446) (lat:37.3325 lon:-122.0567)
                if(lat.toFixed(4) == 37.3323 && lng.toFixed(4)==-122.0312){
                    PushNotification.localNotificationSchedule({message:"You're so close Sarah",date: new Date(Date.now()+2000)})
                }
                else if(lat.toFixed(4) == 37.3344 && lng.toFixed(4)==-122.0446){
                    PushNotification.localNotificationSchedule({message:"You're so close Rose",date: new Date(Date.now()+2000)})
                }
                else if(lat.toFixed(4) == 37.3325 && lng.toFixed(4)==-122.0567){
                    PushNotification.localNotificationSchedule({message:"You're so close Sandra",date: new Date(Date.now()+2000)})
                }else{
                    console.log("Nobody's here");
                }

            })
        },10000);
    }
    stopTracking(){
        if(this.state.isRun)
            this.setState({isRun:false});
        BackgroundTimer.stopBackgroundTimer();
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
