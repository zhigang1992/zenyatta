import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { StoreContext } from "../mobx/store";

const Section = (props: { title: string }) => (
  <h5
    {...props}
    className="mb-3 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs"
  >
    {props.title}
  </h5>
);

const Item = (props: { active: boolean; title: string; to: string }) => {
  return (
    <Link
      to={props.to}
      className={`flex mb-3 rounded hover:bg-gray-200
       h-10 cursor-pointer items-center p-3 -ml-3 
       hover:text-gray-900 text-gray-600 font-medium
       ${props.active && "bg-gray-200"}
       `}
    >
      {props.title}
    </Link>
  );
};

const LeftSideBar = () => {
  const store = useContext(StoreContext);
  const { startWith } = useParams<{ startWith: string }>();
  return (
    <div className="flex flex-shrink-0 w-48 flex-col py-5">
      <Section title="Get Started with" />
      <Item
        title="TypeScript"
        to="./typescript"
        active={startWith === "typescript"}
      />
      <Item
        title="JSON Schema"
        to="./jsonSchema"
        active={startWith === "jsonSchema"}
      />
      {store.startedEditingData && (
        <div className="mt-8">
          <Section title="Edit Data" />
          <Item
            title="Edit JSON"
            to="./editJson"
            active={startWith === "editJson"}
          />
          <Item
            title="Edit with UI"
            to="./editUI"
            active={startWith === "editUI"}
          />
        </div>
      )}
    </div>
  );
};

export default observer(LeftSideBar);
