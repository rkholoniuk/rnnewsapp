import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  AlertIos,
  Image,
  Coordinates,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  View,
  Platform
} from 'react-native';

import Badge from 'react-native-smart-badge'


var windowSize = Dimensions.get('window');

const backgroundImage = require('../images/EDBus.png');

class Preview extends Component {
  constructor(props) {
    super(props)

    this.state={
      xcor:null,
      ycor:null,
      corx:'',
      array:[],
      width:300, 
      height:100
    }
  }
  handlePress(evt){
    var array =this.state.array
    var locationX, locationY;
    // debugger;
    if (Platform.OS == 'web') {
      if (evt.nativeEvent.changedTouches){
        var touch = evt.nativeEvent.changedTouches[0];
        locationX = touch.pageX;
        locationY = touch.pageY;
      }
      
      locationX = evt.nativeEvent.clientX;
      locationY = evt.nativeEvent.clientY;
    } else {
      locationX = evt.nativeEvent.locationX;
      locationY = evt.nativeEvent.locationY;
    }
    
    // var block_width = this.state.width / 19;
    // var block_height = this.state.height / 10;

    
    console.log("Coordinates",`x coord = ${locationX}`);
    console.log("Coordinates",`y coord = ${locationY}`);
    var cordinates = {
      "xcor":locationX,
      "ycor":locationY,
      "name" :"Test"}
    array.push(cordinates)
    this.setState({
      array:array
    })
}

  render() {
    var array =[];
    if(this.state.array.length != 0){
      this.state.array.map((res)=>{
        array.push(
          <View style={{position:"absolute",flex:1,left:res.xcor,top:res.ycor,backgroundColor:'black'}}>
           <Badge textStyle={{color: 'white',}} minWidth={10} minHeight={10}>
                    {`x= ${parseInt(res.xcor)} y= ${parseInt(res.ycor)}`}
            </Badge>

          </View>
          )
      })
    }
    return (
      <View style={styles.container} >
      <View style={{position:'absolute'}} >
      <TouchableOpacity onLongPress={(evt) => this.handlePress(evt)}>
        <ScrollView showsHorizontalScrollIndicator={true} 
                    showsVerticalScrollIndicator={true} 
                    style={[{flex: 1, width:windowSize.width,height:windowSize.height}]}
                    scrollEventThrottle={16}
                    directionalLockEnabled={true}>
        <Image  source={backgroundImage} style={[
                                                {resizeMode:'cover'},
                                                {width:windowSize.width,height:windowSize.height},
                                                //{width:this.state.width,height:this.state.height}
                                                ]}>
        </Image>
        </ScrollView>
         </TouchableOpacity>

        </View>

        {this.state.array.length != 0 ?(
              <View >
                {array}
              </View>
          ):(<View></View>)
         }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});

export default Preview;
