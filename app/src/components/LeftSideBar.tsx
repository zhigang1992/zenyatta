import React from "react";
import { Link, useParams } from "react-router-dom";

const Section = (props: any) => (
  <h5
    {...props}
    className="mb-3 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs"
  />
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
  const { startWith } = useParams<{ startWith: string }>();
  return (
    <div className="flex flex-shrink-0 w-48 flex-col py-5">
      <Section>Get Started with</Section>
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
      <div className="mt-8 opacity-50">
        <Section>Edit Data</Section>
        <Item
          title="Edit JSON"
          to="./typescript"
          active={startWith === "editjson"}
        />
        <Item
          title="Edit with UI"
          to="./jsonSchema"
          active={startWith === "editui"}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
