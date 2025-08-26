import { useState } from 'react';
import AddView from './components/AddView';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../../api/axios';
import { enablePush } from '../../firebase';

export default function AddContainer() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const getNonWhitespaceLength = (s: string) => s.replace(/\s/g, '').length;
    /* ----------------------------------------------------------
     * 1) 게시글 전송
     * -------------------------------------------------------- */
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }
        const effectiveLength = getNonWhitespaceLength(content);

        if (effectiveLength > 600) {
            alert(`600자 까지만 등록이 가능합니다!`); // 600자 초과면 막음
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post('/knowledge', { title, content });
            queryClient.invalidateQueries({ queryKey: ['home'] });

            if (data.needPushPermission) await enablePush(); // ★ 조건부 호출
            navigate('/'); // 메인으로 이동
        } catch (err) {
            console.error('게시글 전송 오류:', err);
            alert('데이터 전송 중 오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    /* ----------------------------------------------------------
     * 3) 에디터 내용 500자 제한
     * -------------------------------------------------------- */
    const onContentChange = (val: string) => {
        setContent(val);
        setCharCount(val.replace(/\s/g, '').length); // 공백 제외 자수 계산
        // setContent(val.slice(0, 500));
    };

    return (
        <AddView
            title={title}
            handleTitleChange={setTitle}
            handleEditorChange={onContentChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            charCount={charCount} // ⬅️ 추가
            charLimit={600} // ⬅️ 추가
        />
    );
}
