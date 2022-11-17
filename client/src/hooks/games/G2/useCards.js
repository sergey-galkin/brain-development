import { useCallback, useReducer } from "react";

export default function() {
  const createRandomIndexes = useCallback((amount) => {
    const indexes = [];
    for (let i = 0; i < amount; i++) {
      indexes.push({
        i: i,
        random: Math.random(),
      })
    }
    return indexes.sort((a, b) => b.random - a.random)
  }, []);

  const createCards = useCallback((difficulty) => {
    // const uniqueCardsAmount = 1;
    const uniqueCardsAmount = 12;
    const maxDifficulty = 3;
    const uniqueCardsAmountInGame = uniqueCardsAmount / (maxDifficulty + 1 - difficulty);
    const indexes = createRandomIndexes(uniqueCardsAmount);
    const cards = [];
    // for (let i = 0; i < 2 + 0 * (4 - difficulty); i++) {
    for (let i = 0; i < 4 * (4 - difficulty); i++) {
      for (let j = 0; j < uniqueCardsAmountInGame; j++) {
        cards.push({
          pictureId: indexes[j].i,
          active: true,
          turned: false,
          matched: false,
          random: Math.random()
        })
      }
    }
    return cards.sort((a, b) => b.random - a.random)
  }, []);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return createCards(action.payload);
      case 'update':
        return action.payload;
      default:
        throw new Error('Unknown action type in "useCards" hook');
    }
  }, []);

  const [cards, dispatch] = useReducer(reducer, []);

  return [cards, dispatch];
}