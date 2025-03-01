import styled, { keyframes } from 'styled-components';
import { center } from './../../style/GlobalStyle';

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const BackGround = styled.div`
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    ${center}
`;

export const LoginBox = styled.div`
    position: relative;
    width: 420px;
    height: 182px;
    border-radius: var(--Radius-4, 16px);
    background: var(--white, #fff);
    box-sizing: border-box;
    padding: 24px;
    /* Global Tokens/E3 */
    box-shadow: 0px 16px 40px -8px rgba(95, 95, 88, 0.16);
    animation: ${fadeInUp} 0.3s ease;

    & > img {
        padding-top: 32px;
        margin-bottom: 16px;
    }
`;
export const LoginBtn = styled.button`
    border-radius: var(--Radius-1, 4px);
    background: #f8e049;
    width: 100%;
    height: 52px;
    ${center}
    color: var(--black, #121212);

    /* Paragraph/P2/R */
    font-size: 16px;
    &::before {
        content: '';
        display: block;
        margin-right: 8px;
        width: 32px;
        height: 32px;
        background: 50% 50% url('./img/kakao.svg') no-repeat;
        background-size: contain;
    }
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
`;
