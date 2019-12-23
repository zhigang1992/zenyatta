import React, { useContext, useRef, useState } from "react";
import Loader from "./Loader";
import { StoreContext } from "../mobx/store";
import "animate.css/animate.min.css";

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

const PublishedIcon = () => (
  <svg viewBox="0 0 294.156 294.156" width={80} height={80} className="mt-2">
    <g>
      <path
        d="M227.002,108.256c-2.755-41.751-37.6-74.878-80.036-74.878c-42.447,0-77.298,33.141-80.038,74.907
		C28.978,113.059,0,145.39,0,184.184c0,42.234,34.36,76.595,76.595,76.595h116.483c3.313,0,6-2.687,6-6s-2.687-6-6-6H76.595
		C40.977,248.778,12,219.801,12,184.184c0-34.275,26.833-62.568,61.087-64.411c3.184-0.171,5.678-2.803,5.678-5.991
		c0-0.119-0.003-0.236-0.01-0.355c0.09-37.536,30.654-68.049,68.211-68.049c37.563,0,68.132,30.518,68.211,68.063
		c-0.005,0.116-0.009,0.238-0.009,0.329c0,3.196,2.505,5.831,5.696,5.992c34.37,1.741,61.292,30.038,61.292,64.421
		c0,19.526-8.698,37.801-23.864,50.138c-2.571,2.091-2.959,5.87-0.868,8.44c2.091,2.571,5.87,2.959,8.44,0.868
		c17.98-14.626,28.292-36.293,28.292-59.447C294.156,145.269,265.08,112.926,227.002,108.256z"
      />
      <path d="M140.966,141.078v76.511c0,3.313,2.687,6,6,6s6-2.687,6-6v-76.511c0-3.313-2.687-6-6-6S140.966,137.765,140.966,141.078z" />
      <path
        d="M181.283,152.204c1.536,0,3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485l-34.317-34.317
		c-2.343-2.343-6.143-2.343-8.485,0l-34.317,34.317c-2.343,2.343-2.343,6.142,0,8.485c2.343,2.343,6.143,2.343,8.485,0
		l30.074-30.074l30.074,30.074C178.212,151.618,179.748,152.204,181.283,152.204z"
      />
    </g>
  </svg>
);

const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const store = useContext(StoreContext);
  const [publishedKey, setPublishedKey] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <button
        className="nav-btn"
        onClick={async () => {
          try {
            setLoading(true);
            store.verifyJSONData();
            setPublishedKey(await store.saveToCloud());
            setLoading(false);
          } catch (e) {
            alert(e.message);
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
              className="animated faster fadeIn fixed top-0 left-0 h-full w-full cursor-default"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              onClick={() => setPublishedKey(undefined)}
            />
            <div className="animated faster bounceInUp flex bg-white rounded-lg shadow-lg flex-col items-center py-4 px-10 z-10">
              <PublishedIcon />
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
    </>
  );
};

export default PublishButton;
