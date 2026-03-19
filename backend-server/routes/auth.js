const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));


router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/dashboard'
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/redirect-after-login');
  }
);



router.get('/current_user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});


router.get('/logout/:id', (req, res) => {
  const {id} = req.params
  req.logout(() => {
    res.redirect(`http://localhost:3000/table/${id}`); 
  });
});

module.exports = router;
