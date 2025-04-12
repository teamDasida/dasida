import { useNavigate } from 'react-router-dom';
import { ListTitle, Main, MyList } from '../../style/GlobalStyle';
import useHideTitleOnScroll from '../../hooks/useHideTitleOnScroll';
import useIsMobile from '../../hooks/useIsMobile';

export default function List() {
    const navigate = useNavigate();
    const hideTitle = useHideTitleOnScroll();
    const isMobile = useIsMobile();

    return (
        <>
            <Main $paddingTop={isMobile ? `101px` : '0'}>
                <ListTitle $hideTitle={hideTitle}>
                    나의 지식
                    <button onClick={() => navigate('/knowledge/add')}>
                        지식 추가
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 12H19M12 5V19"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="searchInput">
                        <input type="text" placeholder="지식 검색" />
                    </div>
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
            </Main>
        </>
    );
}
