import UserHeader from '../../components/UserHeader/UserHeader';
import { ListTitle, MainContainer, MyList } from '../../style/GlobalStyle';
import { IncorrectBox, LearningDetail } from './styles';
import { useState } from 'react';

export default function IncorrectList() {
    const [detail, setDetail] = useState(false);

    return (
        <>
            <UserHeader />
            <MainContainer>
                <ListTitle>오답노트</ListTitle>
                <IncorrectBox>
                    <MyList $width={detail ? '384px' : '100%'}>
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
                            <LearningDetail>
                                <p>학습 내역</p>
                                <ul>
                                    <li><img src="./img/circle-alert.svg" alt="" />just</li>
                                    <li><img src="./img/circle-alert.svg" alt="" />just</li>
                                    <li><img src="./img/circle-alert.svg" alt="" />just</li>
                                    <li><img src="./img/circle-alert.svg" alt="" />just</li>
                                    <li><img src="./img/circle-alert.svg" alt="" />just</li>
                                </ul>
                            </LearningDetail>
                        </div>
                    )}
                </IncorrectBox>
            </MainContainer>
        </>
    );
}
