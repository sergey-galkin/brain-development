import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { getGamesData } from '../../../meta_data/games/gamesMetaData';

function createInitialState() {
  const gamesData = getGamesData();
  const ids = Object.keys(gamesData);
  const state = ids.reduce((res, id) => 
    {
      res.entities[id] = {
        id: id,
        bestResult: null, 
        gamesPlayed: 0, 
        level: 0 
      }
      return res;
    },
    {ids: ids, entities: {}}
  );
  
  return state;
}

const gamesStatAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id.localeCompare(b.id)
});

export const gamesStatSlice = createSlice({
  name: 'gamesStat',
  initialState: createInitialState(),
  reducers: {
    updateGameStat: (state, action) => {
      const {id, result} = action.payload;
      const stat = current(state).entities[id];
      
      let bestResult = stat.bestResult;
      if (bestResult === null || result > bestResult) {
        bestResult = result;
      }

      const newStat = {
        id: id,
        bestResult: bestResult,
        gamesPlayed: stat.gamesPlayed + 1,
      }
      
      gamesStatAdapter.upsertOne(state, newStat);
    },
    setGamesStat: gamesStatAdapter.setAll,
  }
})

export const { updateGameStat } = gamesStatSlice.actions;

export default gamesStatSlice.reducer;

export const {
  selectAll: selectAllGamesStat,
  selectById: selectGameStatById
} = gamesStatAdapter.getSelectors(state => state.gamesStat)


