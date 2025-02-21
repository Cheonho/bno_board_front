import { atom } from "recoil";

export const loginUserState = atom({
  key: "loginUserState",
  default: {
    email: "",
    userName: "",
    role: "",
  },
});