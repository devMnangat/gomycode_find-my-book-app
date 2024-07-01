

import bcrypt from "bcryptjs";

export function pwdHasher(pwd: string) {
  // Generate a salt
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(pwd, saltRounds);
  return hashedPassword;
}
export function pwdConfirm(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
  // Log the result to the console
}
