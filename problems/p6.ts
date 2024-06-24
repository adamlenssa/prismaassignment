import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const movies = await prisma.movie.findMany();
  const rating = await prisma.starRating.findMany();
  const moviesWatched = rating.reduce((acc: number[], currentRating) => {
    if (currentRating.userId == userId) {
      return [...acc, currentRating.movieId];
    }
    return acc;
  }, []);
  return movies.filter((movie) => moviesWatched.includes(movie.id));
};
