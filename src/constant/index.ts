// PATH
export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const USER_PATH = (userId: string) => `/user/${userId}`;
export const BOARD_PATH = () => '/board';
export const BOARD_DETAIL_PATH = (boardNum: string | number) => `detail/${boardNum}`;
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = (boardNum: string | number) => `update/${boardNum}`;
