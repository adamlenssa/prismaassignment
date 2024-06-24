import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const ratings = await prisma.starRating.groupBy({
    by: ["userId"],
    _sum: { score: true },
    _count: { score: true },
  });
  const averageRating: { userId: number; average: number }[] = [];
  ratings.map((rating) => {
    if (!rating._sum.score) {
      return;
    } else {
      averageRating.push({
        userId: rating.userId,
        average: rating._sum.score / rating._count.score,
      });
    }
    return rating;
  });
  return minBy(averageRating, (x) => x.average)?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const ratings = await prisma.starRating.groupBy({
    by: ["userId"],
    _sum: { score: true },
    _count: { score: true },
  });
  const averageRating: { userId: number; average: number }[] = [];
  ratings.map((rating) => {
    if (!rating._sum.score) {
      return;
    } else {
      averageRating.push({
        userId: rating.userId,
        average: rating._sum.score / rating._count.score,
      });
    }
    return rating;
  });
  return maxBy(averageRating, (x) => x.average)?.userId;
};
