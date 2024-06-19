import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import {StackScreenProps, RootScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {addLeaderboardEntry, resetGame} from '../store/gameSlice';
import {RootState} from '../store/store';

type NavProps = NativeStackScreenProps<StackScreenProps, 'GameOverModal'>;

const GameOverModal = ({navigation}: NavProps) => {
  const [name, setName] = useState('');
  const [isSavedDisabled, setIsSavedDisabled] = useState(true);
  const dispatch = useDispatch();
  const leaderboard = useSelector((state: RootState) => state.game.leaderboard);
  const score = useSelector((state: RootState) => state.game.score);

  const saveScore = () => {
    // if (name) {

    // }
    dispatch(addLeaderboardEntry({name, score}));
    setIsSavedDisabled(false);
    Keyboard.dismiss();
  };

  const playAgain = () => {
    dispatch(resetGame());
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#2c3e50',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.title}>Your Score: {score}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {isSavedDisabled ? (
            <TouchableOpacity style={styles.button} onPress={saveScore}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={playAgain}>
              <Text style={styles.buttonText}>Play again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        style={{backgroundColor: 'tomato', flexDirection: 'column', flex: 1}}
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.leaderboardText}>{item.name}</Text>
            <Text style={styles.leaderboardText}>Score = {item.score}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: '#935438',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.leaderboardTextTitle}>Top 10's</Text>
              {name.length > 0 && (
                <Text style={styles.leaderboardText}> Player Name: {name}</Text>
              )}
              <Text style={styles.leaderboardText}> Score: {score}</Text>
            </View>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
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
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  leaderboardItem: {
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  leaderboardTextTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default GameOverModal;