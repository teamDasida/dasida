// KnowledgeAdd2.tsx
import React, { useCallback, useMemo, useRef, useState } from 'react';
import axiosInstance from '../../api/axios';
import {
    AddBtn,
    AddHeader,
    AddImgBtn,
    AddModalForm,
    AddModalMain,
    BackArrow,
    ImgSubtxt,
    TextArea,
    TitleInput,
} from './styled';
import { ImageInfoNotice } from './components/ImageInfoNotice';
import AddImageList from './components/AddImageList';
import Spinner from '../../components/Loading/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import { enablePush } from '../../firebase';

interface Props {
    onClose: () => void;
}

interface FormState {
    title: string;
    text: string;
    images: string[];
}

interface UploadImageResponse {
    imageUrl: string;
}

const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/webp'] as const;
const MAX_IMAGES = 3 as const;

export default function KnowledgeAdd2({ onClose }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();

    const [showInfo, setShowInfo] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<FormState>({
        title: '',
        text: '',
        images: [],
    });
    const getNonWhitespaceLength = (s: string) => s.replace(/\s/g, '').length;

    const handleCloseInfo = useCallback(() => {
        setShowInfo(false);
    }, []);

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setForm((prev) => ({
            ...prev,
            title: value,
        }));
    }, []);

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setForm((prev) => ({
            ...prev,
            text: value,
        }));
    }, []);

    const handleRemoveImage = useCallback((targetUrl: string) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((url) => url !== targetUrl),
        }));
    }, []);

    // 파일 다이얼로그 열기 (의존성 없음 → 고정)
    const openPicker = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    // accept 속성(브라우저 1차 필터) — 매 렌더 재생성 방지
    const acceptAttr = useMemo(() => ALLOWED_MIMES.join(','), []);

    // 선택 즉시 업로드 → 응답의 imageUrl을 form.images에 추가
    const handleChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.currentTarget.files?.[0] ?? null;
            if (!file) return;

            // 현재 이미지 개수가 최대치면 바로 막기
            if (form.images.length >= MAX_IMAGES) {
                alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요.`);
                e.currentTarget.value = '';
                return;
            }

            // MIME 필터 (png/jpg/webp)
            if (!ALLOWED_MIMES.includes(file.type as (typeof ALLOWED_MIMES)[number])) {
                alert('PNG, JPG(JPEG), WEBP만 업로드할 수 있어요.');
                e.currentTarget.value = '';
                return;
            }

            try {
                const fd = new FormData();
                fd.append('file', file);

                // ✅ 응답 타입을 제네릭으로 명시
                const res = await axiosInstance.post<UploadImageResponse>('/image', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const { imageUrl } = res.data;

                if (!imageUrl) {
                    // eslint-disable-next-line no-console
                    console.error('❌ imageUrl이 비어있어요:', res.data);
                    alert('업로드는 되었지만 이미지 주소를 받지 못했어요.');
                    return;
                }

                // 동시 업로드 대비해서 한 번 더 길이 체크
                setForm((prev) => {
                    if (prev.images.length >= MAX_IMAGES) {
                        alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요.`);
                        return prev;
                    }
                    return {
                        ...prev,
                        images: [...prev.images, imageUrl],
                    };
                });
            } catch (err: unknown) {
                // eslint-disable-next-line no-console
                console.error('❌ 업로드 실패:', err);
                alert('업로드에 실패했어요. 잠시 후 다시 시도해주세요.');
            } finally {
                // 같은 파일 재선택 가능하도록 리셋
                e.currentTarget.value = '';
            }
        },
        [form.images.length]
    );

    /* ----------------------------------------------------------
     * 1) 게시글 전송
     * -------------------------------------------------------- */
    const handleSubmit = async () => {
        if (!form.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        // 텍스트(공백 제거 후 길이) 및 이미지 체크
        const textLength = getNonWhitespaceLength(text);
        const hasText = textLength > 0;
        const hasImage = images.length > 0;

        if (!hasText && !hasImage) {
            alert('내용 또는 이미지를 하나 이상 등록해주세요.');
            return;
        }

        if (textLength > 600) {
            alert('600자 까지만 등록이 가능합니다!');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post('/knowledge', form);
            queryClient.invalidateQueries({ queryKey: ['home'] });

            if (data.needPushPermission) await enablePush(); // ★ 조건부 호출
            onClose();
            // navigate('/'); // 메인으로 이동
        } catch (err) {
            console.error('게시글 전송 오류:', err);
            alert('데이터 전송 중 오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    return (
        <AddModalMain>
            {isLoading && <Spinner />}
            <AddHeader>
                <BackArrow src="/img/chevron-left.svg" onClick={onClose} />
                지식 추가
                <AddBtn onClick={handleSubmit}>등록</AddBtn>
            </AddHeader>

            <AddModalForm>
                <TitleInput placeholder="제목을 입력해주세요." value={form.title} onChange={handleTitleChange} />

                {showInfo && <ImageInfoNotice onClose={handleCloseInfo} />}

                <TextArea
                    placeholder="내용을 입력하거나 이미지를 업로드 해주세요."
                    value={form.text}
                    onChange={handleTextChange}
                />

                {form.images.length === 0 ? (
                    <>
                        <AddImgBtn type="button" onClick={openPicker}>
                            사진 업로드(0/3)
                        </AddImgBtn>
                        <ImgSubtxt>* 지원 가능파일: JPEG, PNG, WEBP</ImgSubtxt>
                    </>
                ) : (
                    <AddImageList imageList={form.images} onAddClick={openPicker} onRemove={handleRemoveImage} />
                )}

                {/* 숨겨진 파일 입력 (한 장) — 항상 렌더 */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptAttr}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
            </AddModalForm>
        </AddModalMain>
    );
}

// // KnowledgeAdd2.tsx
// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import axiosInstance from '../../api/axios';
// import {
//     AddBtn,
//     AddHeader,
//     AddImgBtn,
//     AddModalForm,
//     AddModalMain,
//     BackArrow,
//     ImgSubtxt,
//     TextArea,
//     TitleInput,
// } from './styled';
// import { ImageInfoNotice } from './components/ImageInfoNotice';
// import AddImageList from './components/AddImageList';

// interface Props {
//     onClose: () => void;
// }

// interface FormState {
//     title: string;
//     text: string;
//     images: string[];
// }

// interface UploadImageResponse {
//     imageUrl: string;
// }

// const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/webp'] as const;
// const MAX_IMAGES = 3 as const;

// export default function KnowledgeAdd2({ onClose }: Props) {
//     const fileInputRef = useRef<HTMLInputElement | null>(null);

//     const [showInfo, setShowInfo] = useState<boolean>(true);

//     const [form, setForm] = useState<FormState>({
//         title: '',
//         text: '',
//         images: [],
//     });
//     console.log(form);

//     const handleCloseInfo = useCallback(() => {
//         setShowInfo(false);
//     }, []);

//     const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.currentTarget.value;
//         setForm((prev) => ({
//             ...prev,
//             title: value,
//         }));
//     }, []);

//     const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const value = e.currentTarget.value;
//         setForm((prev) => ({
//             ...prev,
//             text: value,
//         }));
//     }, []);

//     // 파일 다이얼로그 열기 (의존성 없음 → 고정)
//     const openPicker = useCallback(() => {
//         fileInputRef.current?.click();
//     }, []);

//     // accept 속성(브라우저 1차 필터) — 매 렌더 재생성 방지
//     const acceptAttr = useMemo(() => ALLOWED_MIMES.join(','), []);

//     // 선택 즉시 업로드 → 응답의 imageUrl을 form.images에 추가
//     const handleChange = useCallback(
//         async (e: React.ChangeEvent<HTMLInputElement>) => {
//             const file = e.currentTarget.files?.[0] ?? null;
//             if (!file) return;

//             // 현재 이미지 개수가 최대치면 바로 막기
//             if (form.images.length >= MAX_IMAGES) {
//                 alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요.`);
//                 e.currentTarget.value = '';
//                 return;
//             }

//             // MIME 필터 (png/jpg/webp)
//             if (!ALLOWED_MIMES.includes(file.type as (typeof ALLOWED_MIMES)[number])) {
//                 alert('PNG, JPG(JPEG), WEBP만 업로드할 수 있어요.');
//                 e.currentTarget.value = '';
//                 return;
//             }

//             try {
//                 const fd = new FormData();
//                 fd.append('file', file);

//                 // ✅ 응답 타입을 제네릭으로 명시
//                 const res = await axiosInstance.post<UploadImageResponse>('/image', fd, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });

//                 const { imageUrl } = res.data;
//                 console.log(res.data);

//                 // 혹시라도 빈 값이 오면 한 번 더 방어
//                 if (!imageUrl) {
//                     // eslint-disable-next-line no-console
//                     console.error('❌ imageUrl이 비어있어요:', res.data);
//                     alert('업로드는 되었지만 이미지 주소를 받지 못했어요.');
//                     return;
//                 }

//                 // 동시 업로드 대비해서 한 번 더 길이 체크
//                 setForm((prev) => {
//                     if (prev.images.length >= MAX_IMAGES) {
//                         alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요.`);
//                         return prev;
//                     }
//                     return {
//                         ...prev,
//                         images: [...prev.images, imageUrl],
//                     };
//                 });
//             } catch (err: unknown) {
//                 // eslint-disable-next-line no-console
//                 console.error('❌ 업로드 실패:', err);
//                 alert('업로드에 실패했어요. 잠시 후 다시 시도해주세요.');
//             } finally {
//                 // 같은 파일 재선택 가능하도록 리셋
//                 e.currentTarget.value = '';
//             }
//         },
//         [form.images.length]
//     );

//     return (
//         <AddModalMain>
//             <AddHeader>
//                 <BackArrow src="/img/chevron-left.svg" onClick={onClose} />
//                 지식 추가
//                 <AddBtn>등록</AddBtn>
//             </AddHeader>

//             <AddModalForm>
//                 <TitleInput placeholder="제목을 입력해주세요." value={form.title} onChange={handleTitleChange} />

//                 {showInfo && <ImageInfoNotice onClose={handleCloseInfo} />}

//                 <TextArea
//                     placeholder="내용을 입력하거나 이미지를 업로드 해주세요."
//                     value={form.text}
//                     onChange={handleTextChange}
//                 />

//                 {!form.images.length ? (
//                     <>
//                         {' '}
//                         <AddImgBtn type="button" onClick={openPicker}>
//                             사진 업로드(0/3)
//                         </AddImgBtn>
//                         <ImgSubtxt>* 지원 가능파일: JPEG, PNG, WEBP</ImgSubtxt>
//                         {/* 숨겨진 파일 입력 (한 장) */}
//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept={acceptAttr}
//                             onChange={handleChange}
//                             style={{ display: 'none' }}
//                         />
//                     </>
//                 ) : (
//                     <AddImageList imageList={form.images} />
//                 )}
//                 {/* 버튼 → 파일선택 → 즉시 업로드 */}
//             </AddModalForm>
//         </AddModalMain>
//     );
// }
