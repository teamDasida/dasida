import React from 'react';
import { Container, KakaoButton, LogoSection, SubTitle, Title } from './styles';
import Logo from './../../components/Logo/Logo';

const Login: React.FC = () => {
    const handleKakaoLogin = () => {
        // TODO: 카카오 로그인 로직 추가
        alert('카카오 로그인 버튼 클릭!');
    };

    return (
        <Container>
            <LogoSection>
                {/* 로고 이미지가 있다면 */}

                <Logo />
                <Title>버스 알림 서비스</Title>
                <SubTitle>버스 도착 알림을 편리하게 이용해보세요!</SubTitle>
            </LogoSection>

            <KakaoButton onClick={handleKakaoLogin}>카카오로 시작하기</KakaoButton>
        </Container>
    );
};

export default Login;
