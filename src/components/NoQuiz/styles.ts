import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const NoQuizContainer = styled.div<{ $clear?: boolean }>`
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
        width: 180px;
        height: 156px;
        display: block;
        margin-bottom: 24px;
        /* clear prop에 따라 다른 이미지를 사용 */
        background: 50% 50% url(${(props) => (props.$clear ? '/img/clear.png' : '/img/loading.png')}) no-repeat;
        background-size:contain;
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
