import { fakeData } from "./constants";

export function findGroupById(tg_id: number) {
  const result = fakeData.find((item) => item.tg_id === tg_id);
  return result || false;
}
