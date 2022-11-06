import mongoose,{ Schema, model } from 'mongoose'
const UserSchema = new Schema({
  account: Number,
  contactus: String,
  email: String,
  pin: String,
  limitperday: Number,
  address: String,
  phone: String,
  verified: Boolean,
})

const User  =mongoose.model('User',UserSchema);

module.exports = User;