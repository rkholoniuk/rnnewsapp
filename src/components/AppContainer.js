'use strict';
import React, { Component } from 'react';

import {
  PanResponder,
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  AlertIos,
  Image,
  Coordinates,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Dimensions,
  processColor
} from 'react-native';
import Badge from 'react-native-smart-badge'
var img = require('../images/EDBus.png');
var {width, height} = Dimensions.get('window');
class Tile extends Component {
  constructor(props) {
    super(props);
  }
  handlePress(evt, index){
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
      
      console.log("Coordinates",`x coord = ${locationX}`);
      console.log("Coordinates",`y coord = ${locationY}`);
      alert(`x coord = ${locationX} y coord = ${locationY} index = ${index}`)
      var cordinates = {
        "xcor":locationX,
        "ycor":locationY,
        "name" :"Test"}
  }
  renderImage(imageOffset){
    return (
      <Image
          source={img}
          style={[styles.image,
            {
              top: imageOffset.y,
              left: imageOffset.x,
              width: width,
              height: height
            }
          ]} />
    );
  }
  renderText(index){
    return (
      <Text>Part Tile {index}</Text>
    );
  }
  render() {
    var {imageOffset, index} = this.props;
    return (
      <View
       style={[styles.view, this.props.style]}>
        <TouchableOpacity onLongPress={(evt) => this.handlePress(evt, index)}>
        {/* {this.renderImage(imageOffset)} */}
            {this.renderText(index)}
        </TouchableOpacity>
      
      </View>
    )
  }
}
class Preview extends Component {
  constructor() {
    super();
    var {width, height} = Dimensions.get('window');
    var width_max = 4;
    var height_max = 4;
    var w = width / width_max;
    var h = height / height_max;
    var tiles = [];
    
    var index = 0;
    for (let i = 0; i < width_max; i++) {
      for (let j = 0; j < height_max; j++) {
        ++index;
        var key = `${i}${j}`
        tiles.push((
          <Tile
            key={key}
            style={[styles.tile,{
              width: w,
              height: h,
              left: (i * w),
              top: (j * h)
            }]}
            x={i*w}
            y={j*h}
            imageOffset={{x: -(i * w), y: -(j * h)}} index={index}/>
        ));
      }
    }
    this.state = {tiles: tiles};
  }
  renderImage(){
    return (
      <Image
          source={img}
          style={[styles.image,
            {
              top: 0,
              left: 0,
              width: width,
              height: height
            }
          ]} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.state.tiles}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    position: 'absolute',
    width: 100,
    height: 100
  },
  view: {
    overflow: 'hidden'
  },
  image: {
    position: 'absolute'
  }
});
export default Preview;