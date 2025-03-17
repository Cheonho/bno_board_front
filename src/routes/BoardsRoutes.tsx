import { BOARD_DETAIL_PATH, BOARD_LIST_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from "constant";
import BoardList from 'views/Board/List';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';


// export default function boardRoutes(pathList: any) {

//   if (!pathList) {
//     return null;
//   }

//   const componentMap:{[key: string]: React.ComponentType} = {
//     BoardList,
//     BoardWrite,
//     BoardDetail,
//     BoardUpdate
//   }

//   const testMenu = pathList?.filter((item: any) => item.path.includes('board')).map((item: any) => {
//     return {path: item.path, element: componentMap[item.component]}
//   })

//   console.log("testMenu : ", testMenu)
//   return testMenu
// }

export const boardRoutes: MenuRouter[] = [
  {
    path: `${BOARD_PATH()}/${BOARD_LIST_PATH()}`,
    element: <BoardList />
  },
  {
    path: `${BOARD_PATH()}/${BOARD_WRITE_PATH()}`,
    element: <BoardWrite />
  },
  {
    path: `${BOARD_PATH()}/${BOARD_DETAIL_PATH(`:boardNum`)}`,
    element: <BoardDetail />
  },
  {
    path: `${BOARD_PATH()}/${BOARD_UPDATE_PATH(`:boardNum`)}`,
    element: <BoardUpdate />
  }
]