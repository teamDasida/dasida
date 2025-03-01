import styled from 'styled-components';

export const IntroContainer = styled.div`
    /* 화면 전체 중앙 정렬 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 71px;
    height:100%;
    box-sizing:border-box;

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
