const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  refreshToken: {
    type: String
  },
  password: {
    type: String,
    minLength: 8
  },
  date: {
    type: Date,
    default: Date.now()
  }
})
//TODO come back and check for token OR password before creation
//TODO not saving a refresh token right now...

const User = mongoose.model('User', userSchema)

module.exports = User

