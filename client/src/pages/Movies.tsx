import { useEffect } from "react";
import { getMoviesRequest } from "../api/movies";
import { useMoviesStore } from "../store/movies";
import CardPrimaryMovie from "../components/Movies/CardPrimaryMovie";
import AvailableMovies from "../components/Movies/AvailableMovies";

export default function Movies() {
  const setMovies = useMoviesStore((state) => state.setMoviesStore);

  useEffect(() => {
    async function api() {
      const res = await getMoviesRequest();
      setMovies(res.data.content);
    }
    api();
  }, []);

  return (
    <>
      <AvailableMovies />
      <CardPrimaryMovie></CardPrimaryMovie>
    </>
  );
}
