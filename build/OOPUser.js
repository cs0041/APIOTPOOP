"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OOPUser = /** @class */ (function () {
    function OOPUser(userID, email, otp) {
        this.userID = userID || '';
        this.email = email || '';
        this.otp = otp || '';
    }
    OOPUser.prototype.getDataObject = function () {
        return {
            userID: this.userID,
            email: this.email,
            otp: this.otp,
        };
    };
    return OOPUser;
}());
exports.default = OOPUser;
