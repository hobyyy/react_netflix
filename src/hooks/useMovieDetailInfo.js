import { useQuery } from "@tanstack/react-query"
import api from "../utils/api";

const fetchMovieDetailInfo = (id) => {
  console.log('id111', id)
  return api.get(`/movie/${id}`);
}

export const useMovieDetailInfoQeury = (id) => {
  return useQuery({
    queryKey:['movie-detail', id],
    queryFn:() => fetchMovieDetailInfo(id),
    select:(result) => result.data
  })
}