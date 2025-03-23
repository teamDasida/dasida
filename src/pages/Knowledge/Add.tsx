import React, { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import { EditorContainer, MainContainer } from '../../style/GlobalStyle';
import TuiEditor from '../../components/Editor/TuiEditor';
import {  TitleInput, SubmitButton } from './styles';

export default function Add() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    console.log(content);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // TuiEditor에서 전달한 새로운 마크다운 내용을 상태에 저장
    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
        console.log('Editor content changed!', newContent);
    };

    // 전송 버튼 클릭 시 제목과 내용을 전송(혹은 콘솔 출력)
    const handleSubmit = () => {
        console.log('Submitting article:', { title, content });
        // 여기에 서버로 데이터 전송하는 로직 추가 가능
    };

    return (
        <>
            <UserHeader />
            <MainContainer>
                <EditorContainer>
                    <TitleInput
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="타이틀을 입력하세요"
                    />
                    <TuiEditor
                        initialValue="Hello Toast UI Editor!"
                        previewStyle="vertical" // "vertical" | "tab"
                        initialEditType="markdown" // "markdown" | "wysiwyg"
                        height="600px"
                        onChange={handleEditorChange}
                    />
                    <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
                </EditorContainer>
            </MainContainer>
        </>
    );
}
