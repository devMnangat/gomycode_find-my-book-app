
import { UserModel } from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { pwdConfirm } from "@/utils/password";


export const userService = {
  authenticate,
};


async function authenticate(login: string, password: string) {
  if(!login || !password) return null
  await dbConnect();
  const user = await UserModel.findOne({
    $or: [{ email: login }, { username: login }]
  });

  if (!user || (user.password !== password || !pwdConfirm(password, user.password))) return null;

  return user;
}

