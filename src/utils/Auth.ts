import { apitokendata } from "api/Mypage/nicknameindex";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await apitokendata(token);
    return response.data.apitokendataDto;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    return null;
  }
};
