import React, {useRef, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  resetGame,
  addNewColor,
  startGame,
  setPlayingIdx,
  incrementScore,
  addLeaderboardEntry,
} from '../store/gameSlice';
import GameBtn from './GameBtn';
import {useNavigation} from '@react-navigation/native';

const SimonGame: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sequence = useSelector((state: RootState) => state.game.sequence);
  const playing = useSelector((state: RootState) => state.game.playing);
  const playingIdx = useSelector((state: RootState) => state.game.playingIdx);
  const score = useSelector((state: RootState) => state.game.score);

  const greenRef = useRef<TouchableOpacity>(null);
  const redRef = useRef<TouchableOpacity>(null);
  const yellowRef = useRef<TouchableOpacity>(null);
  const blueRef = useRef<TouchableOpacity>(null);

  const handleNextLevel = () => {
    if (!playing) {
      dispatch(startGame());
      dispatch(addNewColor());
    }
  };

  const handleColorClick = (
    color: string,
    ref: React.RefObject<TouchableOpacity>,
  ) => {
    if (playing) {
      if (ref.current) {
        ref.current.setNativeProps({style: {opacity: 0.5}});
        setTimeout(() => {
          if (ref.current) {
            ref.current.setNativeProps({style: {opacity: 1}});

            if (sequence[playingIdx] === color) {
              if (playingIdx === sequence.length - 1) {
                setTimeout(() => {
                  dispatch(setPlayingIdx(0));
                  dispatch(addNewColor());
                  dispatch(incrementScore());
                }, 250);
              } else {
                dispatch(setPlayingIdx(playingIdx + 1));
              }
            } else {
              navigation.navigate('GameOverModal');
            }
          }
        }, 250);
      }
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref: React.RefObject<TouchableOpacity> | null = null;

        switch (sequence[idx]) {
          case 'green':
            ref = greenRef;
            break;
          case 'red':
            ref = redRef;
            break;
          case 'yellow':
            ref = yellowRef;
            break;
          case 'blue':
            ref = blueRef;
            break;
          default:
            ref = null;
            break;
        }

        if (ref && ref.current) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.setNativeProps({style: {opacity: 0.5}});

              setTimeout(() => {
                if (ref.current) {
                  ref.current.setNativeProps({style: {opacity: 1}});
                  if (idx < sequence.length - 1) showSequence(idx + 1);
                }
              }, 250);
            }
          }, 250);
        }
      };

      showSequence();
    }
  }, [sequence]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <GameBtn
          color="green"
          onPress={color => handleColorClick(color, greenRef)}
          ref={greenRef}
        />
        <GameBtn
          color="red"
          onPress={color => handleColorClick(color, redRef)}
          ref={redRef}
        />
      </View>

      <View style={styles.row}>
        <GameBtn
          color="yellow"
          onPress={color => handleColorClick(color, yellowRef)}
          ref={yellowRef}
        />
        <GameBtn
          color="blue"
          onPress={color => handleColorClick(color, blueRef)}
          ref={blueRef}
        />
      </View>

      <TouchableOpacity style={styles.playButton} onPress={handleNextLevel}>
        <Text style={styles.playButtonText}>
          {sequence.length === 0 ? 'Play' : sequence.length}
        </Text>
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  playButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#111827',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  playButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SimonGame;
