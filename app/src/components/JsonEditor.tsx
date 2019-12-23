import { useHistory } from "react-router-dom";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../mobx/store";
import MonacoEditor from "react-monaco-editor";
import PublishButton from "./PublishButton";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";

const JsonEditor = observer(() => {
  const store = useContext(StoreContext);
  const history = useHistory();
  const ref = useRef<typeof monacoEditor>();
  const updateSchema = useCallback(() => {
    if (ref.current == null) {
      return;
    }
    const schema = JSON.parse(store.schema);
    ref.current.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: schema["$schema"],
          fileMatch: ["*"],
          schema: schema
        }
      ]
    });
  }, [store.schema, ref]);
  useEffect(() => {
    updateSchema();
  }, [updateSchema]);
  return (
    <div className="flex flex-1 overflow-scroll">
      <Fill name={navigationBarItemSlot}>
        <button
          className="nav-btn mr-3"
          onClick={() => {
            history.push("./editUI");
          }}
        >
          Edit with UI
        </button>
        <PublishButton />
      </Fill>
      <MonacoEditor
        width="100%"
        height="100%"
        language="json"
        theme="vs-light"
        options={{
          fontSize: 16,
          autoIndent: "brackets",
          formatOnType: true,
          formatOnPaste: true
        }}
        value={store.json}
        editorDidMount={(_, editor) => {
          ref.current = editor;
          updateSchema();
        }}
        onChange={value => {
          store.json = value;
        }}
      />
    </div>
  );
});

export default JsonEditor;
