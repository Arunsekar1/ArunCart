const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { type } = require('os');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  email:{
    type: String,
    required: [true, 'please enter email'],
    unique: true,
    validate: [validator.isEmail, 'please enter a valid email address']
  },
  password:{
    type: String,
    required: [true, 'please enter password'],
    minlength: [6, 'password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String
  },
  cloudinaryAvatar: {
    type:String
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
    this.password = await bcrypt.hash(this.password, 10);
  })

  userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    });
  }

  userSchema.methods.isValidPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }

  userSchema.methods.getResetToken = function() {
    // Generate a token for password reset
    const token = crypto.randomBytes(20).toString('hex');
    // Generate a Hash and Set to resetPassword Token
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    // Set the expire time for the token
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    return token; // return the plain token
  }

let schema = mongoose.model('User', userSchema);
module.exports = schema;