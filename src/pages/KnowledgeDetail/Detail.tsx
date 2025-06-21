// pages/KnowledgeDetail/Detail.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EditorContainer, Main } from '../../style/GlobalStyle';
import { ViewerContainer, Title } from './styles';
import TuiViewer from './components/TuiViewer';
import { fetchKnowledgeDetail, KnowledgeDetail } from '../../api/knowledge';
import NotFound from '../NotFound/NotFound';

export default function Detail() {
    /* URL 파라미터 (/knowledge/:id) */
    const { id = '' } = useParams<{ id: string }>();

    /* React-Query: 상세 데이터 */
    const {
        data, // KnowledgeDetail | undefined
        isLoading,
        error,
    } = useQuery<KnowledgeDetail, Error>({
        queryKey: ['knowledge', id],
        queryFn: () => fetchKnowledgeDetail(id),
        enabled: !!id, // id가 있을 때만 요청
    });

    /* 로딩/에러 처리 */
    // if (isLoading) return <p>로딩 중…</p>;
    if (error) return <NotFound />;
    console.log(data);

    return (
        <Main>
            <EditorContainer>
                <ViewerContainer>
                    <Title>{data?.title}</Title>
                    <TuiViewer initialValue={data?.content} />
                </ViewerContainer>
            </EditorContainer>
        </Main>
    );
}
