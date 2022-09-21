import * as gamesData from './collector';

export const getGamesData = () => gamesData;

export const getGameData = (url) => {
  for (const key in gamesData) {
    if (Object.hasOwnProperty.call(gamesData, key)) {
      const urls = gamesData[key].urls;
      if ( urls.includes(url) ) return gamesData[key];
    }
  }
  // for (let i = 0; i < gamesData.length; i++) {
  //   const urls = gamesData[i].urls;
  //   if (urls.indexOf(url) > -1) return gamesData[i];
  // }
  return false;
}