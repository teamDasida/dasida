import styled, { css } from 'styled-components';

export const MainContainer = styled.main`
    /* 화면 전체 중앙 정렬 */
    margin: 0 auto;

    /* 화면 높이 맞춤 (100vh 등) */
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    box-sizing:border-box;
    padding-bottom:30px;
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
`;
