import { observer } from "mobx-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../mobx/store";
import MonacoEditor from "react-monaco-editor";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import { captureException } from "@sentry/browser";

const ActionButton = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const dismiss = useCallback(() => {
    setSelections([]);
    setLoading(false);
  }, [setLoading, setSelections]);
  useEffect(() => {
    if (selections.length === 0) {
      return;
    }
    const handler = (e: any) => {
      if (e.key === "Esc" || e.key === "Escape") {
        dismiss();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [selections.length, dismiss]);
  return (
    <Fill name={navigationBarItemSlot}>
      <div className="relative">
        <button
          className="nav-btn"
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              const result = await store.getIdentifiers();
              if (result.length === 0) {
                alert("You need to export at least one type");
                return;
              }
              if (result.length === 1) {
                await store.generateSchema(result[0]);
                history.push("./jsonSchema");
              } else {
                setSelections(result);
              }
            } catch (e) {
              alert(e.message);
              setLoading(false);
              captureException(e);
            }
          }}
        >
          {loading ? <Loader /> : <span>Generate Schema</span>}
        </button>
        {selections.length > 0 && (
          <>
            <button
              className="fixed top-0 left-0 h-full w-full z-10 cursor-default"
              onClick={dismiss}
            />
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <p className="px-4 text-sm text-gray-600 pb-2">
                Select root type
              </p>
              {selections.map(selection => (
                <button
                  key={selection}
                  onClick={async e => {
                    e.preventDefault();
                    try {
                      setSelections([]);
                      await store.generateSchema(selection);
                      history.push("./jsonSchema");
                    } catch (e) {
                      alert(e.message);
                      setLoading(false);
                      captureException(e);
                    }
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none text-left w-full"
                >
                  {selection}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Fill>
  );
};

export const TypeScriptEditor = observer(() => {
  const store = useContext(StoreContext);
  return (
    <>
      <div className="flex flex-1 overflow-scroll">
        <MonacoEditor
          width="100%"
          height="100%"
          language="typescript"
          theme="vs-light"
          options={{
            autoIndent: "brackets",
            fontSize: 16,
            formatOnType: true,
            formatOnPaste: true
          }}
          value={store.typescript}
          onChange={value => {
            store.typescript = value;
          }}
        />
      </div>
      <ActionButton />
    </>
  );
});
