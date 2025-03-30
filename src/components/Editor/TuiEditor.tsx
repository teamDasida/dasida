import { useEffect, useRef } from 'react';
import axios from 'axios';
import ToastuiEditor, { EditorOptions, EventMap } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

/**
 * TUI Editor에서 사용할 이벤트 타입 정의
 * onChange의 경우 에디터 내용을 인자로 받습니다.
 */
interface EventMapping {
    onLoad?: EventMap['load'];
    onChange?: (content: string) => void;
    onCaretChange?: EventMap['caretChange'];
    onFocus?: EventMap['focus'];
    onBlur?: EventMap['blur'];
    onKeydown?: EventMap['keydown'];
    onKeyup?: EventMap['keyup'];
    onBeforePreviewRender?: EventMap['beforePreviewRender'];
    onBeforeConvertWysiwygToMarkdown?: EventMap['beforeConvertWysiwygToMarkdown'];
}

/**
 * TuiEditorProps:
 * - Toast UI Editor의 EditorOptions에서 el(마운트 대상)만 제외
 * - 추가된 이벤트 타입을 포함
 */
export type TuiEditorProps = Omit<EditorOptions, 'el'> & EventMapping;

export default function TuiEditor(props: TuiEditorProps) {
    const editorRootRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<ToastuiEditor | null>(null);

    // (1) 처음 렌더링 시 Editor 생성 및 axios를 이용한 이미지 업로드 훅 적용
    useEffect(() => {
        if (!editorRootRef.current) return;
        // props에서 onChange를 분리하여, editorOptions에는 이벤트 핸들러가 포함되지 않도록 함
        const { onChange, ...editorOptions } = props;

        editorRef.current = new ToastuiEditor({
            ...editorOptions,
            el: editorRootRef.current,
            usageStatistics: false,
            events: {},
            hooks: {
                addImageBlobHook: async (blob: Blob, callback: (url: string, altText: string) => void) => {
                    const formData = new FormData();
                    const file = new File([blob], 'upload-image.jpg', { type: blob.type });
                    formData.append('file', file);
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/image`, formData, {
                            withCredentials: true,
                        });
                        console.log(response.data);
                        callback(response.data.imageUrl, '');
                    } catch (error) {
                        console.error('Image upload failed', error);
                    }
                },
            },
        });

        // 별도로 onChange 이벤트 바인딩: 에디터 내용 변경 시 onChange 콜백 호출
        if (onChange && editorRef.current) {
            editorRef.current.on('change', () => {
                const content = editorRef.current!.getMarkdown();
                onChange(content);
            });
        }
    }, []);

    // (2) props가 변경될 때마다, 필요한 옵션/이벤트를 다시 바인딩
    useEffect(() => {
        if (!editorRef.current) return;
        const instance = editorRef.current;

        if (props.height) {
            instance.setHeight(props.height);
        }
        if (props.previewStyle) {
            instance.changePreviewStyle(props.previewStyle);
        }
        bindEventHandlers(instance, props);
    }, [props]);

    return <div ref={editorRootRef} />;
}

/** props에서 onChange, onFocus 등으로 들어온 이벤트를 추출 */
function getBindingEventNames(props: TuiEditorProps) {
    return Object.keys(props).filter((key) => key.startsWith('on'));
}

/** 에디터 이벤트를 바인딩 (특히 onChange의 경우, 에디터 내용을 전달) */
function bindEventHandlers(editor: ToastuiEditor, props: TuiEditorProps) {
    getBindingEventNames(props).forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3); // 예: onChange -> change
        editor.off(eventName);
        if (key === 'onChange' && typeof props.onChange === 'function') {
            editor.on(eventName, () => {
                const content = editor.getMarkdown();
                if (props.onChange) {
                    props.onChange(content);
                }
            });
        } else {
            const handler = props[key as keyof TuiEditorProps];
            if (typeof handler === 'function') {
                editor.on(eventName, handler as (...args: unknown[]) => void);
            }
        }
    });
}
