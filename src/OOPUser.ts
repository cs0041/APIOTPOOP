class OOPUser {
  public userID: String
  public email: String
  public otp: String

  constructor(userID?: String, email?: String, otp?: String) {
    this.userID = userID || ''
    this.email = email || ''
    this.otp = otp || ''
  }


  getDataObject(): Object {
    return {
      userID: this.userID,
      email: this.email,
      otp: this.otp,
    }
  }
}

export default OOPUser
