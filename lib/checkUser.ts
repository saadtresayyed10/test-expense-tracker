import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  console.log(user);

  if (!user) return null;

  const loggedInUser = await db.user.findUnique({
    where: {
      clerkuserId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  const newUser = await db.user.create({
    data: {
      clerkuserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
