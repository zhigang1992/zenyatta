import { observer } from "mobx-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../mobx/store";
import MonacoEditor from "react-monaco-editor";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";

const RightSideBar = () => {
  const store = useContext(StoreContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const getIds = useCallback(async (): Promise<string[]> => {
    const response = await fetch("/api/identifiers", {
      method: "POST",
      body: store.typescript
    });
    return await response.json();
  }, [store]);
  const generateSchema = useCallback(
    async (root: string) => {
      const schema = await fetch("/api/schema", {
        method: "POST",
        body: store.typescript,
        headers: {
          SchemaRootType: root
        }
      });
      store.schema = JSON.stringify(await schema.json(), null, 2);
      history.push("./jsonSchema");
    },
    [store, history]
  );
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
        {loading ? (
          <Loader />
        ) : (
          <button
            className="bg-gray-800 h-10 rounded font-bold text-white px-6 focus:outline-none"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const result = await getIds();
                if (result.length === 0) {
                  alert("You need to export at least one type");
                  return;
                }
                if (result.length === 1) {
                  await generateSchema(result[0]);
                } else {
                  setSelections(result);
                }
              } catch (e) {
                alert(e.message);
                setLoading(false);
              }
            }}
          >
            Generate Schema
          </button>
        )}
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
                <a
                  onClick={async () => {
                    try {
                      setSelections([]);
                      await generateSchema(selection);
                    } catch (e) {
                      alert(e.message);
                      setLoading(false);
                    }
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white"
                >
                  {selection}
                </a>
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
            fontSize: 18
          }}
          value={store.typescript}
          onChange={value => {
            store.typescript = value;
          }}
        />
      </div>
      <RightSideBar />
    </>
  );
});
