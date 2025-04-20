import useHideTitleOnScroll from '../../hooks/useHideTitleOnScroll';
import useIsMobile from '../../hooks/useIsMobile';
import { ListTitle, Main, MyList } from '../../style/GlobalStyle';
import { IncorrectBox, LearningDetail, CloseBtn } from './styles';
import { useState } from 'react';

export default function IncorrectList() {
    const [detail, setDetail] = useState(false);
    const isMobile = useIsMobile();
    const hideTitle = useHideTitleOnScroll();

    return (
        <>
            <Main $paddingTop={isMobile ? `101px` : '0'}>
                <ListTitle $hideTitle={hideTitle}>
                    오답노트
                    {!detail && (
                        <div className="searchInput">
                            <input type="text" placeholder="지식 검색" />
                        </div>
                    )}
                </ListTitle>

                <IncorrectBox $isMobile={isMobile}>
                    <MyList $width={detail && !isMobile ? '384px' : '100%'}>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                        <li onClick={() => setDetail(true)}>
                            <p>고3 3월 모고29번</p>
                        </li>
                    </MyList>
                    {detail && (
                        <div>
                            <p>
                                문제
                                <button>클릭 해서 정답 보기</button>
                            </p>
                            <CloseBtn aria-label="닫기" onClick={() => setDetail(false)}>
                                ✕
                            </CloseBtn>

                            <LearningDetail>
                                <p>학습 내역</p>
                                <ul>
                                    <li>
                                        <img src="./img/circle-alert.svg" alt="" />
                                        just
                                    </li>
                                    <li>
                                        <img src="./img/circle-alert.svg" alt="" />
                                        just
                                    </li>
                                    <li>
                                        <img src="./img/circle-alert.svg" alt="" />
                                        just
                                    </li>
                                    <li>
                                        <img src="./img/circle-alert.svg" alt="" />
                                        just
                                    </li>
                                    <li>
                                        <img src="./img/circle-alert.svg" alt="" />
                                        just
                                    </li>
                                </ul>
                            </LearningDetail>
                        </div>
                    )}
                </IncorrectBox>
            </Main>
        </>
    );
}
