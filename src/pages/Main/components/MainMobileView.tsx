import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEnableCheck } from '../../../hooks/useEnableCheck';
import useKakaoLogin from '../../../hooks/useKakaoLogin';
import useIsMobile from '../../../hooks/useIsMobile';
import useIsStandalone from '../../../hooks/useIsStandalone';
import { MbMain } from '../../../style/GlobalStyle';
import { InstallBtn, KakaoBtn, MbCharacterBox } from '../styles';

export default function MainMobileView() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const isStandalone = useIsStandalone();
    const canUseApp = isMobile && isStandalone; // PWA + 모바일일 때만 로그인 노출

    const { checkEnable } = useEnableCheck();
    const handleClickLogin = useKakaoLogin();

    const handleLogin = async (e: MouseEvent) => {
        const res = await checkEnable();
        if (res && res !== 'error') {
            await handleClickLogin(e);
        } else if (res === 'error') {
            alert('잠시 후 다시 시도해주세요.');
        } else {
            alert('모집 인원을 다 채웠어요 ㅜㅜ');
        }
    };

    const handleGoInstall = () => alert('준비중입니다.');

    return (
        <MbMain>
            <MbCharacterBox>
                <img src="/img/mbChracter.png" alt="다시다 캐릭터" />
                <p>
                    안녕하세요! 다시다예요 :)
                    <span>함께 지식을 우려내볼까요?</span>
                </p>
            </MbCharacterBox>

            {canUseApp ? (
                <KakaoBtn $mb onClick={handleLogin}>
                    카카오 계정으로 시작하기
                </KakaoBtn>
            ) : (
                <InstallBtn onClick={handleLogin}>다시다 앱 다운로드</InstallBtn>
            )}
        </MbMain>
    );
}
