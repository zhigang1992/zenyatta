import { useHistory } from "react-router-dom";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../mobx/store";
import MonacoEditor from "react-monaco-editor";
import { captureException } from "@sentry/browser";

const ActionButton = () => {
  const history = useHistory();
  const store = useContext(StoreContext);
  return (
    <Fill name={navigationBarItemSlot}>
      <button
        className="nav-btn"
        onClick={() => {
          store.startedEditing().catch(e => {
            alert(e.message);
            captureException(e);
          });
          history.push("./editJson");
        }}
      >
        Start editing data
      </button>
    </Fill>
  );
};

const SchemaEditor = observer(() => {
  const store = useContext(StoreContext);
  return (
    <div className="flex flex-1 overflow-scroll">
      <ActionButton />
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
        value={store.schema}
        onChange={value => {
          store.schema = value;
        }}
        editorWillMount={editor => {
          editor.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true
          });
        }}
      />
    </div>
  );
});

export default SchemaEditor;
