require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../modules/users/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: "http://localhost:3001/google/callback",
      callbackURL:
        "https://apihotelsystemteamdinamita.herokuapp.com/google/callback",
      passReqToCallback: true,
      usernameField: "email",
    },
    function (request, accessToken, refreshToken, profile, done) {
      const user = new User();
      const body = {
        name: profile.given_name,
        first_lastname: profile.family_name,
        email: profile.email,
        password: profile.id,
      };
      user.create(body).then((results) => {
        if (results.code == 201) {
          return done(null, profile); //New user
        } else if (results.code == 422) {
          //User already exists
          user
            .login({ email: profile.email, password: profile.id })
            .then((results) => {
              if (results.code == 200) {
                profile.token = results.message.token;
                return done(null, profile); //User found
              } else if (results.code == 403) {
                return done(null, results.message); //Wrong email or password
              }
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.

  done(null, user);
});

passport.deserializeUser((user, done) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  done(null, user);
});
