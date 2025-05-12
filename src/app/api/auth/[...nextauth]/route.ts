import NextAuth, { AuthOptions, Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions:AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { 
      token: JWT; 
      user?: User; 
      account?: Account | null 
    }) {
      if (user && account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
    async signIn({ user, profile, }: { user: User; profile?: any; }) {
      try {
        await dbConnect();
        let currUser = await UserModel.findOne({ email: user.email });
        if (!currUser && profile) {
          currUser = await UserModel.create({
            name: profile?.name,
            email: profile?.email,
            profilePicture: profile?.picture,
            isVerified: profile?.email_verified ? true : false
          });
        }
        user.id = currUser!._id.toString();
        return true;
      } catch (error) {
        console.log("Error in signIn callback", error);
        return false;
      }
    }
  },
  session: {
    strategy: 'jwt',
    maxAge:  7* 24 * 60 * 60,  // 15 days session expiration
  },
  pages: {
    signIn: "/user-auth",  // Custom sign-in page
  }
}

const handle =  NextAuth(authOptions);
export { handle as GET, handle as POST };