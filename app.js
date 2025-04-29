const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/postApp');
app.use(session({ secret: 'notagoodsecret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

app.use('/posts', postRoutes);
app.use('/', authRoutes);

app.listen(3000, () => console.log("Server started at http://localhost:3000"));