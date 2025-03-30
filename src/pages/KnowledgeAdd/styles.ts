import styled from 'styled-components';

export const TitleInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    margin-bottom: 30px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;
export const SubmitButton = styled.button`
    background-color: #c4d7c2;
    border: none;
    border-radius: 8px;
    padding: 20px 50px;
    font-size: 1rem;
    cursor: pointer;
    align-self: flex-end; /* 오른쪽 정렬, 필요에 따라 조정 가능 */
    transition: background-color 0.3s;
    margin: 50px auto;
    color: #000;
    display: block;
`;
