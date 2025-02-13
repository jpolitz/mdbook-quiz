import React from "react";
import Showdown, { ShowdownExtension } from "react-showdown";

import { snippetToHtml } from "./snippet";

let highlightExtension: ShowdownExtension = {
  type: "output",
  filter(text) {
    let parser = new DOMParser();
    let document = parser.parseFromString(text, "text/html");
    let snippets = document.querySelectorAll("pre > code");
    snippets.forEach(node => {
      let html = snippetToHtml(node.textContent!);
      let snippetDoc = parser.parseFromString(html, "text/html");
      let pre = node.parentNode as HTMLPreElement;
      pre.replaceWith(snippetDoc.body.firstChild!);
    });
    return document.body.innerHTML;
  },
};

export let MarkdownView: React.FC<{ markdown: string }> = ({ markdown }) => (
  <Showdown markdown={markdown} extensions={[highlightExtension]} />
);
