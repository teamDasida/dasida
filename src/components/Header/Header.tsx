import { useState } from 'react';
import { HeaderContent, LoginBtn, Nav } from './styles';
import LoginModal from '../LoginModal/LoginModal';

export default function Header() {
    const [modal, setModal] = useState(false);

    return (
        <>
            <HeaderContent>
                <Nav>
                    <h1>
                        <img src="./img/logo.png" alt="" />
                    </h1>
                </Nav>
                <LoginBtn onClick={() => setModal(true)}>로그인 또는 가입하기</LoginBtn>
            </HeaderContent>
            {modal && <LoginModal onClose={() => setModal(false)} />}
        </>
    );
}
