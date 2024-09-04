import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({keyword, genre, page}) => {
  
  if(keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`) 
  }else if(genre) {
    return api.get(`/discover/movie?with_genres=${genre}&page=${page}`)
  }
  return api.get(`/movie/popular?page=${page}`)
}
export const useSearchMovieQuery = ({keyword, genre, page}) => {
  return useQuery({
    queryKey:['movie-search',{keyword,genre, page}],
    queryFn:()=>fetchSearchMovie({keyword, genre, page}),
    select:(result) => result.data 
  })   
}