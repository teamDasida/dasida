import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 30px 0;

    /* SVG와 텍스트 간격 조정 */
    svg {
        margin-right: 12px; /* SVG와 텍스트 사이 간격 */
        width: 40px; /* SVG 너비 조정 */
        height: auto; /* SVG 높이는 자동 조정 */
    }
`;

const LogoTxt = styled.p`
    color: #1d95d0;
    font-size: 20px;
    font-weight: bold;
    margin: 0; /* 텍스트의 추가 여백 제거 */
`;

const LogoImage = () => (
    <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1D95D0" />
                <stop offset="100%" stopColor="#70C3FF" />
            </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#blueGradient)" />
        <path
            d="M20 20 h20 v15 h-20 z
               M25 25 v5
               M30 25 v5
               M35 25 v5"
            fill="#FFFFFF"
        />
    </svg>
);

const Logo: React.FC = () => {
    return (
        <LogoContainer>
            <LogoImage />
            <LogoTxt>Bus Alarm</LogoTxt>
        </LogoContainer>
    );
};

export default Logo;
