import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavProps = NativeStackScreenProps<StackScreenProps, 'DetailsScreen'>;

const DetailsScreen = ({navigation, route}: NavProps) => {
  const handleDetailsNavPressed = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.detailsContainer}>
      <Text>DetailsScreen</Text>
      <Button title="Go Home" onPress={handleDetailsNavPressed} />
      <Text>{route.params.score}</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
