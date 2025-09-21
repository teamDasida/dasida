import styled, { css, keyframes } from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const IntroContainer = styled.div`
    /* 화면 전체 중앙 정렬 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 71px;
    height: 100vh;
    box-sizing: border-box;

    & > div {
        /* Display/D1/B */
        font-size: 36px;
        font-weight: 700;
        line-height: 46.8px;

        span {
            display: block;
            /* Heading/H1/R */
            margin-top: 25.13px;
            font-size: 26px;
            font-weight: 400;
            line-height: 33.8px;
        }
    }

    /* IntroContainer의 after에만 스타일 적용 */
    &::after {
        content: '';
        display: block;
        width: 340px;
        height: 571px;
        background: 50% 50% url('./img/main.png') no-repeat;
        margin-right: 102px;
        background-size: contain;
    }
`;

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
    z-index: 1000;
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

export const KakaoBtn = styled.button<{ $mb?: boolean }>`
    border-radius: var(--Radius-1, 4px);
    background: #f8e049;
    width: 100%;
    height: 52px;
    ${center}
    color: var(--black, #121212);
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

    ${({ $mb }) =>
        $mb &&
        css`
            width: 90%;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            bottom: 80px;
        `}
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
`;

export const MbCharacterBox = styled.div`
    width: 100%;
    min-height: inherit;
    ${center};
    flex-direction: column;
    & > img {
        margin-bottom: 24px;
    }
    & > p {
        width: 100%;
        color: #000;
        text-align: center;

        /* Paragraph/P2/B */
        font-size: 16px;
        font-weight: 700;
        line-height: 24px; /* 24px */
        span {
            display: block;
            color: #000;

            /* Paragraph/P2/R */
            font-size: 16px;
            font-weight: 400;
        }
    }
`;

export const InstallBtn = styled.button`
    border-radius: var(--Radius-1, 4px);
    background: #89AE86;
    width: 100%;
    height: 48px;
    ${center}
    color: var(--black, #121212);
    font-size: 16px;

    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 80px;
    &::before {
        content: '';
        display: block;
        margin-right: 8px;
        width: 14px;
        height: 18px;
        background: 50% 50% url('./img/arrow-down.svg') no-repeat;
        background-size: contain;
    }
`;
