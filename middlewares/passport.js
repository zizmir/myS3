import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JsonWebTokenStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

passport.use(
  new LocalStrategy(
    { usernameField: 'nickname', passwordField: 'password' },
    async (nickname, password, done) => {
      try {
        const user = await User.findOne({ where: { nickname } });
        if (!user) {
          return done('invalid nickname');
        }
        if (!(await user.checkPassword(password))) {
          return done('wrong password');
        }
        done(false, user);
      } catch (err) {
        done(`${err.message}`);
      }
    },
  ),
);

passport.use(
  new JsonWebTokenStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENCRYPTION,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { uuid: jwtPayload.uuid } });

        if (user) {
          return done(null, user);
        }
        return done("User doesn't exist");
      } catch (err) {
        done(err);
      }
    },
  ),
);
