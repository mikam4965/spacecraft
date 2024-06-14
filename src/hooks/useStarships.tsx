import { useQuery } from '@tanstack/react-query';

async function fetchStarshipsData() {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/starships/`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Something bad happened with the API…");
  }
}

export function useStarships() {
  return useQuery({
    queryKey: ['starships'],
    queryFn: fetchStarshipsData,
  });
}
