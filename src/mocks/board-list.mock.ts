import { BoardListType } from "types/interface";

const boardListMock: BoardListType[] = [
  {
    boardNum: 1,
    title: "test",
    content: "content",
    writerId: "11",
    writerNickname: "test1",
    createAt: new Date(),
    updateAt: new Date(),
    viewCount: 0,
    commentCount: 0,
  },
  {
    boardNum: 2,
    title: "test123",
    writerId: "11",
    content: "conten123t",
    writerNickname: "tes123t1",
    createAt: new Date(),
    updateAt: new Date(),
    viewCount: 4,
    commentCount: 5,
  },
  {
    boardNum: 3,
    title: "tes4444t",
    writerId: "11",
    content: "content444",
    writerNickname: "test51",
    createAt: new Date(),
    updateAt: new Date(),
    viewCount: 11,
    commentCount: 15,
  }
];

export default boardListMock;