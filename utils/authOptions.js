// Import authentication providers
import CredentialsProvider from "next-auth/providers/credentials";



import User from "@/models/User";
import Kyc from "@/models/Kyc";


import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user?.password) {
          throw new Error("Please login via the method used to sign up");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),

   
  ],

  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      const { email } = user;

      let dbUser = await User.findOne({ email });

      if (!dbUser) {
        await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }

      return true;
    },

  
    async jwt({ token }) {
      await dbConnect();

      const userByEmail = await User.findOne({ email: token.email });

      if (userByEmail) {
        userByEmail.password = undefined;

       
        const kyc = await Kyc.findOne({
         user_id: userByEmail._id,
        }).select("status");

        token.user = {
          ...userByEmail.toObject(),
        kyc_verification_status: kyc?.status ?? null, // ✅ ADDED
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token.user,
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};