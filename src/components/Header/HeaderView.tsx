// src/components/Header/HeaderView.tsx
import LoginModal from './LoginModal';
import { HeaderContent, LoginBtn, Nav } from '../../style/GlobalStyle';

interface HeaderViewProps {
  modal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function HeaderView({ modal, openModal, closeModal }: HeaderViewProps) {
  return (
    <>
      <HeaderContent>
        <Nav>
          <h1>
            <img src="./img/logo.png" alt="Logo" />
          </h1>
        </Nav>
        <LoginBtn onClick={openModal}>로그인 또는 가입하기</LoginBtn>
      </HeaderContent>
      {modal && <LoginModal onClose={closeModal} />}
    </>
  );
}
