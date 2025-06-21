// src/pages/KnowledgeList/KnowledgeListContainer.tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchKnowledge, KnowledgePage, searchKnowledge } from '../../api/knowledge';
import useHideTitleOnScroll from '../../hooks/useHideTitleOnScroll';
import useIsMobile from '../../hooks/useIsMobile';
import { KnowledgeItem } from '../../type';
import KnowledgeListView from './KnowledgeListView';

// ⏱ 디바운스 훅 (1.5s)
function useDebounce<T>(value: T, delay = 1500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export default function KnowledgeListContainer() {
    const navigate = useNavigate();
    const hideTitle = useHideTitleOnScroll();
    const isMobile = useIsMobile();

    // ── 검색 상태 ──
    const [keyword, setKeyword] = useState('');
    const debounced = useDebounce(keyword, 700);
    const isSearching = debounced.trim().length > 0;

    // ── 무한 스크롤 목록 ──
    const {
        data: listData,
        error: listError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<KnowledgePage, Error>({
        queryKey: ['knowledge'],
        queryFn: ({ pageParam = 0 }) => fetchKnowledge(pageParam as number),
        initialPageParam: 0,
        getNextPageParam: (last) => last.nextOffset ?? undefined,
        enabled: !isSearching,
    });
    const listItems: KnowledgeItem[] = listData?.pages.flatMap((p) => p.items) ?? [];

    console.log(listData);

    // ── 검색 ──
    const {
        data: searchItems = [],
        isFetching: searchLoading,
        error: searchError,
    } = useQuery<KnowledgeItem[], Error>({
        queryKey: ['knowledgeSearch', debounced],
        queryFn: () => searchKnowledge(debounced),
        enabled: isSearching,
        staleTime: 0,
    });

    // ── 최종 상태 계산 ──
    const items: KnowledgeItem[] = isSearching ? searchItems : listItems;
    const error = isSearching ? searchError : listError;
    const isLoading = isSearching ? searchLoading : false;

    // ── sentinel ──
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!bottomRef.current || isSearching) return;
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });
        io.observe(bottomRef.current);
        return () => io.disconnect();
    }, [isSearching, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 에러 시 메인으로
    if (error) {
        navigate('/main');
        return null;
    }

    return (
        <KnowledgeListView
            items={items}
            hideTitle={hideTitle}
            isMobile={isMobile}
            onItemClick={(id) => navigate(`/knowledge/${id}`)}
            bottomRef={bottomRef}
            keyword={keyword}
            setKeyword={setKeyword}
            isLoading={isLoading || isFetchingNextPage}
        />
    );
}
