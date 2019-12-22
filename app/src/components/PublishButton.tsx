import React, { useContext, useRef, useState } from "react";
import Loader from "./Loader";
import { StoreContext } from "../mobx/store";

const Link = (props: { label: string; value: string }) => {
  const input = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="self-end">
      <label className="inline font-medium" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        ref={input}
        readOnly={true}
        name={props.label}
        type="text"
        value={props.value}
        className="w-64 m-3 px-2 py-1 rounded border-gray-400 border text-gray-700 text-sm"
      />
      <button
        className="bg-gray-800 text-white px-3 py-1 rounded font-medium focus:outline-none w-20"
        onClick={() => {
          input.current?.select();
          document.execCommand("copy");
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const store = useContext(StoreContext);
  const [publishedKey, setPublishedKey] = useState<string>();
  return (
    <div className="relative">
      <button
        className="nav-btn"
        onClick={async () => {
          try {
            setLoading(true);
            setPublishedKey(await store.saveToCloud());
            setLoading(false);
          } catch (e) {
            setLoading(false);
          }
        }}
      >
        {loading ? <Loader /> : <span>Publish</span>}
      </button>

      {publishedKey != null && (
        <>
          <div className="fixed flex items-center justify-center top-0 left-0 h-full w-full z-10">
            <button
              className="fixed top-0 left-0 h-full w-full cursor-default bg-black opacity-25"
              onClick={() => setPublishedKey(undefined)}
            />
            <div className="flex bg-white rounded-lg shadow-lg flex-col items-center py-4 px-10 z-10">
              <img
                src={require("../assets/cloud.svg")}
                alt="Success"
                width={80}
                className="mt-2"
              />
              <p className="text-xl font-medium mb-4">Published!</p>
              <Link
                label="Editor Link"
                value={`${window.location.protocol}//${window.location.host}${store.editorLink}`}
              />
              <Link
                label="JSON API Link"
                value={`${window.location.protocol}//${
                  window.location.host
                }${store.jsonAPILink(publishedKey)}`}
              />
              <p className="text-sm text-gray-700 mt-5 mb-3 font-medium">
                Please keep these links yourself!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PublishButton;
