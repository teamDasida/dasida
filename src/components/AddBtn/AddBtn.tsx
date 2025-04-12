import styled from 'styled-components';
import { center } from '../../style/GlobalStyle';

interface AddBtnProps {
    onConfirm: () => void;
}
export default function AddBtn({ onConfirm }: AddBtnProps) {
    return (
        <BtnStyle onClick={onConfirm}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path
                    d="M5.13672 12H19.1367M12.1367 5V19"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </BtnStyle>
    );
}

const BtnStyle = styled.button`
    position: fixed;
    right: 20px;
    bottom: 96px;
    border-radius: 50%;
    background: var(--Colors-Primary-200, #c4d7c2);

    /* Global Tokens/E3 */
    box-shadow: 0px 16px 40px -8px rgba(95, 95, 88, 0.16);
    width: 48px;
    height: 48px;
    ${center};
`;
