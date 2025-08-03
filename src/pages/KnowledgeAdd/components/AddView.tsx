import { EditorContainer, Main } from '../../../style/GlobalStyle';
import TuiEditor from './TuiEditor';
import { TitleInput, SubmitButton, Counter } from '../styles';
import Spinner from '../../../components/Loading/Spinner';

// AddView에서 사용할 props의 타입 정의
export interface AddViewProps {
    title: string;
    handleTitleChange: (e: string) => void;
    handleEditorChange: (newContent: string) => void;
    handleSubmit: () => void;
    isLoading: boolean;
    charCount: number;
    charLimit: number;
}

export default function AddView({
    title,
    handleTitleChange,
    handleEditorChange,
    handleSubmit,
    isLoading,
    charCount,
    charLimit,
}: AddViewProps) {
    const exceeded = charCount > charLimit;
    return (
        <>
            {isLoading && <Spinner />}
            <Main>
                <EditorContainer>
                    <TitleInput
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="제목을 입력하세요"
                        maxLength={40}
                    />
                    <TuiEditor
                        initialValue="지식을 입력해주세요!"
                        previewStyle="vertical" // "vertical" | "tab"
                        initialEditType="markdown" // "markdown" | "wysiwyg"
                        height="400px"
                        onChange={handleEditorChange}
                    />
                    <Counter $exceeded={exceeded}>
                        {charCount}/{charLimit}
                    </Counter>
                    <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
                </EditorContainer>
            </Main>
        </>
    );
}
