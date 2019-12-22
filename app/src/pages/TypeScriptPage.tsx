import React from "react";
import MonacoEditor from "react-monaco-editor";

const TypeScriptPage = () => {
  return (
    <MonacoEditor
      width="100%"
      height="100vh"
      language="typescript"
      theme="vs-light"
      options={{
        fontSize: 18
      }}
      value=""
    />
  );
};

export default TypeScriptPage;
