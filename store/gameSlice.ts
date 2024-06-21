import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Sound from 'react-native-sound';

interface LeaderboardEntry {
  name: string;
  score: number;
}
interface GameState {
  sequence: string[];
  playing: boolean;
  playingIdx: number;
  score: number;
  leaderboard: LeaderboardEntry[];
}

const initialState: GameState = {
  sequence: [],
  playing: false,
  playingIdx: 0,
  score: 0,
  leaderboard: [],
};

const sounds: {[key: string]: Sound} = {
  green: new Sound('green.mp3', Sound.MAIN_BUNDLE),
  red: new Sound('red.mp3', Sound.MAIN_BUNDLE),
  yellow: new Sound('yellow.mp3', Sound.MAIN_BUNDLE),
  blue: new Sound('blue.mp3', Sound.MAIN_BUNDLE),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame(state) {
      state.sequence = [];
      state.playing = false;
      state.playingIdx = 0;
      state.score = 0;
    },
    addNewColor(state) {
      const colors = ['green', 'red', 'yellow', 'blue'];
      const color = colors[Math.floor(Math.random() * 4)];
      state.sequence.push(color);

      // Play sequence of colors Sound
      state.sequence.forEach((color, index) => {
        setTimeout(() => {
          sounds[color].play(success => {
            if (!success) {
              console.log(`Failed to play the ${color} sound`);
            }
          });
        }, index * 500); // Adjust delay as needed
      });
    },
    startGame(state) {
      state.playing = true;
    },
    setPlayingIdx(state, action: PayloadAction<number>) {
      state.playingIdx = action.payload;
    },
    incrementScore(state) {
      state.score += 1;
    },

    addLeaderboardEntry(state, action: PayloadAction<LeaderboardEntry>) {
      const {name, score} = action.payload;
      state.leaderboard.push({name, score});
      state.leaderboard.sort((a, b) => b.score - a.score);
      if (state.leaderboard.length > 10) {
        state.leaderboard.pop();
      }
    },
  },
});

export const {
  resetGame,
  addNewColor,
  startGame,
  setPlayingIdx,
  incrementScore,
  addLeaderboardEntry,
} = gameSlice.actions;
export default gameSlice.reducer;
