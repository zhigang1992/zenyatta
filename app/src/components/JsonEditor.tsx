import { useHistory } from "react-router-dom";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../mobx/store";
import MonacoEditor from "react-monaco-editor";
import PublishButton from "./PublishButton";

const JsonEditor = observer(() => {
  const store = useContext(StoreContext);
  const history = useHistory();
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
        editorWillMount={editor => {
          const schema = JSON.parse(store.schema);
          editor.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
              {
                uri: schema["$schema"],
                fileMatch: ["*"],
                schema: schema
              }
            ]
          });
        }}
        onChange={value => {
          store.json = value;
        }}
      />
    </div>
  );
});

export default JsonEditor;
