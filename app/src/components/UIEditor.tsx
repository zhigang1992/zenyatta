// @ts-ignore
import IframeComm from "react-iframe-comm";
import React, { useCallback, useContext, useState } from "react";
import { StoreContext } from "../mobx/store";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import PublishButton from "./PublishButton";
import { useHistory } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";
import { observer } from "mobx-react";

const Form = observer(() => {
  const store = useContext(StoreContext);
  const onReceiveMessage = useCallback(
    ({ data }: MessageEvent) => {
      if (data.source === "editUIIFrame") {
        store.json = JSON.stringify(data.payload, null, 4);
      }
    },
    [store]
  );
  return (
    <IframeComm
      attributes={{
        src: "/react-form-render.html",
        width: "100%",
        height: "100%"
      }}
      postMessageData={JSON.stringify({
        json: store.json,
        schema: store.schema,
        uiSchema: store.formSettings
      })}
      handleReceiveMessage={onReceiveMessage}
    />
  );
});

const FormSettings = observer(() => {
  const store = useContext(StoreContext);
  return (
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
      value={store.formSettings}
      onChange={value => {
        store.formSettings = value;
      }}
      editorWillMount={editor => {
        editor.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true
        });
      }}
    />
  );
});
const UIEditor = () => {
  const history = useHistory();
  const store = useContext(StoreContext);
  const [showFormSettings, setShowFormSettings] = useState(false);

  return (
    <div className="flex flex-1 overflow-scroll">
      <Fill name={navigationBarItemSlot}>
        {showFormSettings && (
          <>
            <p className="text-red-600 font-semibold tracking-wide mr-4">
              *Danger: might break your form!
            </p>
            <a
              href="https://react-jsonschema-form.readthedocs.io/en/latest/form-customization/"
              target="_blank"
              className="nav-btn mr-3"
              style={{ lineHeight: "2.5em" }}
            >
              Documentations
            </a>
          </>
        )}
        <button
          className="nav-btn mr-3"
          onClick={async () => {
            try {
              if (showFormSettings) {
                await store.saveFormSettings();
              }
              setShowFormSettings(s => !s);
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          {showFormSettings ? "Save Settings" : "Advanced Settings"}
        </button>
        {!showFormSettings && (
          <>
            <button
              className="nav-btn mr-3"
              onClick={() => history.push("./editJson")}
            >
              Edit with JSON
            </button>
            <PublishButton />
          </>
        )}
      </Fill>
      {showFormSettings ? <FormSettings /> : <Form />}
    </div>
  );
};

export default UIEditor;
