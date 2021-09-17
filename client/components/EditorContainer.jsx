import React from 'react';
import Editor from '@monaco-editor/react';

const EditorContainer = ({ editorContents, handleChange }) => {
  return (
    <Editor
      id='editorContents'
      height='40rem'
      width='100%'
      line={2}
      defaultLanguage='JSON'
      defaultValue={editorContents}
      onChange={handleChange}
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};

export default EditorContainer;
