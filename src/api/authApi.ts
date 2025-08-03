// src/api/authApi.ts
import axios from 'axios';

export const checkSession = async () => {
  const res = await axios.get('/session-check');
  // res.status === 200 이면 성공, 아니면 throw 해서 React-Query가 error로 받도록
  if (res.status !== 200) throw new Error('Invalid session');
  return true;                   // 굳이 데이터가 필요 없으면 true만 반환
};
