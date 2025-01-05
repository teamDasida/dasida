import styled from 'styled-components';

export const Container = styled.div`
  /* 화면 전체 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 화면 높이 맞춤 (100vh 등) */
  height: 100vh;
  background-color: #f9f9f9; 
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 8px;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  color: #666666;
`;

export const KakaoButton = styled.button`
  /* 카카오 공식 컬러 */
  background-color: #fee500;
  color: #3c1e1e;

  /* 버튼 스타일 */
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 14px 24px;
  cursor: pointer;

  /* 터치 영역 확보 */
  min-width: 240px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;