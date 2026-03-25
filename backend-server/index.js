// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();

// const app = express();

// const tableRoutes = require('./routes/Table_Routes');
// const menuRoutes = require('./routes/Menu_Route');
// const orderRoutes = require('./routes/Order_Route');
// const qrRoute = require('./routes/QrRoute');
// const authRoutes = require('./routes/auth');
// const paymentRoutes = require('./routes/razorpay');

// const allowedOrigins = [
//   'http://localhost:3000',
//   process.env.FRONTEND_URL
// ].filter(Boolean);

// app.use(cors({ origin: allowedOrigins, credentials: true }));

// app.use(express.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'Priyanshi',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
//   }
// }));


// app.use(passport.initialize());
// app.use(passport.session());


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.NODE_ENV === 'production'
//     ? `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : process.env.BACKEND_URL}/auth/google/callback`
//     : 'http://localhost:5000/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// }));


// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });


// app.use('/api/tables', tableRoutes);
// app.use('/api/menus', menuRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/qr', qrRoute);
// app.use('/auth', authRoutes);
// app.use('/api/payment', paymentRoutes);

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected', mongoose.connection.name))
//   .catch(err => console.log('MongoDB connection error:', err));

// if (process.env.NODE_ENV !== 'production') {
//   app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server Running on Port ${process.env.PORT || 5000}`);
//   });
// }

// module.exports = app;

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

// CHANGE 1: Allow all origins or add your specific Vercel production URL
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://qrbasedsystem-ktds5fv6d-priyanshiraj347-8387s-projects.vercel.app/' // Add your actual live URL here
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies/headers if needed
}));

app.use(express.json());

// CHANGE 2: Trust Proxy (Required for Vercel/Heroku cookies)
app.set('trust proxy', 1); 

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

// Passport Strategy remains same...
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'
    ? `https://qrbasedsystem-priyanshiraj347-8387s-projects.vercel.app/auth/google/callback`
    : 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

app.use('/api/tables', tableRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/qr', qrRoute);
app.use('/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// CHANGE 3: Optimize MongoDB connection for Serverless
let cachedDb = null;
const connectDB = async () => {
  if (cachedDb) return cachedDb;
  const db = await mongoose.connect(process.env.MONGO_URI);
  cachedDb = db;
  return db;
};

// Call connection
connectDB().then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on Port ${process.env.PORT || 5000}`);
  });
}

module.exports = app;