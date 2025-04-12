import { BottomBtnContainer } from './styeld';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomBtns() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <BottomBtnContainer>
            <li onClick={() => navigate('/')}>
                {location.pathname === '/' ? (
                    <img src="/img/bottom/home_active.svg" alt="" />
                ) : (
                    <img src="/img/bottom/home.svg" alt="" />
                )}
                <span className={location.pathname === '/' ? 'on' : ''}>홈</span>
            </li>
            <li onClick={() => navigate('/knowledge')}>
                {location.pathname.includes('/knowledge') ? (
                    <img src="/img/bottom/list_active.svg" alt="" />
                ) : (
                    <img src="/img/bottom/list.svg" alt="" />
                )}

                <span className={location.pathname.includes('/knowledge') ? 'on' : ''}>지식보관소</span>
            </li>
            <li onClick={() => navigate('/wrong-answers')}>
                {location.pathname === '/wrong-answers' ? (
                    <img src="/img/bottom/incorrect_active.svg" alt="" />
                ) : (
                    <img src="/img/bottom/incorrect.svg" alt="" />
                )}

                <span className={location.pathname === '/wrong-answers' ? 'on' : ''}>오답노트</span>
            </li>
        </BottomBtnContainer>
    );
}
