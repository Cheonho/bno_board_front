import { AUTH_PATH, FIND_ID_PW_PATH, JOIN_PATH, LOGIN_PATH, USER_PATH } from "constant";
import Login from "views/LoginBoard";
import Join from "components/Join";
import FindIdPw from "components/FindIdPw";
import Authentication from 'views/Authentication';
import User from 'views/User';


export const userRoutes: MenuRouter[] = [
  {
    path: `${LOGIN_PATH()}`,
    element: <Login />
  },
  {
    path: `${JOIN_PATH()}`,
    element: <Join />
  },
  {
    path: `${FIND_ID_PW_PATH()}`,
    element: <FindIdPw />
  },
  {
    path: `${AUTH_PATH()}`,
    element: <Authentication />
  },
  {
    path: `${USER_PATH(`:userId`)}`,
    element: <User />
  }
]