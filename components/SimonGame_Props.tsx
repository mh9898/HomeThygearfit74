import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import GameBtn from './GameBtn_Props';

const colors = ['green', 'red', 'yellow', 'blue'];

const SimonGame_Props: React.FC = () => {
  // states
  const [sequence, setSequence] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  // functions
  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handleColorClick = (color: string) => {
    if (playing) {
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
  };

  useEffect(() => {
    // show sequence
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        const color = sequence[idx];
        setTimeout(() => {
          if (color) {
            // Simulate the button press effect
            handleColorClick(color);
          }
          if (idx < sequence.length - 1) showSequence(idx + 1);
        }, 500);
      };

      showSequence();
    }
  }, [sequence]);

  return (
    <View style={styles.container}>
      {/* Green and red container */}
      <View style={styles.row}>
        <GameBtn color="green" onPress={handleColorClick} />
        <GameBtn color="red" onPress={handleColorClick} />
      </View>

      {/* Yellow and blue container */}
      <View style={styles.row}>
        <GameBtn color="yellow" onPress={handleColorClick} />
        <GameBtn color="blue" onPress={handleColorClick} />
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

export default SimonGame_Props;
