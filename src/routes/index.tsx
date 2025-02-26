import Container from "layouts/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import {boardRoutes} from "./BoardsRoutes"
import {userRoutes} from "./UsersRoute"
import { BOARD_LIST_PATH, BOARD_PATH, MAIN_PATH } from "constant"

const RouterSetting = () => {
  return (
    <Routes>
      <Route path={MAIN_PATH()} element={<Navigate to={`${BOARD_PATH()}/${BOARD_LIST_PATH()}`} />}></Route>
      <Route path={BOARD_PATH()} element={<Navigate to={`${BOARD_PATH()}/${BOARD_LIST_PATH()}`} />}></Route>
      
      <Route element={<Container />}>
        {userRoutes.map(({path, element}) => (
          <Route path={path} element={element} />
        ))}
      </Route>

      <Route element={<Container />}>
        {boardRoutes.map(({path, element}) => (
          <Route path={path} element={element} />
        ))}
      </Route>
    </Routes>
  )
}

export default RouterSetting