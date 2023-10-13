import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text} from 'react-native';
import Homescreen from './sites/homescreen'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Homescreen></Homescreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
