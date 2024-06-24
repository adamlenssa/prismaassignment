import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deletedRating = await prisma.starRating.deleteMany({ where: {} });
  const deletedUsers = await prisma.user.deleteMany({
    where: { age: { lt: n } },
  });
};
