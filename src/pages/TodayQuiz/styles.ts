import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const QuizContainer = styled.div`
    /* 화면 전체 중앙 정렬 */
    margin: 157px 0 60px;
    @media (max-width: 768px) {
        margin: 23px 0 40px;
    }
`;

export const QuizList = styled.div<{ $answer?: 'unanswered' | 'correct' | 'incorrect' }>`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 24px 16px;
    border-radius: var(--Radius-4, 16px);
    background: ${({ $answer }) => {
        if ($answer === 'correct') return 'var(--Colors-Green-50, #D1FBD4)';
        if ($answer === 'incorrect') return 'var(--Colors-Red-50, #FEBDAF)';
        return 'var(--white, #fff)';
    }};
    box-shadow: 0px 2px 4px 0px rgba(26, 31, 31, 0.04);
`;

export const HintContainer = styled.div`
    position: absolute;
    z-index: 2;
    top: calc(100% + 34px);
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    width: 100%;
    border-radius: var(--Radius-3, 12px);
    border: 1px solid var(--Colors-Primary-300, #a6c2a4);
    background: var(--Colors-Secondary-100, #f5f5e6);
    box-shadow: 0px 16px 32px -12px rgba(95, 95, 88, 0.05);
    & > p {
        display: flex;
        align-items: center;
        color: var(--Colors-Primary-700, #476644);
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 700;
        &::before {
            content: '';
            display: block;
            width: 16.2px;
            height: 16.2px;
            background: 50% 50% url('/img/lightbulb.svg') no-repeat;
            background-size: contain;
            margin-right: 4px;
        }
        & > span {
            display: block;
            color: var(--Colors-Neutral-1000, #1a1f1f);

            /* Paragraph/P3/R */
            font-size: 14px;
            font-weight: 400;
            line-height: 21px; /* 21px */
        }
    }
`;

export const Passage = styled.div<{$length:number}>`
    /* Paragraph/P2/R */
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 24px */
    & > input {
        border-radius: var(--Radius-1, 4px);
        background: var(--Colors-blue-0, #dcf2fe);
        width: ${props=>props.$length ? `calc(${props.$length} * 25px)` : '50px'};
        height: 24px;
        box-sizing: border-box;
        line-height: 24px;
        padding: 0 10px;
    }
`;
export const PassageTitle = styled.p`
    display: block;
    margin: 8px 0 16px;
    text-align: right;

    color: var(--Colors-Neutral-700, #5a6868);

    font-size: 12px;
    font-weight: 500;
`;

export const HelpBtn = styled.button`
    color: var(--Colors-Primary-600, #567c53);

    font-size: 16px;
    font-weight: 500;
    ${center}
    width: 112px;
    height: 40px;
    margin-top: 44px;
    &::before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        margin-right: 4px;
        background: 50% 50% url('./img/circle-help.png') no-repeat;
        background-size: contain;
    }
`;

export const Knowledge = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
        background: var(--white, #fff);
        padding: 24px;
        height: 150px;
        margin-right: 24px;
        width: calc(33.3333% - 16px);
        margin-bottom: 16px;
        &:nth-child(3n) {
            margin-right: 0;
        }
        p {
            color: var(--Colors-Neutral-1000, #1a1f1f);
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 500;
        }

        span {
            display: block;
            overflow: hidden;
            color: var(--Colors-Neutral-700, #5a6868);
            text-overflow: ellipsis;
            /* white-space: nowrap; */

            /* Paragraph/P3/R */
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 21px */
            height: 65px;
        }
        &:last-child {
            margin-right: 0;
        }
        @media (max-width: 768px) {
            width: 100%;
            margin: 0;
            padding: 0px 8px;
            height: auto;
            &:after {
                content: '';
                display: block;
                width: 100%;
                height: 1px;
            }

            & > div {
                border-bottom: 1px solid var(--Colors-Neutral-200, #d0d5d5);

                padding: 20px 8px;
                & > p {
                    margin-bottom: 4px;
                }
                & > span {
                    height: auto;
                }
            }
        }
    }
`;

export const NoQuizContainer = styled.div`
    ${center};
    flex-direction: column;
    height: calc(100vh - 71px);
    @media (max-width: 768px) {
        height: calc(100vh - 76px);
        span {
        font-size: 16px;
        b {
            font-size: 14px;
            margin-top: 2px;

        }
    }

    }

    &::before {
        content: '';
        width: 150px;
        height: 96px;
        display: block;
        margin-bottom: 24px;
        background: 50% 50% url('/img/loading.png') no-repeat;
    }
    span {
        display: block;
        color: var(--Colors-Neutral-1000, #1a1f1f);
        text-align: center;

        /* Paragraph/P2/R */
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px; /* 21px */

        b {
            display: block;
            color: var(--Colors-Neutral-700, #5a6868);

            /* Paragraph/P3/R */
            font-size: 16px;
            font-weight: 400;
            line-height: 21px; /* 21px */
            margin-top: 6px;
        }
    }
`;
