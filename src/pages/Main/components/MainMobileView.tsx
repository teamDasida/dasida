import { useState } from 'react';
import { useEnableCheck } from '../../../hooks/useEnableCheck';
import useKakaoLogin from '../../../hooks/useKakaoLogin';
import { MbMain } from '../../../style/GlobalStyle';
import { KakaoBtn, MbCharacterBox } from '../styles';

export default function MainMobileView() {
    const { checkEnable } = useEnableCheck();
    const handleClickLogin = useKakaoLogin();
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e: React.MouseEvent) => {
        if (loading) return;
        setLoading(true);
        const res = await checkEnable();

        if (res && res !== 'error') handleClickLogin(e);
        else if (res === 'error') alert('잠시후 다시 시도해주세요');
        else alert('모집 인원을 다 채웠어요 ㅜㅜ');
    };
    // const handleGetToken = async() => {
    //     if (!PUSH_AVAILABLE) return;

    //     const token = await getFcmToken(); // ★ 권한 요청·SW 등록 포함
    //     alert(token);
    // };
    return (
        <MbMain>
            <MbCharacterBox>
                <img src="/img/mbChracter.png" alt="" />
                <p>
                    안녕하세요! 다시다예요 :)
                    <span>함께 지식을 우려내볼까요?</span>
                </p>
            </MbCharacterBox>
            <KakaoBtn $mb={true} onClick={handleLogin}>
                카카오 계정으로 시작하기
            </KakaoBtn>
        </MbMain>
    );
}
