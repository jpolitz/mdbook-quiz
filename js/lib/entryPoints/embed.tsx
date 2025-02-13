import React from "react";
import * as ReactDOM from "react-dom/client";
import * as uuid from "uuid";

import "../../css/index.scss";
import { Quiz, QuizView } from "../components/quiz";

const USER_KEY = "__mdbook_quiz_user";
if (localStorage.getItem(USER_KEY) === null) {
  localStorage.setItem(USER_KEY, uuid.v4());
}
const userId = localStorage.getItem(USER_KEY)!;

document.querySelectorAll(".quiz-placeholder").forEach(el => {
  let divEl = el as HTMLDivElement;
  let name = divEl.dataset.quizName!;
  let quiz: Quiz = JSON.parse(divEl.dataset.quizQuestions!);
  let root = ReactDOM.createRoot(el);
  let logEndpoint = divEl.dataset.quizLogEndpoint;
  let fullscreen = divEl.dataset.quizFullscreen !== undefined;
  root.render(
    <QuizView
      name={name}
      quiz={quiz}
      user={userId}
      logEndpoint={logEndpoint}
      fullscreen={fullscreen}
    />
  );
});
