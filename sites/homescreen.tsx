import React from 'react';
import {ScrollView, StyleSheet, Text, View } from 'react-native';

function Homescreen() {
  return (
      <ScrollView style={styles.constainer}>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
        <Text style={{fontSize: 20}}>Home Screen</Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'green'
  },
  image: {
    backgroundColor: 'red',
    width: 300,
    height: 300,
    margin: 5,
  }
})

export default Homescreen;
