import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import SimonGame from '../components/SimonGame';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimonGame />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
});
