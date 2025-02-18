enum ResponseCode {

  // Http status = 200
  SUCCESS = "SU", // public static final 지워도됨

  // Http status 400
  VALIDATION_FAILED = "VF",
  DUPLICATE_NICK = "DN",
  NOT_EXISTED_USER = "NU",
  NOT_EXISTED_BOARD = "NB",

  // Http status 401
  SIGN_IN_FAIL = "LF",
  AUTHORIZATION_FAIL = "AF",

  // Http status 403
  NO_PERMISSION = "NP",

  // Http status 500
  DATABASE_ERROR = "DBE",
}

export default ResponseCode;