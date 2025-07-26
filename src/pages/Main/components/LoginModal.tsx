import { useEffect, useState } from 'react';
import { BackGround, CloseBtn, LoginBox, KakaoBtn } from '../styles';
import useKakaoLogin from '../../../hooks/useKakaoLogin';
import { useEnableCheck } from '../../../hooks/useEnableCheck';

interface LoginModalProps {
    onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
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

    useEffect(() => {
        // 모달이 열릴 때 스크롤 비활성화
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // 모달 언마운트 시 원래 스크롤 설정 복구
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <BackGround>
            <LoginBox>
                <CloseBtn onClick={onClose}>
                    <img src="/img/close.svg" alt="닫기" />
                </CloseBtn>
                <img src="/img/logo.svg" alt="Logo" />
                <KakaoBtn onClick={handleLogin}>카카오 계정으로 시작하기</KakaoBtn>
            </LoginBox>
        </BackGround>
    );
}
