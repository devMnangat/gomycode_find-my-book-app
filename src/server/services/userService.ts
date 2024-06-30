import UserModel from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";


export const userService = {
  authenticate,
};

async function authenticate(username: string, password: string) {
  await dbConnect();
  const user = await UserModel.findOne({
    email: username,
    password,
  });
  if (!user) return null;
//   console.log({ loggedInUser: user });

  return user; //(4)
}
