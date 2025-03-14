import Container from "layouts/Container"
import { Navigate, Route, Routes } from "react-router-dom"
// import boardRoutes from "./BoardsRoutes"
import {boardRoutes} from "./BoardsRoutes"
import {userRoutes} from "./UsersRoute"
import { BOARD_LIST_PATH, BOARD_PATH, MAIN_PATH } from "constant"
import Main from 'views/Main'

const RouterSetting = () => {
  // const [totalPathList, setTotalPathList] = useState<any[]>([])
  // const [boardPathList, setBoardPathList] = useState([])

  // const getPathList = async () => {
  //   const res = await getPathListApi()
  //   const pathList:{path: string, component: string}[] = res.data.pathList.map((item: any) => ({
  //     path: item.path,
  //     component: item.component
  //   }))

  //   setTotalPathList(pathList)
  // }

  // useEffect(() => {
  //   setBoardPathList(boardRoutes(totalPathList))
  // }, [totalPathList])

  return (
    <Routes>
      <Route path={MAIN_PATH()} element={<Main />}></Route>
      <Route path={BOARD_PATH()} element={<Navigate to={`${BOARD_PATH()}/${BOARD_LIST_PATH()}`} />}></Route>
      
      <Route element={<Container />}>
        {userRoutes.map(({path, element}, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* {boardPathList?.map(({path, element}, index) => (
          <Route key={index} path={path} element={element} />
        ))} */}
        {boardRoutes?.map(({path, element}, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  )
}

export default RouterSetting