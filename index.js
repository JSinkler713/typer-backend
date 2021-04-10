require('dotenv').config()
const express = require('express')
const passport = require('passport')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;


app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize())
require('./config/passport-google');
require('./config/passport-jwt');

/* GET home page. */
app.get("/", function(req, res, next) {
	res.json({ title: "Express" });
});

/* GET Google Authentication API. */
//TODO not sending refreshToken, even on first sign up
//TODO try again with force or extra options like offline
app.get("/auth/google",	passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), function(req, res) {
    console.log('this is the callback')
    console.log(req.user)
    const payload = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
    jwt.sign(payload, JWT_SECRET, { expiresIn: 120 }, async (err, token) => {
      if (err) {
        console.log('sign error')
        res.status(400).json({ message: 'Session had ended' })
      }
      console.log('in the jwt sign')
      //this errors?
      const legit = await jwt.verify(token, JWT_SECRET, { expiresIn: 60 })
      console.log('========> legit')
      console.log(legit)
      // res.json({ success: true, token: `Bearer ${token}`, userData: legit })
    //this comes back from the google strategy
    // we want to make a jwt token and pass through;
    console.log(token)
    // res.json({ incallback: "I am ffrom the callback" })
    res.redirect("http://localhost:3000?token=" + token);
    })
  }
);

app.get("/profile", passport.authenticate("jwt", { session: false }), (req, res)=> {
  console.log('in the profile')
  console.log('req.user')
  console.log(req.user)
  res.json(req.user)
})

app.listen(8000, console.log('listening on port 8000'))

