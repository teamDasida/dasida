import { HeaderContent, LoginBtn, Main, Nav } from "../../../style/GlobalStyle";
import { IntroContainer } from "../styles";
import LoginModal from "./LoginModal";

// MainPcView에서 사용할 프롭스 타입 정의
export interface MainPcViewProps {
  modal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function MainPcView({ modal, openModal, closeModal }: MainPcViewProps) {
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
      <Main>
        <IntroContainer>
          <div>
            안녕하세요! <br />
            다시다예요 :&#41;
            <span>
              함께 지식을 우려내볼까요?
              <br />첫 맛은 저희가 선사할게요
            </span>
          </div>
        </IntroContainer>
      </Main>
    </>
  );
}
