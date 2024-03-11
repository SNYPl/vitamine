import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connectDB from "@/lib/db";
import { redirect } from "next/navigation";
const bcrypt = require("bcrypt");

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findOne({
          $or: [
            { username: credentials?.username },
            { email: credentials?.username },
          ],
        });

        if (!user) {
          throw new Error("ელ.ფოსტა ან სახელი არასწორია");
        }

        const isSame = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isSame) {
          throw new Error("პაროლი არასწორია");
        }

        if (!user.isVerified) {
          throw new Error(
            "ანგარიში არ არის ვერიფიცებული, შეამოწმეთ ელ.ფოსტა ვერიფიკაციისთვის"
          );
          // redirect("/verify");
        }

        if (user) {
          return {
            id: user._id,
            name: user.username,
            email: user.email,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user, trigger }) {
      const wishlistArr = await User.findOne({ email: token.email });
      const wishlistArray = token.wishlist;
      console.log(wishlistArray);
      session.user = {
        name: token.name,
        email: token.email,
        wishlist: wishlistArray || wishlistArr.wishlist || null,
        image: wishlistArr.image || null,
      };

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        const wishlistArr = await User.findOne({ email: token.email });

        token = { ...token, wishlist: wishlistArr.wishlist };
        return token;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to a specific URL after successful login
      return baseUrl + "/";
    },
  },
};
