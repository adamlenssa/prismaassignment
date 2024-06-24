import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const rating = await prisma.starRating.findMany();
  const filtered = rating.filter((rating) => rating.userId == userId);
  const sumScore = filtered.reduce((acc, currentRating) => {
    return acc + currentRating.score;
  }, 0);
  return sumScore / filtered.length;
};
