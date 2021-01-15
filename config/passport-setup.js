
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

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

passport.serializeUser((user,done)=>{
    done(null, user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: "489821279032-k3puvqnf5e4v6612jvgi0kdsp9skgdhr.apps.googleusercontent.com",
    clientSecret: process.env.CLIENT_SECRET, // points to the .env file
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // passport callback
    // console.log(profile);

    // check if user already exists in the db
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            // already have the user
            console.log('user is:', currentUser)
            done(null, currentUser)
        } else {
            // if not, create a new user in the db
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser)=>{
                console.log('new user created' + newUser);
                done(null, newUser)
            })

        }
    })
    
})
);