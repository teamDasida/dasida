import  { useEffect, useRef } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export type TuiViewerProps = {
  initialValue: string;
  // 필요한 다른 옵션들 추가 가능
};

export default function TuiViewer(props: TuiViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Viewer 인스턴스를 생성하여 읽기 전용으로 렌더링
    new Viewer({
      el: viewerRef.current,
      initialValue: props.initialValue,
      // 필요한 옵션들을 추가할 수 있습니다.
    });
  }, [props.initialValue]);

  return <div ref={viewerRef} />;
}
