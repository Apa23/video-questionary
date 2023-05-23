import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { VideoQuestionsApp } from "./VideoQuestionaryApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <VideoQuestionsApp />
    </React.StrictMode>
  </BrowserRouter>
);
