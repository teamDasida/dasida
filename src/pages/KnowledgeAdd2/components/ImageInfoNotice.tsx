// src/.../KnowledgeAdd2/ImageInfoNotice.tsx
import React, { memo, useCallback } from 'react';
import { ImageInfoModal } from '../styled';

interface Props {
    onClose: () => void;
}

function ImageInfoNoticeBase({ onClose }: Props) {
    const handleClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <ImageInfoModal>
            <p>
                이미지 업로드에 대해 알려드려요!
                <img src="/img/x.svg" alt="안내 닫기" onClick={handleClick} />
            </p>
            <span>이미지 업로드 시 품질이 낮을경우 퀴즈 생성의 정확도가 떨어질 수 있어요.</span>
        </ImageInfoModal>
    );
}

export const ImageInfoNotice = memo(ImageInfoNoticeBase);
