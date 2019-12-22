import React from "react";
import NavigationBar from "../components/NavigationBar";
import Editor from "../components/Editor";
import LeftSideBar from "../components/LeftSideBar";
import { Store, StoreContext } from "../mobx/store";

const EditPage = () => {
  return (
    <StoreContext.Provider value={new Store()}>
      <div className="h-screen flex flex-col">
        <NavigationBar />
        <div className="flex container mx-auto flex-1">
          <LeftSideBar />
          <Editor />
        </div>
      </div>
    </StoreContext.Provider>
  );
};

export default EditPage;
