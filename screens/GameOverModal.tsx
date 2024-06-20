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

  const playAgain = async () => {
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
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
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
            <TouchableOpacity style={styles.button} onPress={playAgain}>
              <Text style={styles.buttonText}>Play again</Text>
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
            <View
              style={{
                backgroundColor: '#935438',
                padding: 10,
              }}>
              <Text style={styles.leaderboardTextTitle}>Top 10's</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {name.length > 0 && (
                  <Text style={styles.leaderboardText}>
                    {' '}
                    Player Name: {name}
                  </Text>
                )}
                <Text style={styles.leaderboardText}> Score: {score}</Text>
              </View>
            </View>
          }
        />
      </Modal>
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
