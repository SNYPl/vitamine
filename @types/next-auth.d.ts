import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null | undefined;
      email: string | null | undefined;
      image?: string | null | undefined;
      wishlist: [string] | null | undefined | any;
    } & DefaultSession["user"];
  }
}
