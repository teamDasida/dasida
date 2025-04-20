import { useState } from 'react';
import AddView from './components/AddView';
import axiosInstance from '../../api/axios';

export default function AddContainer() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 전송 버튼 클릭 시 제목과 내용을 전송(혹은 콘솔 출력)
    const handleSubmit = () => {
        console.log('Submitting article:', { title, content });
        const res = axiosInstance.post(`/knowledge-quiz`,{ title, content })
        console.log(res);
        
        // 여기에 서버로 데이터 전송하는 로직 추가 가능
    };

    return (
        <AddView
            title={title}
            handleTitleChange={setTitle}
            handleEditorChange={setContent}
            handleSubmit={handleSubmit}
        />
    );
}
