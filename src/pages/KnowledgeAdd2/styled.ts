import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

export const AddModalMain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    min-height: 100vh;

    box-sizing: border-box;
    background-color: #faf9f6;
`;
export const AddHeader = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    height: 48px;
    line-height: 48px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    color: #000;

    font-family: 'Pretendard Variable';
    font-size: 20px;
    font-weight: 700;
`;
export const AddBtn = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: var(--Colors-Neutral-500, #879595);

    /* Paragraph/P2/B */
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
`;

export const BackArrow = styled.img`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
`;

export const AddModalForm = styled.form`
    width: 100%;
    box-sizing: border-box;
    padding: 16px 20px 30px;
`;

export const TitleInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid var(--Colors-Neutral-200, #d0d5d5);
    padding: 12px 8px;

    /* Paragraph/P2/B */
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-weight: 700;
    &::placeholder {
        color: var(--Colors-Neutral-600, #6f8080);
    }
    margin-bottom: 16px;
`;
export const ImageInfoModal = styled.div`
    border-radius: var(--Radius-3, 12px);
    border: 1px solid var(--Colors-Primary-300, #a6c2a4);
    background: var(--Colors-Secondary-100, #f5f5e6);

    /* Global Tokens/E2 */
    box-shadow: 0 16px 32px -12px rgba(95, 95, 88, 0.05);
    padding: 16px;
    p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--Colors-Primary-700, #476644);
        font-family: 'Pretendard Variable';
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;
    }
    span {
        display: block;
        color: var(--Colors-Neutral-1000, #1a1f1f);

        /* Paragraph/P3/R */
        font-family: 'Pretendard Variable';
        font-size: 14px;
        font-weight: 400;
        line-height: 21px; /* 21px */
    }
`;

export const TextArea = styled.textarea`
    &::placeholder {
        color: var(--Colors-Neutral-600, #6f8080);
    }

    /* Paragraph/P2/R */
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 24px */
    padding: 12px 8px;
    height: 30vh;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
`;

export const AddImgBtn = styled.button`
    border-radius: var(--Radius-1, 4px);
    border: 1px solid var(--Colors-Primary-600, #567c53);
    ${center}
    height: 48px;
    gap: 8px;

    color: var(--Colors-Primary-600, #567c53);

    /* Paragraph/P2/R */
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    width: 100%;
    margin-bottom: 8px;
    &::before {
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background: 50% 50% url('/img/plus.svg') no-repeat;
        background-size: contain;
    }
`;
export const ImgSubtxt = styled.span`
    color: var(--Colors-Neutral-600, #6f8080);

    /* Label/L3/R */
    font-family: 'Pretendard Variable';
    font-size: 12px;
    font-weight: 500;
    line-height: 15px; /* 15.6px */
`;

export const ImageListContainer = styled.div`
    & > p {
        line-height: 37px;
        font-size: 14px;
        font-weight: 600;
        color: #1a1f1f;
    }
    & > span {
        display: block;
        color: var(--Colors-Neutral-600, #6f8080);
        /* Label/L3/R */
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        margin-bottom: 16px;
    }
`;

export const ImageList = styled.ul`
    display: flex;
    gap: 3px;
    li {
        position: relative;
        border-radius: 4px;
        width: 80px;
        height: 80px;
        img {
            display: block;
            width: 100%;
            object-fit: contain;
            &.close {
                position: absolute;
                top: -4px;
                right: -4px;
                width:24px;
            }
        }
    }
`;

export const AddImgBtn2 = styled.li`
    border: 1px dashed var(--Colors-Primary-500, #6b9a68);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    color: var(--Colors-Primary-600, #567c53);

    /* Label/L3/R */
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
`;
