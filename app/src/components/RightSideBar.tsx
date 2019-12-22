import React, { useContext, useState } from "react";
import Loader from "./Loader";
import { StoreContext } from "../mobx/store";
import { observer } from "mobx-react";

const RightSideBar = () => {
  const store = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-shrink-0 flex-col w-40 ml-5 pt-5">
      <button
        className="bg-blue-500 h-10 rounded font-bold text-white"
        disabled={loading}
        onClick={async () => {
          try {
            setLoading(true);
            const response = await fetch("/api/identifiers", {
              method: "POST",
              body: store.typescript
            });
            const result: string[] = await response.json();
            if (result.length === 1) {
              const schema = await fetch("/api/schema", {
                method: "POST",
                body: store.typescript,
                headers: {
                  SchemaRootType: result[0]
                }
              });
              alert(JSON.stringify(await schema.json()));
            }
          } catch (e) {
            alert(e.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        Generate Schema
      </button>
      {loading && <Loader />}
    </div>
  );
};

export default observer(RightSideBar);
