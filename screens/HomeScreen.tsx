import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {StackScreenProps, RootScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavProps = NativeStackScreenProps<StackScreenProps, 'HomeScreen'>;

const HomeScreen = ({navigation}: NavProps) => {
  const handleDetailsNavPressed = () => {
    navigation.navigate('DetailsScreen', {score: '1000 from Home'});
  };

  const handleModalNavPressed = () => {
    navigation.navigate('ModalScreen', {score: '10 from Home'});
  };

  return (
    <View style={styles.homeContainer}>
      <Text>HomeScreen</Text>
      <Button title="Go to Details" onPress={handleDetailsNavPressed} />
      <Text>ModalScreen</Text>
      <Button onPress={handleModalNavPressed} title="Open Modal" />
    </View>
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
});
