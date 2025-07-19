/**
 * Toast UI Editor 타입 shim
 * 루트 모듈(@toast-ui/editor)이 exports 필드 때문에
 * 타입을 못 찾는 문제를 우회합니다.
 */
declare module '@toast-ui/editor' {
  import Editor from '@toast-ui/editor/types/index';
  export default Editor;

  // 필요한 타입만 재노출
  export type EditorOptions = import('@toast-ui/editor/types/index').EditorOptions;
  export type EventMap     = import('@toast-ui/editor/types/index').EventMap;
}
