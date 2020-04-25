const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  data: {
    age: Number,
    gender: String,
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});

const model = mongoose.model('User', userSchema);

module.exports = model;
