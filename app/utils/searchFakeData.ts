import { fakeData } from "./constants";

export function searchFakeGroups(query: string) {
  const q = query.trim().toLowerCase();

  return fakeData.filter((group) => {
    const titleMatch = group.title.toLowerCase().includes(q);
    const aboutMatch = group.about?.toLowerCase().includes(q);
    return titleMatch || aboutMatch;
  });
}
