require('dotenv').config()

const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');
const path = require('path');
const authRoutes = require('./routes/auth-routes');

app.use(express.static(path.join(__dirname, 'public')));

auth(passport);
app.use(passport.initialize());


// set up view engine
app.set('view engine', 'ejs');


// set up routes
app.use('/auth', authRoutes);

//create home route
app.get('/home', (req, res) => {
    res.render('home');
})


// create middleware
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET_COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());

// set session cookie
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

// on logout, set session cookie equal to null
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.token);
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
