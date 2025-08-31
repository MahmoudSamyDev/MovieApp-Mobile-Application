import { MovieDetails } from "@/interfaces/interfaces";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const READ_TOKEN = process.env.EXPO_PUBLIC_API_READ_TOKEN;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${READ_TOKEN}`,
  },
};

export async function fetchMovies(searchQuery?: string) {
  let requestUrl = "";
  if (searchQuery) {
    requestUrl = `${BASE_URL}/search/movie?query=${searchQuery}`;
  } else {
    requestUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
  }

  const response = await fetch(requestUrl, options)
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((err) => console.error(err));

  return response;
}

export async function fetchMovieDetails(
  movieId: string
): Promise<MovieDetails> {
  try {
    const requestUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(requestUrl, options);
    return response.json();
  } catch {
    throw new Error("Failed to fetch movie details");
  }
}
