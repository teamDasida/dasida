import useKakaoLogin from '../../../hooks/useKakaoLogin';
import { MbMain } from '../../../style/GlobalStyle';
import { KakaoBtn, MbCharacterBox } from '../styles';

export default function MainMobileView() {
    const handleClickLogin = useKakaoLogin();

    return (
        <MbMain>
            <MbCharacterBox>
                <img src="/img/mbChracter.png" alt="" />
                <p>
                    안녕하세요! 다시다예요 :)
                    <span>함께 지식을 우려내볼까요?</span>
                </p>
            </MbCharacterBox>
            <KakaoBtn $mb={true} onClick={handleClickLogin}>카카오 계정으로 시작하기</KakaoBtn>
        </MbMain>
    );
}
