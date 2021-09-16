import React from 'react';
import Editor from '@monaco-editor/react';
import { useRecoilState } from 'recoil';
import { editorContentsState } from '../atom';

const EditorContainer = () => {
  const [editorContents, setEditorContents] =
    useRecoilState(editorContentsState);
  const handleEditorChange = (value) => {
    // console.log('type of editorContents: ', typeof JSON.parse(editorContents));
    setEditorContents(value);
  };

  return (
    <Editor
      height='50rem'
      width='100%'
      line={2}
      defaultLanguage='JSON'
      defaultValue={editorContents}
      onChange={handleEditorChange}
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};

export default EditorContainer;
