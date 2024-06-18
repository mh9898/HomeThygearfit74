import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
      state.leaderboard.push(action.payload);
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
