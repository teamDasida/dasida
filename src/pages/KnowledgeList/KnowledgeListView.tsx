// ─────────────────────────────────────────────
// src/pages/KnowledgeList/KnowledgeListView.tsx
import React from 'react';
import { ListTitle, Main, MyList } from '../../style/GlobalStyle';
import { KnowledgeItem } from '../../type';
import NoQuiz from '../../components/NoQuiz/NoQuiz';

interface Props {
    items: KnowledgeItem[];
    hideTitle: boolean;
    isMobile: boolean;
    keyword: string;
    setKeyword: (v: string) => void;
    onItemClick: (id: number) => void;
    bottomRef: React.RefObject<HTMLDivElement>;
    isLoading: boolean;
}

export default function KnowledgeListView({
    items,
    // hideTitle,
    keyword,
    setKeyword,
    onItemClick,
    bottomRef,
    isLoading,
}: Props) {
    return (
        <Main>
            <ListTitle>
                나의 지식
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder="제목 검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </ListTitle>

            <MyList>
                {items.length ? (
                    items.map(({ id, title, createAt }) => (
                        <>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                            <li key={id} onClick={() => onItemClick(id)}>
                                <p>{title}</p>
                                <span>{new Date(createAt).toLocaleDateString()}</span>
                            </li>
                        </>
                    ))
                ) : (
                    <NoQuiz mainTxt="추가한 지식이 없어요" />
                )}

                {isLoading && (
                    <li>
                        <p>Loading…</p>
                    </li>
                )}

                <div ref={bottomRef} style={{ height: 1 }} />
            </MyList>
        </Main>
    );
}
