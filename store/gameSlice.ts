import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GameState {
  sequence: string[];
  playing: boolean;
  playingIdx: number;
}

const initialState: GameState = {
  sequence: [],
  playing: false,
  playingIdx: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame(state) {
      state.sequence = [];
      state.playing = false;
      state.playingIdx = 0;
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
  },
});

export const {resetGame, addNewColor, startGame, setPlayingIdx} =
  gameSlice.actions;
export default gameSlice.reducer;
