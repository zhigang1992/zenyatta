import MonacoEditor from "react-monaco-editor";
import React, { useContext } from "react";
import { StoreContext } from "../mobx/store";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { TypeScriptEditor } from "./TypeScriptEditor";

export const SchemaEditor = observer(() => {
  const store = useContext(StoreContext);
  return (
    <div className="flex flex-1 overflow-scroll">
      <MonacoEditor
        width="100%"
        height="100%"
        language="json"
        theme="vs-light"
        options={{
          fontSize: 18
        }}
        value={store.schema}
        onChange={value => {
          store.schema = value;
        }}
      />
    </div>
  );
});

export default () => {
  const { startWith } = useParams<{ startWith: string }>();
  return startWith === "typescript" ? <TypeScriptEditor /> : <SchemaEditor />;
};
