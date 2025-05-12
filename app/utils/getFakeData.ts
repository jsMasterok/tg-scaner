import { fakeData } from "./constants";

export function findGroupByLink(link: string) {
  const result = fakeData.find((item) => item.link === link);
  return result || false;
}
