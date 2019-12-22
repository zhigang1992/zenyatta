import React from "react";
import { useParams } from "react-router-dom";
import { TypeScriptEditor } from "./TypeScriptEditor";
import SchemaEditor from "./SchemaEditor";
import JsonEditor from "./JsonEditor";
import UIEditor from "./UIEditor";

export default () => {
  const { startWith } = useParams<{ startWith: string }>();
  switch (startWith) {
    case "typescript":
      return <TypeScriptEditor />;
    case "jsonSchema":
      return <SchemaEditor />;
    case "editJson":
      return <JsonEditor />;
    case "editUI":
      return <UIEditor />;
    default:
      return <div>Not Implemented</div>;
  }
};
