require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')

// import user model
const { User } = require('../models')

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(options, (jwt_payload, done)=> {
  // Have a user that we find by id inside payload
  // check to see if user is in the database
  console.log('in the jwt strategy')
  console.log(jwt_payload)
  console.log(jwt_payload.id)
  User.findById(jwt_payload.id)
    .then(user=> {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch(error => {
      console.log('=====> error')
      console.log(error)
      console.log('in passport.js')
    })
}))

