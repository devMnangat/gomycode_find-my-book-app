
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "./services/userService";
import { UserModel } from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, profile }) { 
      if(account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) { 
      session.user = user || token
      // console.log({token, session, user})
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: '/login', //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        login: { label: "Email or Username", type: "text", placeholder: "Email or Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { login, password } = credentials as {
          login: string
          password: string
        };
        let user = await userService.authenticate(login, password);
    // console.log({login, password,flag:user})
        return user
      }
    })
    
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)