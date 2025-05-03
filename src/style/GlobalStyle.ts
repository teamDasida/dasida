import styled, { css } from 'styled-components';

export const HeaderContent = styled.header`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    height: 71px;
    background: var(--bg, #faf9f6);
    min-width: 1280px;
`;

export const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;

    & > h1 {
        margin-right: 56px;
        width: 180px;
    }
    & > ul {
        display: flex;
        align-items: center;
        height: 71px;

        li {
            padding: 0 17px;
            font-size: 18px;
            height: 71px;
            line-height: 71px;
            cursor: pointer;
            &:hover {
                color: var(--Colors-Primary-600, #567c53);
                font-weight: 700;
            }
            &.on {
                color: var(--Colors-Primary-600, #567c53);
                font-weight: 700;
            }
        }
    }
`;

export const LoginBtn = styled.button`
    /* Paragraph/P2/R */
    font-size: 16px;
    font-weight: 400;
    width: 150px;
    display: block;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    & > button {
        margin-left: 24px;
    }
`;

export const Main = styled.main<{ $paddingTop?: string }>`
    /* 화면 전체 중앙 정렬 */
    margin: 0 auto;

    /* 화면 높이 맞춤 (100vh 등) */
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    padding-bottom: 30px;
    overflow: hidden;
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 0 20px 110px; /* 예시로 좌우 여백 추가 */
        padding-top: ${(props) => (props.$paddingTop ? props.$paddingTop : 0)};
    }
`;
export const MbMain = styled.main`
    position: relative;
    padding: 0 20px;
    min-height: 100vh;
    background: var(--bg, #faf9f6);
`;
export const ellipsisStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const center = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SubTitle = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Heading/H2/B */
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
    cursor: pointer;
`;
export const EditorContainer = styled.div`
    padding-top: 122px;
    min-height: 100vh;
    @media (max-width: 768px) {
        padding-top: 20px;
    }
`;

export const ListTitle = styled.h2<{ $hideTitle?: boolean }>`
    margin: 122px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--Colors-Neutral-1000, #1a1f1f);

    font-size: 20px;
    font-weight: 700;
    transform: ${(props) => (props.$hideTitle ? ' translateY(-43px)' : 'translateY(0)')};
    transition: transform 0.5s;
    & > button {
        border-radius: var(--Radius-2, 8px);
        background: var(--Colors-Primary-200, #c4d7c2);
        display: flex;
        padding: 8px 12px 8px 16px;
        align-items: center;
        font-size: 16px;
        color: #000;
        & > svg {
            display: block;
            margin-left: 4px;
        }
    }
    & > div.searchInput {
        border-radius: var(--Radius-2, 8px);
        background: var(--white, #fff);
        padding: 0px 8px;
        box-shadow: 0px 2px 4px 0px rgba(26, 31, 31, 0.04);
        display: none;
        width: 100%;
        height: 32px;
        box-sizing: border-box;
        align-items: center;
        margin-top: 8px;
        &::before {
            display: block;
            content: '';
            width: 12px;
            height: 12px;
            background: 50% 50% url('/img/search_m.svg') no-repeat;
            background-size: contain;
            margin-right: 6px;
        }
        input {
            flex: 1;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            &::placeholder {
                color: var(--Colors-Neutral-600, #6f8080);
            }
        }
    }
    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        top: 0;
        padding: 23px 20px 18px;
        background-color: #fff;
        margin: 0;
        display: block;
        width: 100%;
        & > div.searchInput {
            display: flex;
        }

        & > button {
            display: none;
        }
    }
`;

export const MyList = styled.ul<{ $width?: string }>`
    padding: 0 8px;
    background-color: #fff;
    border-radius: 8px;
    width: ${(props) => (props.$width ? props.$width : '100%')};
    transition: width 0.5s;
    & > li {
        padding: 20px 8px;
        border-bottom: 1px solid var(--Colors-Neutral-200, #d0d5d5);
        cursor: pointer;
        &:last-child {
            border: none;
        }
        p {
            /* Label/L1/R */
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 4px;
            ${ellipsisStyle};
        }
        span {
            overflow: hidden;
            color: var(--Colors-Neutral-700, #5a6868);
            text-overflow: ellipsis;

            /* Paragraph/P3/R */
            font-size: 14px;
            font-weight: 400;
            display: block;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
`;


interface HintContainerProps {
  /** 중앙 정렬 여부 (transient prop) */
  $center?: boolean;
}

export const HintContainer = styled.div<HintContainerProps>`
  position: absolute;
  z-index: 5;

  /* $center 값에 따라 위치‧크기 조정 */
  left: ${({ $center }) => ($center ? '50%' : '0')};
  top: ${({ $center }) => ($center ? '100px;' : 'calc(100% + 34px)')};
  transform: ${({ $center }) => ($center ? 'translateX(-50%)' : 'none')};
  width: ${({ $center }) => ($center ? 'auto' : '100%')};

  padding: 16px;
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
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
    }
  }
`;
