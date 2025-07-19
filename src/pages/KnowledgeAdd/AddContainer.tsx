import { useState } from 'react';
import AddView from './components/AddView';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getFcmToken, PUSH_AVAILABLE } from '../../firebase'; // ★ 새 래퍼 함수

export default function AddContainer() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /* ----------------------------------------------------------
     * 1) 푸시 토큰 발급 & 서버 저장
     * -------------------------------------------------------- */
    const registerPushToken = async () => {
        if (!PUSH_AVAILABLE) return;

        const token = await getFcmToken(); // ★ 권한 요청·SW 등록 포함
        if (!token) {
            console.warn('[FCM] 토큰을 발급받지 못했습니다.');
            return;
        }

        try {
            await axiosInstance.post('/token', { token });
            console.debug('[FCM] 토큰 저장 완료');
        } catch (e) {
            console.error('[FCM] 토큰 저장 실패:', e);
        }
    };

    /* ----------------------------------------------------------
     * 2) 게시글 전송
     * -------------------------------------------------------- */
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post('/knowledge', { title, content });
            queryClient.invalidateQueries({ queryKey: ['home'] });

            if (data.needPushPermission) await registerPushToken(); // ★ 조건부 호출
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
        setContent(val.slice(0, 500));
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
