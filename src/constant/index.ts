// PATH
export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';

// User
export const USER_PATH = (userId: string) => `/user/${userId}`;
export const LOGIN_PATH = () => `/login`;
export const JOIN_PATH = () => `/join`;
export const FIND_ID_PW_PATH = () => `/findIdPw`;
export const MY_PAGE_PATH = () => `/mypage`;
export const NICKNAME_CORRECTION = () => `/nicknamecorrection`
export const PASSWORD_CORRECTION = () => `/passwordcorrection`
export const ADDRESS_CORRECTION =() => `/addresscorrection`
export const OTP_ACTIVATE_PATH = () => `/otp/activate`;
export const OTP_VERIFY_PATH = () => `/otp/verify`;

// Board
export const BOARD_PATH = () => '/board';
export const BOARD_DETAIL_PATH = (boardNum: string | number) => `detail/${boardNum}`;
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_LIST_PATH = () => 'list';
export const BOARD_UPDATE_PATH = (boardNum: string | number) => `update/${boardNum}`;
