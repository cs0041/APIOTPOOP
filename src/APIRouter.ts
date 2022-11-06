import express, {  Request, Response } from 'express'
import validator from 'validator'
const router = express.Router()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


const User = require('./SUser')
const UserOTPVerification = require('./SUserOTPVerification')
import OOPUser from './OOPUser'


let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  auth: {
    user: 'devtestforapi101@outlook.com',
    pass: '123456789devtestforapi',
  },
})

// router.post('/singup', (req: Request, res: Response) => {
//   try {
//     let { account, contactus, email, pin, limitperday, address, phone } =
//       req.body
//     account = account.trim()
//     contactus = contactus.trim()
//     email = email.trim()
//     pin = pin.trim()
//     limitperday = limitperday.trim()
//     address = address.trim()
//     phone = phone.trim()

//     if (
//       account == '' ||
//       contactus == '' ||
//       email == '' ||
//       pin == '' ||
//       limitperday == '' ||
//       address == '' ||
//       phone == ''
//     ) {
//       throw Error('Not Data pls input')
//     } else {
//       User.find({ email }).then((result) => {
//         const newUser = new User({
//           account,
//           contactus,
//           email,
//           pin,
//           limitperday,
//           address,
//           phone,
//           verified: false,
//         })
//         newUser.save().then((result) => {
//           sendVerificationEmail(result, res)
//         })
//         // .catch((err) => {
//         //   console.err(err)
//         //   res.json({
//         //     status: 'FAILED',
//         //     message: 'Error while newUser save account',
//         //   })
//         // })
//       })
//     }
//   } catch (error) {
//     res.json({
//       status: 'FAILED',
//       message: error.message,
//     })
//   }
// })



router.post('/verifyOTP', async (req: Request, res: Response) => {
  try {
    let { userID, otp } = req.body
    userID = userID.trim()
    otp = otp.trim()
    if (validator.isEmpty(userID) || validator.isEmpty(otp)) {
      throw Error('Empty info verifyOTP')
    }
    const UserOTPVerificationRecords = await UserOTPVerification.find({
      userID,
    })
    if (UserOTPVerificationRecords.length <= 0) {
      throw new Error('UserID not send otp yet')
    } else {
      const { expiresAt } = UserOTPVerificationRecords[0]
      const hashedOTP = UserOTPVerificationRecords[0].otp

      if (expiresAt < Date.now()) {
        await UserOTPVerification.deleteMany({ userID })
        throw new Error('Code has epired. Please request agin.')
      } else {
        const validOTP = await bcrypt.compare(otp, hashedOTP)

        if (!validOTP) {
          throw new Error('Invalid code passed. Check agin')
        } else {
          await User.updateOne({ _id: userID }, { verified: true })
          await UserOTPVerification.deleteMany({ userID })
          res.json({
            status: 'VERIFIED',
            message: 'User email verified successfully',
          })
        }
      }
    }
  } catch (error: any) {
    res.json({
      status: 'FAILED',
      message: error.message,
    })
  }
})

router.post('/resendOTPVerificationCode', async (req, res) => {
  try {
    let { userID, email } = req.body
    userID = userID.trim()
    email = email.trim()
    if (validator.isEmpty(userID) || validator.isEmpty(email)) {
      throw Error('Empty info resendOTPVerificationCode')
    }
    if (!validator.isEmail(email)) {
      throw Error('Not Email ')
    }
    let useroop = new OOPUser(userID, email)
    let DataObject = useroop.getDataObject()
    const findUser = await User.findById(userID)
    if (findUser.length <= 0) {
      throw new Error(" userID doesn't exit")
    } else {
      await UserOTPVerification.deleteMany({ userID })
      sendVerificationEmail(DataObject, res)
    }
  } catch (error: any) {
    res.json({
      status: 'FAILED',
      message: error.message,
    })
  }
})

const sendVerificationEmail = async (DataObject: any, res: Response) => {
  try {
    let email = DataObject.email
    let userID = DataObject.userID
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const mailOptions = {
      from: 'devtestforapi101@outlook.com',
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter <b>${otp}</b> in the app to vertify your email</p>
          <p>This code <b>Expires in 10 min</b>.</p>`,
    }

    const saltRounds = 10

    const hashedOTP = await bcrypt.hash(otp, saltRounds)
    const newOTPVerification = await new UserOTPVerification({
      userID: userID,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    })

    await newOTPVerification.save()
    await transporter.sendMail(mailOptions)
    res.json({
      status: 'PENDING',
      message: 'Verification otp email sent',
      data: {
        userID: userID,
        email,
      },
    })
  } catch (error: any) {
    res.json({
      status: 'FAILED',
      message: error.message,
    })
  }
}

router.post('/sendverifyOTP', async (req, res) => {
  try {
    let { userID, email } = req.body
    userID = userID.trim()
    email = email.trim()
     if (validator.isEmpty(userID) || validator.isEmpty(email)) {
       throw Error('Empty info sendverifyOTP')
     }
     if (!validator.isEmail(email)) {
       throw Error('Not Email ')
     }
    let useroop = new OOPUser(userID, email)
    let DataObject = useroop.getDataObject()
      const findUser = await User.findById(userID)
      if (findUser.length <= 0) {
        throw new Error(" userID doesn't exit")
      } else {
        await UserOTPVerification.deleteMany({ userID })
        sendVerificationEmail(DataObject, res)
      }
    
  } catch (error:any) {
    res.json({
      status: 'FAILED',
      message: error.message,
    })
  }
})


module.exports = router

//http://localhost:5000/user/verifyOTP
// {
//     "userID":"634ef2258c984f3e0bce4fb6",
//     "otp":"1234"
// }

//http://localhost:5000/user/sendverifyOTP
// {
//     "userID":"634ef2258c984f3e0bce4fb6",
//     "email":"sometimewanna01@hotmail.com"
// }

//http://localhost:5000/user/resendOTPVerificationCode
// {
//     "userID":"634ef2258c984f3e0bce4fb6",
//     "email":"sometimewanna01@hotmail.com"
// }

//http://localhost:5000/user/singup
// {
//      "account":"9691235010",
//          "contactus":"KMTIL",
//          "email":"sometimewanna01@hotmail.com",
//          "pin":"4124",
//          "limitperday":"100000",
//          "address":"KMTIL  25/5 636",
//          "phone":"0581251514"
// }
