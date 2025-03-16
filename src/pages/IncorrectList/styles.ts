import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const IncorrectBox = styled.div`
    display: flex;

    & > div {
        flex: 1;
        padding: 24px;
        height: 609px;
        box-sizing: border-box;
        border-radius: var(--Radius-2, 8px);
        background: var(--white, #fff);
        margin-left: 24px;
        overflow-y: auto;

        & > p {
            color: var(--Colors-Neutral-1000, #1a1f1f);

            /* Paragraph/P2/R */
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            button {
                display: block;
                margin: 16px 0;
                border-radius: var(--Radius-1, 4px);
                background: var(--Colors-Secondary-400, #90906e);
                width: 100%;
                height: 34px;
                color: var(--white, #fff);

                /* Label/L2/R */
                font-size: 14px;
                font-weight: 500;
                padding: 8px;
                box-sizing: border-box;
                ${center};
            }
        }
    }
`;

export const LearningDetail = styled.div`
    border-top: 1px solid var(--Colors-Neutral-200, #d0d5d5);
    p {
        height: 24px;
        line-height: 24px;
        color: var(--Colors-Neutral-800, #445050);

        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
    }
    li {
        display: flex;
        padding: 8px 0px;
        align-items: center;
        color: var(--Colors-Neutral-1000, #1a1f1f);

        font-size: 16px;
        font-weight: 400;
        & > img {
            margin-right: 8px;
        }
    }
`;
