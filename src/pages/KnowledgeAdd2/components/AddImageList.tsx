// AddImageList.tsx
import React, { memo } from 'react';
import { AddImgBtn2, ImageList, ImageListContainer } from '../styled';

interface Props {
    imageList: string[];
    onAddClick: () => void;
    onRemove: (imageUrl: string) => void;
}

function AddImageListBase({ imageList, onAddClick, onRemove }: Props) {
    return (
        <ImageListContainer>
            <p>사진 업로드</p>
            <span>* 지원 가능파일: JPEG, PNG, WEBP</span>
            <ImageList>
                <AddImgBtn2 onClick={onAddClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M6.66699 16.0013H25.3337M16.0003 6.66797V25.3346"
                            stroke="#567C53"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {imageList.length}/3
                </AddImgBtn2>

                {imageList.map((url) => (
                    <li key={url}>
                        <img src={url} alt="업로드 이미지" />
                        <img
                            src="/img/imageClose.svg"
                            alt="이미지 삭제"
                            className="close"
                            onClick={() => onRemove(url)}
                        />
                    </li>
                ))}
            </ImageList>
        </ImageListContainer>
    );
}

export default memo(AddImageListBase);

// import { AddImgBtn2, ImageList, ImageListContainer } from '../styled';

// interface Props {
//     imageList: string[];
// }
// export default function AddImageList({ imageList }: Props) {
//     return (
//         <ImageListContainer>
//             <p>사진 업로드</p>
//             <span>* 지원 가능파일: JPEG, PNG, WEBP</span>
//             <ImageList>
//                 <AddImgBtn2>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
//                         <path
//                             d="M6.66699 16.0013H25.3337M16.0003 6.66797V25.3346"
//                             stroke="#567C53"
//                             stroke-width="1.5"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                         />
//                     </svg>
//                     {imageList.length}/3
//                 </AddImgBtn2>
//                 {imageList.map((v) => (
//                     <li key={v}>
//                         <img src={v} />
//                         <img src="/img/imageClose.svg" alt="" className='close'/>
//                     </li>
//                 ))}
//             </ImageList>
//         </ImageListContainer>
//     );
// }
