import { useState } from 'react';
import AddView from './components/AddView';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddContainer() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 전송 버튼 클릭 시 제목과 내용을 전송(혹은 콘솔 출력)
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/knowledge-quiz`, {
                title,
                content
            });

            console.log('Article submitted successfully:', response.data);
            navigate('/'); // 성공 시 메인 페이지로 이동
        } catch (err) {
            console.error('Error submitting article:', err);
            alert('데이터를 서버에 전송하는 중에 오류가 발생했습니다.');
        }
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
