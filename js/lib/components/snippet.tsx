import React from "react";

let splitHljsOutput = (html: string): string[] => {
  let parser = new DOMParser();
  let dom = parser.parseFromString(html, "text/html");
  let lines: string[][] = [[]];
  let curLine = () => lines[lines.length - 1];
  dom.body.childNodes.forEach(child => {
    if (child.nodeType == Node.TEXT_NODE) {
      let content = child.textContent!;
      let childLines = content.split("\n");
      if (childLines.length > 1) {
        curLine().push(childLines[0]);

        childLines.slice(1, -1).forEach(childLine => {
          lines.push([childLine]);
        });

        lines.push([childLines[childLines.length - 1]]);
      } else {
        curLine().push(content);
      }
    } else {
      curLine().push((child as any).outerHTML);
    }
  });

  return lines.map(line => line.join(""));
};

export let snippetToHtml = (snippet: string): string => {
  let hljs = (window as any).hljs;
  snippet = snippet.trim(); // allow quiz authors to have leading/trailing whitespace
  let highlighted: string = hljs.highlight("rust", snippet).value;
  let lines = splitHljsOutput(highlighted);
  let wrapped = lines.map(line => `<code class="language-rust">${line}</code>`).join("\n");
  return `<pre>${wrapped}</pre>`;
};

export let Snippet: React.FC<{ snippet: string }> = ({ snippet }) => {
  let html = snippetToHtml(snippet);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
