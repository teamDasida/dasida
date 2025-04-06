import styled, { keyframes } from 'styled-components';
import { center } from '../../style/GlobalStyle';

// 공 튕기는 애니메이션 keyframes
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// 전체 로딩 컨테이너
export const LoadingContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg, #faf9f6);
  ${center};
  flex-direction:column;
`;

// 공 모양과 애니메이션 스타일
export const Ball = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: var(--primary-color, #567C53); */
  border:3px solid #000;
  animation: ${bounce} 2s infinite;
`;
