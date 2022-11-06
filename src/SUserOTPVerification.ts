import mongoose, { Schema, model } from 'mongoose'

const UserOTPVerificationSchema = new Schema({
  userID: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
})

const UserOTPVerification = mongoose.model(
  'UserOTPVerification',
  UserOTPVerificationSchema
)
module.exports = UserOTPVerification
