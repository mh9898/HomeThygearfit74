import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps, RootScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {addLeaderboardEntry} from '../store/gameSlice';
import {RootState} from '../store/store';

type NavProps = NativeStackScreenProps<StackScreenProps, 'GameOverModal'>;

const GameOverModal = ({navigation}: NavProps) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  //   const leaderboard = useSelector((state: RootState) => state.game.leaderboard);
  const score = useSelector((state: RootState) => state.game.score);

  const handleRestart = () => {
    // if (name) {

    // }
    dispatch(addLeaderboardEntry({name, score}));
    navigation.navigate('DetailsScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.title}>{score}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleRestart}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GameOverModal;
