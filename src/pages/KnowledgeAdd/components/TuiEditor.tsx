// import { useEffect, useRef } from 'react';
// import axios from 'axios';

// /* 런타임 클래스 (default) + 타입 */
// import Editor from '@toast-ui/editor';
// import type { EditorOptions, EventMap } from '@toast-ui/editor';

// import '@toast-ui/editor/dist/toastui-editor.css';

// /* ─────────────────────────────
//    추가 이벤트 매핑
//    ───────────────────────────── */
// interface EventMapping {
//   onLoad?: EventMap['load'];
//   onChange?: (content: string) => void;
//   onCaretChange?: EventMap['caretChange'];
//   onFocus?: EventMap['focus'];
//   onBlur?: EventMap['blur'];
//   onKeydown?: EventMap['keydown'];
//   onKeyup?: EventMap['keyup'];
//   onBeforePreviewRender?: EventMap['beforePreviewRender'];
//   onBeforeConvertWysiwygToMarkdown?: EventMap['beforeConvertWysiwygToMarkdown'];
// }

// /* Props: 기본 옵션 + 커스텀 이벤트 */
// export type TuiEditorProps = Omit<EditorOptions, 'el'> & EventMapping;

// /* 인스턴스 타입 */
// type ToastEditor = InstanceType<typeof Editor>;

// export default function TuiEditor(props: TuiEditorProps) {
//   const editorRootRef = useRef<HTMLDivElement>(null);
//   const editorRef = useRef<ToastEditor | null>(null);

//   /* ① 최초 마운트 */
//   useEffect(() => {
//     if (!editorRootRef.current) return;

//     const { onChange, ...editorOptions } = props;

//     editorRef.current = new Editor({
//       ...editorOptions,
//       el: editorRootRef.current,
//       usageStatistics: false,
//       events: {},
//       hooks: {
//         addImageBlobHook: async (blob: Blob) => {
//           const formData = new FormData();
//           formData.append('file', new File([blob], 'upload.jpg', { type: blob.type }));

//           try {
//             const res = await axios.post(
//               `${import.meta.env.VITE_SERVER_URL}/image`,
//               formData,
//               { withCredentials: true },
//             );
//             const url = res.data.imageUrl;

//             editorRef.current?.insertText(
//               `<img src="${url}" alt="업로드 이미지" style="max-width:100%;" />`,
//             );
//             return false;                 // 기본 삽입 막기
//           } catch (err) {
//             console.error('Image upload failed', err);
//             return true;                  // 실패 시 기본 동작
//           }
//         },
//       },
//     });

//     /* onChange 별도 바인딩 */
//     if (onChange && editorRef.current) {
//       editorRef.current.on('change', () => {
//         onChange(editorRef.current!.getMarkdown());
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // 최초 1회

//   /* ② props 변경 시 반영 */
//   useEffect(() => {
//     if (!editorRef.current) return;
//     const inst = editorRef.current;

//     if (props.height) inst.setHeight(props.height);
//     if (props.previewStyle) inst.changePreviewStyle(props.previewStyle);

//     bindEventHandlers(inst, props);
//   }, [props]);

//   return <div ref={editorRootRef} />;
// }

// /* ─────────────────────────────
//    유틸: 이벤트 바인딩
//    ───────────────────────────── */
// function getBindingEventNames(props: TuiEditorProps) {
//   return Object.keys(props).filter((k) => k.startsWith('on'));
// }

// function bindEventHandlers(editor: ToastEditor, props: TuiEditorProps) {
//   getBindingEventNames(props).forEach((key) => {
//     const evt = key[2].toLowerCase() + key.slice(3); // onChange → change
//     editor.off(evt);

//     if (key === 'onChange' && props.onChange) {
//       editor.on(evt, () => props.onChange!(editor.getMarkdown()));
//     } else {
//       const handler = props[key as keyof TuiEditorProps];
//       if (typeof handler === 'function') {
//         editor.on(evt, handler as (...args: unknown[]) => void);
//       }
//     }
//   });
// }

// // import { useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import ToastuiEditor, { EditorOptions, EventMap } from '@toast-ui/editor';
// // import '@toast-ui/editor/dist/toastui-editor.css';

// // /**
// //  * TUI Editor에서 사용할 이벤트 타입 정의
// //  * onChange의 경우 에디터 내용을 인자로 받습니다.
// //  */
// // interface EventMapping {
// //     onLoad?: EventMap['load'];
// //     onChange?: (content: string) => void;
// //     onCaretChange?: EventMap['caretChange'];
// //     onFocus?: EventMap['focus'];
// //     onBlur?: EventMap['blur'];
// //     onKeydown?: EventMap['keydown'];
// //     onKeyup?: EventMap['keyup'];
// //     onBeforePreviewRender?: EventMap['beforePreviewRender'];
// //     onBeforeConvertWysiwygToMarkdown?: EventMap['beforeConvertWysiwygToMarkdown'];
// // }

