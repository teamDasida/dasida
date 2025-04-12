import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const BottomBtnContainer = styled.ul`
    border-top: 0.5px solid var(--Colors-Neutral-400, #9faaaa);
    background: rgba(255, 255, 255, 0.75);
    background-blend-mode: hard-light;
    backdrop-filter: blur(22.9007625579834px);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 76px;
    display:flex;
    align-items:center;
    li {
        width:33.3333%;
        flex-direction:column;
        ${center};
        
        & > span {
            display:block;
            margin-top:8px;
            color: var(--Colors-Neutral-500, #879595);
            text-align: center;

            /* Label/L3/R */
            font-size: 12px;
            font-weight: 500;
            &.on {
                color: var(--Colors-Primary-500, #6b9a68);

                /* Label/L3/B */
                font-weight: 600;
            }
        }
    }
`;
