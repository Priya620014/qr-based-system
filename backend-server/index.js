const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

const tableRoutes = require('./routes/Table_Routes');
const menuRoutes = require('./routes/Menu_Route');
const orderRoutes = require('./routes/Order_Route');
const qrRoute = require('./routes/QrRoute');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/razorpay');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.use(session({
  secret:  'Priyanshi', 
  saveUninitialized: false,
  cookie: { secure: false } 
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});


app.use('/api/tables', tableRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/qr', qrRoute);
app.use('/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected',mongoose.connection.name))
  .catch(err => console.log('MongoDB connection error:', err));


app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
