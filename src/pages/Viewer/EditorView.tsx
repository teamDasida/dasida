import React from 'react';
import UserHeader from '../../components/Header/UserHeader';
import { EditorContainer, MainContainer } from '../../style/GlobalStyle';
import { ViewerContainer, Title } from './styles';
import TuiViewer from '../../components/TuiViewer/TuiViewer';

export default function EditorView() {
    // 예시 데이터: 실제로는 서버나 전역 상태에서 데이터를 받아올 수 있습니다.
    const titleText = '게시글 제목 예시';
    const markdownContent = String.raw`
안녕 하세여 반가워용 ~~
`;

    return (
        <>
            <UserHeader />
            <MainContainer>
                <EditorContainer>
                    <ViewerContainer>
                        <Title>{titleText}</Title>
                        <TuiViewer initialValue={markdownContent} />
                    </ViewerContainer>
                </EditorContainer>
            </MainContainer>
        </>
    );
}
