import { date, name } from "faker";

interface Movie {
  Title?: string;
  Released?: Date;
  Genre?: string;
  Director?: string;
}

export const buildMovieParams = (obj: Movie = {}): Movie => {
  return {
    Title: obj.Title || name.title(),
    Released: obj.Released || date.past(),
    Genre: obj.Genre || name.title(),
    Director: obj.Director || name.title(),
  };
};
