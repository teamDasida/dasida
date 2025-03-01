import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const QuizContainer = styled.div`
    /* 화면 전체 중앙 정렬 */
    margin: 157px 0 60px;
`;

export const QuizList = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 40px 24px 16px;

    border-radius: var(--Radius-4, 16px);
    background: var(--white, #fff);

    /* Global Tokens/E1 */
    box-shadow: 0px 2px 4px 0px rgba(26, 31, 31, 0.04);
`;

export const Passage = styled.div`
    /* Paragraph/P2/R */
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 24px */
    & > input {
        border-radius: var(--Radius-1, 4px);
        background: var(--Colors-blue-0, #dcf2fe);
        width: 50px;
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
    li {
        background: var(--white, #FFF);
        padding: 24px;
        height: 150px;
        margin-right: 24px;
        width: calc(33.3333% - 16px);
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
            white-space: nowrap;

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
    }
`;
