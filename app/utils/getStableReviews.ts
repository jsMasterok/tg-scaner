import seedrandom from "seedrandom";
import { reviews } from "./constants";
export function getStableReviews(channelId: string) {
  const rng = seedrandom(channelId); // детерминированный рандом

  const count = Math.floor(rng() * 6) + 3; // от 3 до 8

  const shuffled = [...reviews].sort(() => rng() - 0.5);

  return shuffled.slice(0, count);
}
