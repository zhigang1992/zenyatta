import React from "react";
import { useParams } from "react-router-dom";
import { TypeScriptEditor } from "./TypeScriptEditor";
import SchemaEditor from "./SchemaEditor";
import JsonEditor from "./JsonEditor";

export default () => {
  const { startWith } = useParams<{ startWith: string }>();
  switch (startWith) {
    case "typescript":
      return <TypeScriptEditor />;
    case "jsonSchema":
      return <SchemaEditor />;
    case "editJson":
      return <JsonEditor />;
    default:
      return <div>Not Implemented</div>;
  }
};
