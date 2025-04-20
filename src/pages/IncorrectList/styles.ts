import styled, { css } from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const IncorrectBox = styled.div<{$isMobile : boolean}>`
  position: relative;   /* 절대위치 자식의 기준이 됨 */
  display: flex;
  flex-direction: ${({ $isMobile }) => $isMobile ? 'column' : 'row'};

  & > div {
    flex: 1;
    padding: 24px;
    /* 모바일에선 height를 auto로 바꿀 수도 있어요 */
    height:  609px;
    box-sizing: border-box;
    border-radius: var(--Radius-2, 8px);
    background: var(--white, #fff);
    margin-left: ${({ $isMobile }) => ($isMobile ? '0' : '24px')};
    overflow-y: auto;
    transition: all 0.2s;

    /* 모바일이면 absolute로 띄우기 */
    ${({ $isMobile }) => $isMobile && css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      height:calc(100vh - 76px);
      overflow-y:auto;
    `}

    & > p {
      color: var(--Colors-Neutral-1000, #1a1f1f);
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
export const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: var(--Colors-Neutral-600, #6b7171);
`;