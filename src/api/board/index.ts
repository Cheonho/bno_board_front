import axios from "axios";
import { BoardListType, CommentListType } from "types/interface";

axios.defaults.baseURL = "http://localhost:8080/api/v1/board";


export const getBoard = async (id: number): Promise<BoardListType> => {
    const response = await axios.get(`/${id}`);
    return response.data;
};

export const getComments = async (id: number): Promise<CommentListType[]> => {
    const response = await axios.get(`/${id}/comment`);
    return response.data;
};

export const deleteBoard = async (id: number): Promise<void> => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;
    await axios.delete(`/${id}`);
    alert("게시글이 성공적으로 삭제되었습니다!");
};

