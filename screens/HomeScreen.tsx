import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {StackScreenProps, RootScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SimonGame from '../components/SimonGame';

type NavProps = NativeStackScreenProps<StackScreenProps, 'HomeScreen'>;

const HomeScreen = ({navigation}: NavProps) => {
  const [score, setScore] = useState(0);

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  const handleDetailsNavPressed = () => {
    navigation.navigate('DetailsScreen', {score: '1000 from Home'});
  };

  const handleModalNavPressed = () => {
    navigation.navigate('ModalScreen', {score: '10 from Home'});
  };

  return (
    // <View style={styles.homeContainer}>
    //   <Text>HomeScreen</Text>
    //   <Button title="Go to Details" onPress={handleDetailsNavPressed} />
    //   <Text>ModalScreen</Text>
    //   <Button onPress={handleModalNavPressed} title="Open Modal" />
    // </View>

    <SafeAreaView style={styles.container}>
      {/* <ScoreBoard score={score} />
      <GameBoard onScoreUpdate={handleScoreUpdate} /> */}
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
  },
});
