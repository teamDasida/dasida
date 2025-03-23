import { DataStructure } from "../type";

export const fetchHomeData  = async (): Promise<DataStructure> => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/home`, {
      credentials: 'include', // 인증 정보를 함께 보냄
    });
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    return response.json();
  };
  