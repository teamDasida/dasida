// // pages/Knowledge/List.tsx
// // ─────────────────────────────────────────────────────────────
// // “내 지식” 목록 + 무한 스크롤
// //
// // ⚙️ 핵심 로직
// //   1) /knowledge?offset=n  →  useInfiniteQuery 로 페이징
// //   2) IntersectionObserver 로 스크롤 끝에 도달하면 fetchNextPage()
// //   3) 화면 쪽에서는 data / error / isLoading 세 가지만 사용
// // ─────────────────────────────────────────────────────────────
// import { useNavigate } from 'react-router-dom';
// import { ListTitle, Main, MyList } from '../../style/GlobalStyle';
// import useHideTitleOnScroll from '../../hooks/useHideTitleOnScroll';
// import useIsMobile from '../../hooks/useIsMobile';

// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchKnowledge, KnowledgePage } from '../../api/knowledge'; // API 호출 + 타입
// import { KnowledgeItem } from '../../type';

// import { useEffect, useRef } from 'react';

// export default function KnowledgeListPage() {
//     const navigate = useNavigate();
//     const hideTitle = useHideTitleOnScroll();
//     const isMobile = useIsMobile();

//     /* ─────────────────────────────────────────────
//      * ① 데이터 패칭 – useInfiniteQuery
//      *    - TQueryFnData = KnowledgePage  (개별 “페이지” 타입)
//      *    - TError       = Error
//      *    ⇒ data 는 `InfiniteData<KnowledgePage>` 로 자동 추론돼
//      *       data.pages[0|1|…] 접근 가능
//      * ──────────────────────────────────────────── */
//     const {
//         data, // 모든 페이지 모음 (=> data.pages)
//         error, // 에러 객체
//         fetchNextPage, // 다음 페이지 호출 함수
//         hasNextPage, // nextOffset 이 null/undefined 면 false
//         isFetchingNextPage, // 추가 페이지 로딩 중?
//     } = useInfiniteQuery<KnowledgePage, Error>({
//         queryKey: ['knowledge'],
//         queryFn: ({ pageParam = 0 }) => fetchKnowledge(pageParam as number),
//         initialPageParam: 0, // 첫 offset
//         getNextPageParam: (last) => last.nextOffset ?? undefined,
//     });

//     /* data.pages -> [KnowledgePage, KnowledgePage, …] 평탄화 */
//     const items: KnowledgeItem[] = data?.pages.flatMap((p: KnowledgePage) => p.items) ?? [];

//     /* ─────────────────────────────────────────────
//      * ② IntersectionObserver – 리스트 끝에 도달하면 fetchNextPage()
//      *    조건: (1) sentinel 이 보인다 && (2) 다음 페이지가 있다 && (3) 아직 안 불렀다
//      * ──────────────────────────────────────────── */
//     const bottomRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!bottomRef.current) return;

//         const io = new IntersectionObserver((entries) => {
//             const reachedBottom = entries[0].isIntersecting;
//             if (reachedBottom && hasNextPage && !isFetchingNextPage) {
//                 fetchNextPage(); // pageParam 은 React-Query 가 알아서 관리
//             }
//         });

//         io.observe(bottomRef.current);
//         return () => io.disconnect();
//     }, [bottomRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

//     /* ─────────────────────────────────────────────
//      * ③ 에러 처리
//      * ──────────────────────────────────────────── */
//     if (error) {
//         navigate('/main');
//     }

//     /* ─────────────────────────────────────────────
//      * ④ 렌더
//      * ──────────────────────────────────────────── */
//     return (
//         <Main $paddingTop={isMobile}>
//             {/* 상단 타이틀 + 검색 + 추가 버튼 */}
//             <ListTitle $hideTitle={hideTitle}>
//                 나의 지식
//                 <button onClick={() => navigate('/knowledge/add')}>
//                     지식 추가
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
//                         <path d="M5 12H19M12 5V19" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
//                     </svg>
//                 </button>
//                 <div className="searchInput">
//                     <input type="text" placeholder="지식 검색" />
//                 </div>
//             </ListTitle>

//             {/* 지식 리스트 */}
//             <MyList>
//                 {items.map(({ id, title, createAt }) => (
//                     <li key={id} onClick={() => navigate(`/knowledge/${id}`)}>
//                         <p>{title}</p>
//                         <span>{new Date(createAt).toLocaleDateString()}</span>
//                     </li>
//                 ))}

//                 {/* 로딩 스피너 (첫 로딩 + 추가 로딩 둘 다) */}
//                 {/* {(isLoading || isFetchingNextPage) && (
//           <li>
//             <p>Loading…</p>
//           </li>
//         )} */}

//                 {/* sentinel – 화면에 들어오면 IntersectionObserver 콜백 실행 */}
//                 <div ref={bottomRef} style={{ height: 1 }} />
//             </MyList>
//         </Main>
//     );
// }
