import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from './StackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {resetGame} from '../store/gameSlice';

type NavProps = NativeStackScreenProps<StackScreenProps, 'DetailsScreen'>;

const DetailsScreen = ({navigation}: NavProps) => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state: RootState) => state.game.leaderboard);

  //functions
  const handleDetailsNavPressed = () => {
    dispatch(resetGame());
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <FlatList
        style={{backgroundColor: 'tomato', flexDirection: 'column', flex: 1}}
        data={leaderboard}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.leaderboardText}>{item.name}</Text>
            <Text style={styles.leaderboardText}>Score = {item.score}</Text>
          </View>
        )}
      />
      {/* Make a flet list with top 10 scores */}
      <TouchableOpacity style={styles.button} onPress={handleDetailsNavPressed}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  leaderboardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  leaderboardText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
