import MonacoEditor from "react-monaco-editor";
import React from "react";

const TypescriptPlaceholder = `// This is where you can paste in your TypeScript interfaces

interface User {
  name: string
  age: number
}
`;

const Editor = () => {
  return (
    <div className="flex flex-1 overflow-scroll">
      <MonacoEditor
        width="100%"
        height="100%"
        language="typescript"
        theme="vs-light"
        options={{
          fontSize: 18
        }}
        value={TypescriptPlaceholder}
      />
    </div>
  );
};

export default Editor;
