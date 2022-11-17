import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGameStatById, updateGameStat } from "../../components/Pages/Profile/gamesStatSlice";

export default function (gameId) {
  const previousBest = useRef(null);
  const { bestResult } = useSelector((state) => selectGameStatById(state, gameId));
  const dispatch = useDispatch();
  
  const update = (current) => {
    previousBest.current = bestResult;
    dispatch(updateGameStat({id: gameId, result: current}))
  }

  const result = {previousBest: previousBest.current, best: bestResult}
  return [result, update]
}