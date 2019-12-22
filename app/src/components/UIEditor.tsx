// @ts-ignore
import IframeComm from "react-iframe-comm";
import React, { useCallback, useContext } from "react";
import { StoreContext } from "../mobx/store";
import { Fill } from "react-slot-fill";
import { navigationBarItemSlot } from "./NavigationBar";
import PublishButton from "./PublishButton";

const UIEditor = () => {
  const store = useContext(StoreContext);

  const onReceiveMessage = useCallback(
    ({ data }: MessageEvent) => {
      if (data.source === "editUIIFrame") {
        store.json = JSON.stringify(data.payload, null, 4);
      }
    },
    [store]
  );

  return (
    <div className="flex flex-1 overflow-scroll">
      <Fill name={navigationBarItemSlot}>
        <button className="nav-btn mr-3">Edit with JSON</button>
        <PublishButton />
      </Fill>
      <IframeComm
        attributes={{
          src: "/react-form-render.html",
          width: "100%",
          height: "100%"
        }}
        postMessageData={JSON.stringify({
          json: store.json,
          schema: store.schema
        })}
        handleReceiveMessage={onReceiveMessage}
      />
    </div>
  );
};

export default UIEditor;
