"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validator_1 = __importDefault(require("validator"));
var router = express_1.default.Router();
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var User = require('./SUser');
var UserOTPVerification = require('./SUserOTPVerification');
var OOPUser_1 = __importDefault(require("./OOPUser"));
var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: 'devtestforapi101@outlook.com',
        pass: '123456789devtestforapi',
    },
});
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
router.post('/verifyOTP', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userID, otp, UserOTPVerificationRecords, expiresAt, hashedOTP, validOTP, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body, userID = _a.userID, otp = _a.otp;
                userID = userID.trim();
                otp = otp.trim();
                if (validator_1.default.isEmpty(userID) || validator_1.default.isEmpty(otp)) {
                    throw Error('Empty info verifyOTP');
                }
                return [4 /*yield*/, UserOTPVerification.find({
                        userID: userID,
                    })];
            case 1:
                UserOTPVerificationRecords = _b.sent();
                if (!(UserOTPVerificationRecords.length <= 0)) return [3 /*break*/, 2];
                throw new Error('UserID not send otp yet');
            case 2:
                expiresAt = UserOTPVerificationRecords[0].expiresAt;
                hashedOTP = UserOTPVerificationRecords[0].otp;
                if (!(expiresAt < Date.now())) return [3 /*break*/, 4];
                return [4 /*yield*/, UserOTPVerification.deleteMany({ userID: userID })];
            case 3:
                _b.sent();
                throw new Error('Code has epired. Please request agin.');
            case 4: return [4 /*yield*/, bcrypt.compare(otp, hashedOTP)];
            case 5:
                validOTP = _b.sent();
                if (!!validOTP) return [3 /*break*/, 6];
                throw new Error('Invalid code passed. Check agin');
            case 6: return [4 /*yield*/, User.updateOne({ _id: userID }, { verified: true })];
            case 7:
                _b.sent();
                return [4 /*yield*/, UserOTPVerification.deleteMany({ userID: userID })];
            case 8:
                _b.sent();
                res.json({
                    status: 'VERIFIED',
                    message: 'User email verified successfully',
                });
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                res.json({
                    status: 'FAILED',
                    message: error_1.message,
                });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
router.post('/resendOTPVerificationCode', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userID, email, useroop, DataObject, findUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, userID = _a.userID, email = _a.email;
                userID = userID.trim();
                email = email.trim();
                if (validator_1.default.isEmpty(userID) || validator_1.default.isEmpty(email)) {
                    throw Error('Empty info resendOTPVerificationCode');
                }
                if (!validator_1.default.isEmail(email)) {
                    throw Error('Not Email ');
                }
                useroop = new OOPUser_1.default(userID, email);
                DataObject = useroop.getDataObject();
                return [4 /*yield*/, User.findById(userID)];
            case 1:
                findUser = _b.sent();
                if (!(findUser.length <= 0)) return [3 /*break*/, 2];
                throw new Error(" userID doesn't exit");
            case 2: return [4 /*yield*/, UserOTPVerification.deleteMany({ userID: userID })];
            case 3:
                _b.sent();
                sendVerificationEmail(DataObject, res);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                res.json({
                    status: 'FAILED',
                    message: error_2.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
var sendVerificationEmail = function (DataObject, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, userID, otp, mailOptions, saltRounds, hashedOTP, newOTPVerification, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                email = DataObject.email;
                userID = DataObject.userID;
                otp = "".concat(Math.floor(1000 + Math.random() * 9000));
                mailOptions = {
                    from: 'devtestforapi101@outlook.com',
                    to: email,
                    subject: 'Verify Your Email',
                    html: "<p>Enter <b>".concat(otp, "</b> in the app to vertify your email</p>\n          <p>This code <b>Expires in 10 min</b>.</p>"),
                };
                saltRounds = 10;
                return [4 /*yield*/, bcrypt.hash(otp, saltRounds)];
            case 1:
                hashedOTP = _a.sent();
                return [4 /*yield*/, new UserOTPVerification({
                        userID: userID,
                        otp: hashedOTP,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 600000,
                    })];
            case 2:
                newOTPVerification = _a.sent();
                return [4 /*yield*/, newOTPVerification.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 4:
                _a.sent();
                res.json({
                    status: 'PENDING',
                    message: 'Verification otp email sent',
                    data: {
                        userID: userID,
                        email: email,
                    },
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.json({
                    status: 'FAILED',
                    message: error_3.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
router.post('/sendverifyOTP', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userID, email, useroop, DataObject, findUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, userID = _a.userID, email = _a.email;
                userID = userID.trim();
                email = email.trim();
                if (validator_1.default.isEmpty(userID) || validator_1.default.isEmpty(email)) {
                    throw Error('Empty info sendverifyOTP');
                }
                if (!validator_1.default.isEmail(email)) {
                    throw Error('Not Email ');
                }
                useroop = new OOPUser_1.default(userID, email);
                DataObject = useroop.getDataObject();
                return [4 /*yield*/, User.findById(userID)];
            case 1:
                findUser = _b.sent();
                if (!(findUser.length <= 0)) return [3 /*break*/, 2];
                throw new Error(" userID doesn't exit");
            case 2: return [4 /*yield*/, UserOTPVerification.deleteMany({ userID: userID })];
            case 3:
                _b.sent();
                sendVerificationEmail(DataObject, res);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                res.json({
                    status: 'FAILED',
                    message: error_4.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
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
