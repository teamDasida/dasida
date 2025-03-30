import { useEffect } from 'react';
import { BackGround, CloseBtn, LoginBox, KakaoBtn } from '../styles';
import useKakaoLogin from '../../../hooks/useKakaoLogin';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const handleClickLogin = useKakaoLogin();

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
        <img src="/img/logo.png" alt="Logo" />
        <KakaoBtn onClick={handleClickLogin}>카카오 계정으로 시작하기</KakaoBtn>
      </LoginBox>
    </BackGround>
  );
}
