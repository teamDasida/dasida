/**
 * Toast UI Editor 타입 재노출 shim
 *
 * @see https://github.com/nhn/tui.editor/issues/2375 (exports 필드 문제)
 */
declare module '@toast-ui/editor' {
  export * from '@toast-ui/editor/types/index';
  import Editor from '@toast-ui/editor/types/index';
  export default Editor;
}
