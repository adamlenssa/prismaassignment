import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany();
  const starRating = await prisma.starRating.findMany({});
  const grouped = groupBy(starRating, (x) => x.movieId);
  const years: string[] = [];
  for (const key in grouped) {
    const avg = sumBy(grouped[key], (x) => x.score) / grouped[key].length;
    if (avg > n) {
      years.push(key);
    }
  }
  return movies.reduce(
    (
      acc: {
        id: number;
        title: string;
        releaseYear: number;
        parentalRating: string;
      }[],
      currentMovie
    ) => {
      if (years.includes(currentMovie.id.toString())) {
        return [...acc, currentMovie];
      }
      return acc;
    },
    []
  );
};
