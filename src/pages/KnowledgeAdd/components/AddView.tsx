import { EditorContainer, Main } from '../../../style/GlobalStyle';
import TuiEditor from './TuiEditor';
import { TitleInput, SubmitButton } from '../styles';

// AddView에서 사용할 props의 타입 정의
export interface AddViewProps {
  title: string;
  handleTitleChange: (e: string) => void;
  handleEditorChange: (newContent: string) => void;
  handleSubmit: () => void;
}

export default function AddView({
  title,
  handleTitleChange,
  handleEditorChange,
  handleSubmit,
}: AddViewProps) {
  return (
    <>
      <Main>
        <EditorContainer>
        <TitleInput
          type="text"
          value={title}
            onChange={e=>handleTitleChange(e.target.value)}
            placeholder="타이틀을 입력하세요"
        />
          <TuiEditor
            initialValue="Hello Toast UI Editor!"
            previewStyle="vertical" // "vertical" | "tab"
            initialEditType="markdown" // "markdown" | "wysiwyg"
            height="400px"
            onChange={handleEditorChange}
          />
          <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
        </EditorContainer>
      </Main>
    </>
  );
}
