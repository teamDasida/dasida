import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import { ListTitle, MainContainer, MyList } from '../../style/GlobalStyle';

export default function List() {
    const navigate = useNavigate();

    return (
        <>
            <UserHeader />
            <MainContainer>
                <ListTitle>
                    나의 지식
                    <button onClick={() => navigate('/knowledge/add')}>
                        지식 추가
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 12H19M12 5V19"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </ListTitle>
                <MyList>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                    <li onClick={() => navigate('/knowledge/1')}>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of{' '}
                        </span>
                    </li>
                </MyList>
            </MainContainer>
        </>
    );
}
