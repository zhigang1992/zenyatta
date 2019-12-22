import React from "react";
import MonacoEditor from "react-monaco-editor";
import NavigationBar from "../components/NavigationBar";
import Editor from "../components/Editor";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

const TypeScriptPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />
      <div className="flex container mx-auto flex-1">
        <LeftSideBar />
        <Editor />
        <RightSideBar />
      </div>
    </div>
  );
};

export default TypeScriptPage;
