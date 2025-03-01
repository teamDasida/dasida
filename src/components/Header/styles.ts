import styled from 'styled-components';

export const HeaderContent = styled.header`
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
            line-height:71px;
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
