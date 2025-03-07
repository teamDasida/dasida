import React from 'react';
import UserHeader from '../../components/Header/UserHeader';
import { EditorContainer, MainContainer } from '../../style/GlobalStyle';
import { ViewerContainer, Title } from './styles';
import TuiViewer from '../../components/TuiViewer/TuiViewer';

export default function EditorView() {
    // 예시 데이터: 실제로는 서버나 전역 상태에서 데이터를 받아올 수 있습니다.
    const titleText = '게시글 제목 예시';
    const markdownContent = String.raw`
![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Awesome Editor!

It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use \`getHtml()\` and \`getMarkdown()\` of the [Editor](https://github.com/nhn/tui.editor).

\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | \`HTMLElement\` | container element |

## Features

* CommonMark + GFM Specifications
   * Live Preview
   * Scroll Sync
   * Auto Indent
   * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Ember
`;

    return (
        <>
            <UserHeader />
            <MainContainer>
                <EditorContainer>
                    <ViewerContainer>
                        <Title>{titleText}</Title>
                        <TuiViewer initialValue={markdownContent} />
                    </ViewerContainer>
                </EditorContainer>
            </MainContainer>
        </>
    );
}
