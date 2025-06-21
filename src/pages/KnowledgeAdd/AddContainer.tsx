import { useState } from 'react';
import AddView from './components/AddView';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
export default function AddContainer() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log(content);

    // 전송 버튼 클릭 시 제목과 내용을 전송(혹은 콘솔 출력)
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`/knowledge`, {
                title,
                content,
            });
            queryClient.invalidateQueries({ queryKey: ['home'] });
            console.log('Article submitted successfully:', response.data);
            navigate('/'); // 성공 시 메인 페이지로 이동
        } catch (err) {
            console.error('Error submitting article:', err);
            alert('데이터를 서버에 전송하는 중에 오류가 발생했습니다.');
            setIsLoading(false);
        }
    };
    // 내용은 최대 500자까지
    const onContentChange = (content: string) => {
        const truncated = content.length > 500 ? content.slice(0, 500) : content;
        setContent(truncated);
    };
    return (
        <AddView
            title={title}
            handleTitleChange={setTitle}
            handleEditorChange={onContentChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
}
