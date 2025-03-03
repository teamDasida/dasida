// components/TuiEditor.tsx
import React, { useEffect, useRef } from 'react';
import ToastuiEditor, { EditorOptions, EventMap } from '@toast-ui/editor';
// 에디터용 CSS
import '@toast-ui/editor/dist/toastui-editor.css';

/**
 * TUI Editor에서 사용할 이벤트 타입 정의
 * 필요에 따라 onChange, onFocus 등 원하는 이벤트만 남겨도 됩니다.
 */
interface EventMapping {
  onLoad?: EventMap['load'];
  onChange?: EventMap['change'];
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
 * - 위에서 정의한 이벤트를 추가
 */
export type TuiEditorProps = Omit<EditorOptions, 'el'> & EventMapping;

export default function TuiEditor(props: TuiEditorProps) {
  const editorRootRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ToastuiEditor | null>(null);

  // (1) 처음 렌더링 시 Editor 생성
  useEffect(() => {
    if (!editorRootRef.current) return;

    editorRef.current = new ToastuiEditor({
      ...props,
      el: editorRootRef.current,
      usageStatistics: false, // 통계 수집 여부 (원하는 대로)
      events: getInitialEvents(props),
    });
  }, []);

  // (2) props가 변경될 때마다, 필요한 옵션/이벤트를 다시 바인딩
  useEffect(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current;

    // 에디터 높이 변경
    if (props.height) {
      instance.setHeight(props.height);
    }
    // 미리보기 스타일 변경 (vertical / tab)
    if (props.previewStyle) {
      instance.changePreviewStyle(props.previewStyle);
    }
    // 이벤트 다시 바인딩
    bindEventHandlers(instance, props);
  }, [props]);

  return <div ref={editorRootRef} />;
}

/** props에서 onChange, onFocus 등으로 들어온 이벤트를 추출 */
function getBindingEventNames(props: TuiEditorProps) {
  return Object.keys(props).filter((key) => key.startsWith('on'));
}

/** 에디터 생성 시점에 등록할 이벤트 */
function getInitialEvents(props: TuiEditorProps) {
  const events: Record<string, any> = {};
  getBindingEventNames(props).forEach((key) => {
    const eventName = key[2].toLowerCase() + key.slice(3); // onChange -> change
    events[eventName] = (props as any)[key];
  });
  return events;
}

/** props 변경 시, 기존 이벤트 off 후 새 이벤트 on */
function bindEventHandlers(editor: ToastuiEditor, props: TuiEditorProps) {
  getBindingEventNames(props).forEach((key) => {
    const eventName = key[2].toLowerCase() + key.slice(3); // onFocus -> focus
    editor.off(eventName);
    editor.on(eventName, (props as any)[key]);
  });
}
