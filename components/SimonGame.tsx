import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import GameBtn from './GameBtn';

const colors = ['green', 'red', 'yellow', 'blue'];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SimonGame: React.FC = () => {
  // states
  const [sequence, setSequence] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  // refs
  const greenRef = useRef<TouchableOpacity>(null);
  const redRef = useRef<TouchableOpacity>(null);
  const yellowRef = useRef<TouchableOpacity>(null);
  const blueRef = useRef<TouchableOpacity>(null);

  // functions
  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  //step 2: add new color to sequence
  const addNewColor = () => {
    //select a random color
    const color = colors[Math.floor(Math.random() * 4)];
    //add the color to the sequence
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  //step 1: show sequence
  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
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

            // check if the clicked color matches the sequence
            if (sequence[playingIdx] === color) {
              // clicked the last color of the sequence
              if (playingIdx === sequence.length - 1) {
                setTimeout(() => {
                  setPlayingIdx(0);
                  addNewColor();
                }, 250);
              } else {
                setPlayingIdx(playingIdx + 1);
              }
            } else {
              resetGame();
            }
          }
        }, 250);
      }
    }
  };

  //step 3: highlight sequence
  useEffect(() => {
    // show sequence
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

        // highlight the ref
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
      {/* Green and red container */}
      <View style={styles.row}>
        <GameBtn
          style={{
            borderTopLeftRadius: 50,
          }}
          color="green"
          onPress={() => handleColorClick('green', greenRef)}
          ref={greenRef}
        />
        <GameBtn
          color="red"
          style={{
            borderTopRightRadius: 50,
          }}
          onPress={() => handleColorClick('red', redRef)}
          ref={redRef}
        />
      </View>

      {/* Yellow and blue container */}
      <View style={styles.row}>
        <GameBtn
          color="yellow"
          style={{
            borderBottomLeftRadius: 50,
          }}
          onPress={() => handleColorClick('yellow', yellowRef)}
          ref={yellowRef}
        />
        <GameBtn
          color="blue"
          style={{
            borderBottomRightRadius: 50,
          }}
          onPress={() => handleColorClick('blue', blueRef)}
          ref={blueRef}
        />
      </View>

      {/* Play button */}
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
    // backgroundColor: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  playButton: {
    position: 'absolute',
    top: windowHeight / 2 - 120,
    backgroundColor: 'rgba(52, 52, 52, 0.95)',
    borderRadius: 100,
    width: 120,
    height: 120,
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
