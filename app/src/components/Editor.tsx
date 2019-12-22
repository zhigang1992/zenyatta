import MonacoEditor from "react-monaco-editor";
import React, { useContext } from "react";
import { StoreContext } from "../mobx/store";
import { observer } from "mobx-react";

const Editor = () => {
  const store = useContext(StoreContext);
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
        value={store.typescript}
        onChange={value => {
          store.typescript = value;
        }}
      />
    </div>
  );
};

export default observer(Editor);
