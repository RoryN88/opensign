import React, { useState } from "react";
import Parse from "parse";
import ReactDOM from "react-dom/client";
import PdfRequestFiles from "../pages/PdfRequestFiles";
import { pdfjs } from "react-pdf";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../index.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// Wrapper component to manage props
const PublicScriptFileWrapper = ({ initialProps }) => {
  const [props, setProps] = useState(initialProps);

  // Make the setProps function globally accessible
  window.updatePublicTemplateProps = setProps;

  return <PdfRequestFiles {...props} />;
};

const appId = process.env.REACT_APP_APPID
  ? process.env.REACT_APP_APPID
  : "opensign";
const serverUrl = process.env.REACT_APP_SERVERURL
  ? process.env.REACT_APP_SERVERURL
  : window.location.origin + "/api/app";
localStorage.setItem("baseUrl", `${serverUrl}/`);
localStorage.setItem("parseAppId", appId);
Parse.initialize(appId);
Parse.serverURL = serverUrl;
// Create a new div element and append it to the body
const scriptComponent = document.createElement("div");
scriptComponent.id = "script-component";
document.body.appendChild(scriptComponent);
const link = document.createElement("link");
link.href = `${process.env.PUBLIC_URL}/css/fonts.css`;
link.rel = "stylesheet";
document.head.appendChild(link);

// Create a root and render the wrapper component with initial props
const root = ReactDOM.createRoot(document.getElementById("script-component"));
root.render(
  <div>
    <Provider store={store}>
      <PublicScriptFileWrapper initialProps={{ text: "templateId" }} />
    </Provider>
  </div>
);
