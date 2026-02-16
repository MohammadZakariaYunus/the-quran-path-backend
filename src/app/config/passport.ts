import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { envVars } from "./env.js";
import { User } from "../modules/user/user.model.js";
import { Role, type IUser } from "../modules/user/user.interface.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const isUserExist = await User.findOne({
          email: email,
        }).select("+password");

        if (!isUserExist) {
          return done(null, false, { message: "User Does not exist" });
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          isUserExist.password as string,
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password Does not match" });
        }

        return done(null, isUserExist);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      callbackURL: envVars.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false, { message: "No Email found" });
        }

        let user = await User.findOne({ email });

        if (!user) {
          const userData: Partial<IUser> = {
            email,
            name: profile.displayName,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          };

          if (profile.photos && profile.photos[0]?.value) {
            userData.picture = profile.photos[0].value;
          }

          user = await User.create(userData);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
