// pages/Editor.tsx (혹은 src/pages/Editor.tsx, 위치는 프로젝트 구조에 따라 조정)
import UserHeader from '../../components/Header/UserHeader';
import { MainContainer } from '../../style/GlobalStyle';

// 방금 만든 커스텀 래퍼
import TuiEditor from '../../components/TuiEditor/TuiEditor';

export default function Editor() {
  const handleEditorChange = () => {
    console.log('Editor content changed!');
  };

  return (
    <>
      <UserHeader />
      <MainContainer>
        <TuiEditor
          initialValue="Hello Toast UI Editor!"
          previewStyle="vertical"        // "vertical" | "tab"
          initialEditType="markdown"     // "markdown" | "wysiwyg"
          height="600px"
          onChange={handleEditorChange}  // 내용 변경될 때 콜백
        />
      </MainContainer>
    </>
  );
}
