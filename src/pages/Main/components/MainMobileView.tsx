import { MouseEvent, useCallback } from 'react';
import { useEnableCheck } from '../../../hooks/useEnableCheck';
import useKakaoLogin from '../../../hooks/useKakaoLogin';
import useIsMobile from '../../../hooks/useIsMobile';
import useIsStandalone from '../../../hooks/useIsStandalone';
import { MbMain } from '../../../style/GlobalStyle';
import { InstallBtn, KakaoBtn, MbCharacterBox } from '../styles';
import { usePwaInstall } from '../../../hooks/usePwaInstall';

// ── Android 전용 intent 유틸 ─────────────────────────────────
function isAndroidUA(ua: string): boolean {
    return /Android/i.test(ua);
}

/** 네이버앱/웹뷰 등에서 Chrome으로 현재 페이지를 여는 intent URL 생성 */
function buildChromeIntentUrl(currentHref: string): string {
    try {
        const url = new URL(currentHref);
        const path = `${url.host}${url.pathname}${url.search}${url.hash}`;
        const fallback = encodeURIComponent(currentHref);
        const scheme = url.protocol.replace(':', ''); // https:
        return `intent://${path}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
    } catch {
        return currentHref;
    }
}

export default function MainMobileView() {
    const isMobile = useIsMobile();
    const isStandalone = useIsStandalone();
    const canUseApp = isMobile && isStandalone; // 설치된 PWA에서만 로그인 노출

    const { checkEnable } = useEnableCheck();
    const handleClickLogin = useKakaoLogin();

    const { canInstall, promptInstall, support } = usePwaInstall();

    const handleLogin = useCallback(
        async (e: MouseEvent<HTMLButtonElement>) => {
            const res = await checkEnable();
            if (res && res !== 'error') {
                await handleClickLogin(e);
            } else if (res === 'error') {
                alert('잠시 후 다시 시도해주세요.');
            } else {
                alert('모집 인원을 다 채웠어요 ㅜㅜ');
            }
        },
        [checkEnable, handleClickLogin]
    ); // ❄️ stable deps

    const handleGoInstall = useCallback(async () => {
        // 1) 공식 프롬프트 가능하면 우선 시도
        if (canInstall && support.supported) {
            const outcome = await promptInstall();
            if (outcome === 'accepted') {
                // 설치 직후 UX(선택): 토스트/라우팅 등
                return;
            }
            // dismissed/unavailable이면 폴백 진행
        }

        // 2) 안드로이드면 Chrome intent로 현재 URL을 열어 설치 메뉴 유도
        const ua = window.navigator.userAgent;
        if (isAndroidUA(ua)) {
            const intentUrl = buildChromeIntentUrl(window.location.href);
            window.location.href = intentUrl;
            return;
        }

        // 3) 그 밖의 환경 안내
        const reason = support.supported ? 'no-event' : support.reason;
        const msgMap: Record<'ios' | 'standalone' | 'not-android' | 'no-event', string> = {
            ios: 'iOS는 “공유 → 홈 화면에 추가”로 설치해 주세요.',
            standalone: '이미 설치된 상태예요. 앱 아이콘으로 실행해 주세요.',
            'not-android': '안드로이드(Chrome/Edge 계열)에서 설치를 지원해요.',
            'no-event':
                '설치 조건이 아직 준비되지 않았어요. 잠시 후 다시 시도하거나 브라우저 메뉴의 “설치/홈 화면에 추가”를 이용해 보세요.',
        };
        alert(msgMap[reason ?? 'no-event']);
    }, [canInstall, promptInstall, support]);

    return (
        <MbMain>
            <MbCharacterBox>
                <img src="/img/mbChracter.png" alt="다시다 캐릭터" />
                <p>
                    안녕하세요! 다시다예요 :)
                    <span>함께 지식을 우려내볼까요?</span>
                </p>
            </MbCharacterBox>

            {/* {canUseApp ? ( */}
                <KakaoBtn $mb onClick={handleLogin}>
                    카카오 계정으로 시작하기
                </KakaoBtn>
            {/* ) : (
                <InstallBtn
                    onClick={handleGoInstall}
                    // ✅ 항상 탭 가능: 설치 프롬프트 또는 Chrome intent 폴백
                    aria-disabled={false}
                >
                    다시다 앱 다운로드
                </InstallBtn>
            )} */}
        </MbMain>
    );
}

// import { MouseEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { useEnableCheck } from '../../../hooks/useEnableCheck';
// import useKakaoLogin from '../../../hooks/useKakaoLogin';
// import useIsMobile from '../../../hooks/useIsMobile';
// import useIsStandalone from '../../../hooks/useIsStandalone';
// import { MbMain } from '../../../style/GlobalStyle';
// import { InstallBtn, KakaoBtn, MbCharacterBox } from '../styles';

// export default function MainMobileView() {
//     const navigate = useNavigate();
//     const isMobile = useIsMobile();
//     const isStandalone = useIsStandalone();
//     const canUseApp = isMobile && isStandalone; // PWA + 모바일일 때만 로그인 노출

//     const { checkEnable } = useEnableCheck();
//     const handleClickLogin = useKakaoLogin();

//     const handleLogin = async (e: MouseEvent) => {
//         const res = await checkEnable();
//         if (res && res !== 'error') {
//             await handleClickLogin(e);
//         } else if (res === 'error') {
//             alert('잠시 후 다시 시도해주세요.');
//         } else {
//             alert('모집 인원을 다 채웠어요 ㅜㅜ');
//         }
//     };

//     const handleGoInstall = () => alert('준비중입니다.');

//     return (
//         <MbMain>
//             <MbCharacterBox>
//                 <img src="/img/mbChracter.png" alt="다시다 캐릭터" />
//                 <p>
//                     안녕하세요! 다시다예요 :)
//                     <span>함께 지식을 우려내볼까요?</span>
//                 </p>
//             </MbCharacterBox>

//             {canUseApp ? (
//                 <KakaoBtn $mb onClick={handleLogin}>
//                     카카오 계정으로 시작하기
//                 </KakaoBtn>
//             ) : (
//                 <InstallBtn onClick={}>다시다 앱 다운로드</InstallBtn>
//             )}
//         </MbMain>
//     );
// }