// // /**
// //  * TuiEditorProps:
// //  * - Toast UI Editor의 EditorOptions에서 el(마운트 대상)만 제외
// //  * - 추가된 이벤트 타입을 포함
// //  */
// // export type TuiEditorProps = Omit<EditorOptions, 'el'> & EventMapping;

// // export default function TuiEditor(props: TuiEditorProps) {
// //     const editorRootRef = useRef<HTMLDivElement>(null);
// //     const editorRef = useRef<ToastuiEditor | null>(null);

// //     // (1) 처음 렌더링 시 Editor 생성 및 axios를 이용한 이미지 업로드 훅 적용
// //     useEffect(() => {
// //         if (!editorRootRef.current) return;
// //         // props에서 onChange를 분리하여, editorOptions에는 이벤트 핸들러가 포함되지 않도록 함
// //         const { onChange, ...editorOptions } = props;

// //         editorRef.current = new ToastuiEditor({
// //             ...editorOptions,
// //             el: editorRootRef.current,
// //             usageStatistics: false,
// //             events: {},
// //             hooks: {
// //                 addImageBlobHook: async (blob : Blob) => {
// //                     // 1) 서버에 업로드
// //                     const formData = new FormData();
// //                     formData.append('file', new File([blob], 'upload.jpg', { type: blob.type }));
// //                     try {
// //                         const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/image`, formData, {
// //                             withCredentials: true,
// //                         });
// //                         const url = res.data.imageUrl;

// //                         // 2) 기본 삽입 무시
// //                         //    false를 리턴하면 callback 기반 삽입이 취소됩니다.
// //                         //    (Toast UI Editor 내부 로직이 callback 호출 후
// //                         //    리턴값을 보고 디폴트 동작을 취소해요.)
// //                         // 3) 직접 HTML 태그 삽입
// //                         editorRef.current?.insertText(
// //                             `<img src="${url}" alt="업로드 이미지" style="max-width:100%;" />`
// //                         );
// //                         return false;
// //                     } catch (err) {
// //                         console.error('Image upload failed', err);
// //                         // 실패 시엔 기본 콜백으로 삽입해도 되고, 에러 메시지만 띄워도 돼요.
// //                         return true;
// //                     }
// //                 },
// //             },
// //         });

// //         // 별도로 onChange 이벤트 바인딩: 에디터 내용 변경 시 onChange 콜백 호출
// //         if (onChange && editorRef.current) {
// //             editorRef.current.on('change', () => {
// //                 const content = editorRef.current!.getMarkdown();
// //                 onChange(content);
// //             });
// //         }
// //     }, []);

// //     // (2) props가 변경될 때마다, 필요한 옵션/이벤트를 다시 바인딩
// //     useEffect(() => {
// //         if (!editorRef.current) return;
// //         const instance = editorRef.current;

// //         if (props.height) {
// //             instance.setHeight(props.height);
// //         }
// //         if (props.previewStyle) {
// //             instance.changePreviewStyle(props.previewStyle);
// //         }
// //         bindEventHandlers(instance, props);
// //     }, [props]);

// //     return <div ref={editorRootRef} />;
// // }

// // /** props에서 onChange, onFocus 등으로 들어온 이벤트를 추출 */
// // function getBindingEventNames(props: TuiEditorProps) {
// //     return Object.keys(props).filter((key) => key.startsWith('on'));
// // }

// // /** 에디터 이벤트를 바인딩 (특히 onChange의 경우, 에디터 내용을 전달) */
// // function bindEventHandlers(editor: ToastuiEditor, props: TuiEditorProps) {
// //     getBindingEventNames(props).forEach((key) => {
// //         const eventName = key[2].toLowerCase() + key.slice(3); // 예: onChange -> change
// //         editor.off(eventName);
// //         if (key === 'onChange' && typeof props.onChange === 'function') {
// //             editor.on(eventName, () => {
// //                 const content = editor.getMarkdown();
// //                 if (props.onChange) {
// //                     props.onChange(content);
// //                 }
// //             });
// //         } else {
// //             const handler = props[key as keyof TuiEditorProps];
// //             if (typeof handler === 'function') {
// //                 editor.on(eventName, handler as (...args: unknown[]) => void);
// //             }
// //         }
// //     });
// // }
