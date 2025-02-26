import { BOARD_DETAIL_PATH, BOARD_LIST_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from "constant";
import BoardList from 'views/Board/List';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';

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