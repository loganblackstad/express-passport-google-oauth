
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/*
module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: "489821279032-k3puvqnf5e4v6612jvgi0kdsp9skgdhr.apps.googleusercontent.com",
        clientSecret: process.env.CLIENT_SECRET, // points to the .env file
        callbackURL: '/auth/google/callback'
    }, (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};
*/

passport.use(new GoogleStrategy({
    clientID: "489821279032-k3puvqnf5e4v6612jvgi0kdsp9skgdhr.apps.googleusercontent.com",
    clientSecret: process.env.CLIENT_SECRET, // points to the .env file
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // passport callback
    console.log(profile);
})
);