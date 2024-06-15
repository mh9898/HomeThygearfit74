import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootScreenProps} from './StackScreen';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavProps = NativeStackScreenProps<RootScreenProps, 'ModalScreen'>;

const ModalScreen = ({navigation, route}: NavProps) => {
  const handleModalDismiss = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.scoreText}>This is a modal!</Text>
      <Text>{route.params.score}</Text>
      <Button onPress={handleModalDismiss} title="Dismiss" />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 30,
  },
});
