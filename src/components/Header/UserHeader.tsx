import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContent, Nav, UserInfo } from './styles';

export default function UserHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <HeaderContent>
            <Nav>
                <h1>
                    <img src="./img/logo.png" alt="로고" />
                </h1>
                <ul>
                    <li onClick={() => navigate('/')} className={location.pathname === '/' ? 'on' : ''}>
                        홈
                    </li>
                    <li
                        onClick={() => navigate('/list')}
                        className={location.pathname === '/list' || location.pathname === '/editorView' ? 'on' : ''}
                    >
                        지식 보관소
                    </li>
                    <li
                        onClick={() => navigate('/incorrectList')}
                        className={location.pathname === '/incorrectList' ? 'on' : ''}
                    >
                        오답노트
                    </li>
                </ul>
            </Nav>
            <UserInfo>
                <button>
                    <img src="./img/search.svg" alt="검색" />
                </button>
                <button>
                    <img src="./img/profile.png" alt="프로필" />
                </button>
            </UserInfo>
        </HeaderContent>
    );
}
