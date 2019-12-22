import React, { useEffect, useRef } from "react";
import NavigationBar from "../components/NavigationBar";
import Editor from "../components/Editor";
import LeftSideBar from "../components/LeftSideBar";
import { Store, StoreContext } from "../mobx/store";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { editorHash } = useParams<{ editorHash: string }>();
  const store = useRef(new Store(editorHash)).current;
  useEffect(() => {
    store.restoreIfExist().catch();
  }, [store]);
  return (
    <StoreContext.Provider value={store}>
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
