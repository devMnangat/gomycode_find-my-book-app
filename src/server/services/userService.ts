import UserModel from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { pwdConfirm } from "@/utils/password";


export const userService = {
  authenticate,
};

async function authenticate(username: string, password: string) {
  await dbConnect();
  const users = await UserModel.find({email: username})
  const user = users.find(usr => pwdConfirm(password, usr.password))

  if (!user) return null;
  // console.log({ loggedInUser: user });

  return user;
}
