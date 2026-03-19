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

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'Priyanshi',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'
    ? `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : process.env.BACKEND_URL}/auth/google/callback`
    : 'http://localhost:5000/auth/google/callback'
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
  .then(() => console.log('MongoDB Connected', mongoose.connection.name))
  .catch(err => console.log('MongoDB connection error:', err));

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on Port ${process.env.PORT || 5000}`);
  });
}

module.exports = app;
