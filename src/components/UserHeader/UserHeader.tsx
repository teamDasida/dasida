import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContent, Nav, UserInfo } from '../../style/GlobalStyle';

interface Prop {
    isMobile: boolean;
}
export default function UserHeader({ isMobile }: Prop) {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <HeaderContent>
            <Nav>
                <h1>
                    <img src="/img/logo.svg" alt="로고" />
                </h1>
                {!isMobile && (
                    <ul>
                        <li onClick={() => navigate('/')} className={location.pathname === '/' ? 'on' : ''}>
                            홈
                        </li>
                        <li
                            onClick={() => navigate('/knowledge')}
                            className={location.pathname.includes('/knowledge') ? 'on' : ''}
                        >
                            지식 보관소
                        </li>
                        <li
                            onClick={() => navigate('/wrong-answers')}
                            className={location.pathname === '/wrong-answers' ? 'on' : ''}
                        >
                            오답노트
                        </li>
                    </ul>
                )}
            </Nav>
            <UserInfo>
                {/* <button>
                    <img src="/img/search.svg" alt="검색" />
                </button> */}
                {/* <button>
                    <img src="/img/profile.png" alt="프로필" />
                </button> */}
            </UserInfo>
        </HeaderContent>
    );
}
