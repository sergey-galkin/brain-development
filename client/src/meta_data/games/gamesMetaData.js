import * as gamesData from './collector';

export const getGamesData = () => gamesData;

export const getGameData = ({id, url}) => {
  if (id) return gamesData[id];
  for (const key in gamesData) {
    if (Object.hasOwnProperty.call(gamesData, key)) {
      if (url) {
        const urls = gamesData[key].urls;
        if ( urls.includes(url) ) return gamesData[key];
      }
    }
  }
  return false;
}