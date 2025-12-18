/* import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface FetchMoviesResp {
  results: Movie[];
}

export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResp>(`/search/movie`, {
    params: { query: topic },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
};
 */
