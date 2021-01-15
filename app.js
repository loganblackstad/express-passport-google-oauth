require('dotenv').config()

// const express = require('express'),
//     app = express(),

const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


///auth(passport);
///app.use(passport.initialize());


// set up view engine
app.set('view engine', 'ejs');

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to mongodb');
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tcampbell:<password>@cluster0.1kcil.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



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
