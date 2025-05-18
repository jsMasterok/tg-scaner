import { fakeData } from "./constants";
export function searchFakeGroups(query: string) {
  const q = query.trim().toLowerCase();
  return fakeData.filter((group) => group.title.toLowerCase().includes(q));
}
