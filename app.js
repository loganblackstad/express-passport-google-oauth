require('dotenv').config()

// const express = require('express'),
//     app = express(),

const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


///auth(passport);
///app.use(passport.initialize());


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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
