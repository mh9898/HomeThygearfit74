import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  Modal,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {addLeaderboardEntry, resetGame} from '../store/gameSlice';
import {RootState} from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LeaderboardEntry = {
  name: string;
  score: number;
};

type RootStackParamList = {
  HomeScreen: undefined;
  GameOverModal: undefined;
};

type NavProps = NativeStackScreenProps<RootStackParamList, 'GameOverModal'>;

const GameOverModal: React.FC<NavProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.game.score);
  const [isDoneKeyboardPressed, setIsDoneKeyboardPressed] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const leaderboardAsyncStorage = await AsyncStorage.getItem('leaderboard');
      if (leaderboardAsyncStorage) {
        setLeaderboard(JSON.parse(leaderboardAsyncStorage));
      }
    } catch (error) {
      console.log('Error loading leaderboard:', error);
    }
  };

  const playAgainKeyboard = async () => {
    const updatedLeaderboard = [...leaderboard, {name, score}];
    updatedLeaderboard.sort((a, b) => b.score - a.score);
    const top10Leaderboard = updatedLeaderboard.slice(0, 10); // Limit to top 10

    try {
      await AsyncStorage.setItem(
        'leaderboard',
        JSON.stringify(top10Leaderboard),
      );
      setLeaderboard(top10Leaderboard);
    } catch (error) {
      console.log('Error saving leaderboard:', error);
    }

    dispatch(addLeaderboardEntry({name, score}));
    dispatch(resetGame());
    Keyboard.dismiss();
    setName('');
    setIsDoneKeyboardPressed(true);
  };

  const playAgain = async () => {
    if (isDoneKeyboardPressed) {
      // setIsDoneKeyboardPressed(false);
      navigation.navigate('HomeScreen');
    } else {
      const updatedLeaderboard = [...leaderboard, {name, score}];
      updatedLeaderboard.sort((a, b) => b.score - a.score);
      const top10Leaderboard = updatedLeaderboard.slice(0, 10); // Limit to top 10

      try {
        await AsyncStorage.setItem(
          'leaderboard',
          JSON.stringify(top10Leaderboard),
        );
        setLeaderboard(top10Leaderboard);
      } catch (error) {
        console.log('Error saving leaderboard:', error);
      }

      dispatch(addLeaderboardEntry({name, score}));
      dispatch(resetGame());
      Keyboard.dismiss();
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>Game Over</Text>
          {!isDoneKeyboardPressed && (
            <Text style={styles.title}>Your Score: {score}</Text>
          )}
          {!isDoneKeyboardPressed && (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              onSubmitEditing={playAgainKeyboard}
            />
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={styles.buttonPlayAgain}
              onPress={playAgain}>
              <Text style={styles.buttonTextPlayAgain}>Play again</Text>
            </TouchableOpacity>
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
            <View style={styles.leaderboardHeader}>
              {isDoneKeyboardPressed ? (
                <Text style={styles.leaderBoardHeaderTextTitle}>Top 10's</Text>
              ) : (
                <View style={styles.leaderboardHeaderCurrentPlayer}>
                  {name.length > 0 && (
                    <Text style={styles.leaderboardText}> Name: {name}</Text>
                  )}
                  <Text style={styles.leaderboardText}>
                    {' '}
                    Your Score: {score}
                  </Text>
                </View>
              )}
            </View>
          }
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonPlayAgain: {
    backgroundColor: '#111827',
    borderRadius: 5,
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonTextPlayAgain: {
    color: 'white',
    fontSize: 16,
  },
  leaderboardHeader: {
    backgroundColor: '#935438',
    padding: 10,
  },
  leaderboardHeaderCurrentPlayer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  leaderBoardHeaderTextTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardText: {
    textAlign: 'center',
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
});

export default GameOverModal;
