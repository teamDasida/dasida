// src/api/knowledge.ts
import { KnowledgeItem } from '../type';
import axiosInstance from './axios';

// ─────────────────────────────────────────────
// 목록(페이징) API
// ─────────────────────────────────────────────
interface RawResponse {
    knowledgeList: KnowledgeItem[];
    page: { nextOffset: number | null };
}
export interface KnowledgePage {
    items: KnowledgeItem[];
    nextOffset: number | null;
}

/* ───── 상세 타입 ───── */
export interface KnowledgeDetail {
    id: number;
    title: string;
    text: string | null;
    createdAt: string;
    images: string[] | null;
}
export const fetchKnowledge = async (offset = 0): Promise<KnowledgePage> => {
    const { data } = await axiosInstance.get<RawResponse>('/knowledge', { params: { offset } });
    return { items: data.knowledgeList, nextOffset: data.page.nextOffset };
};

// ─────────────────────────────────────────────
// 🔍 검색 API  (/knowledge/search?title=)
// ─────────────────────────────────────────────
interface SearchResponse {
    list: KnowledgeItem[];
}
export const searchKnowledge = async (title: string): Promise<KnowledgeItem[]> => {
    const { data } = await axiosInstance.get<SearchResponse>('/knowledge/search', { params: { title } });
    return data.list;
};

/* ───── 상세 조회 ───── */
export const fetchKnowledgeDetail = async (id: number | string): Promise<KnowledgeDetail> => {
    const { data } = await axiosInstance.get<KnowledgeDetail>(`/knowledge/${id}`);
    return data;
};
