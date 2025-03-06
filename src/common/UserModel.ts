export interface UserModel {
    id: number;
    email: string;
    userNickname: string;
    password: string;
    address: string;
    role: string;
}

export interface LoginModel {
    id: number;
    email: string;
    userNickname: string;
    role: string;
}

