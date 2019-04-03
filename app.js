const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'keyboard cat'
}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.mongodbConnect);

const laconnection = mongoose.model('mainData', {}, 'mainData');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    if (JSON.parse(process.env.authUsers).includes(profile.emails[0].value)) {
      done(null, profile);
    } else {
      done(null, false, { message: "User not a registered admin."});
    }
  }
));
app.get('/auth/google',
  passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]}));


app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login', {error: req.flash('error')[0]});
});

app.listen(process.env.PORT, () => console.log('App Running!'));
