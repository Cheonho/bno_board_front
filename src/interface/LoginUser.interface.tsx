export default interface UserModel {
    id: number;
    userId: string;
    userName: string;
    userPw: string;
    salt: string;
    address: string;
    role: string;
}
