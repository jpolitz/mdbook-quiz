/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";

import { QuestionView } from "../lib/questions/mod";
import { Tracing } from "../lib/questions/tracing";

describe("Tracing", () => {
  let question: Tracing = {
    type: "Tracing",
    prompt: { program: "fn main(){}" },
    answer: { doesCompile: true, stdout: "Yes" },
  };

  let submitted: any | null = null;
  beforeEach(async () => {
    submitted = null;
    render(
      <QuestionView
        question={question}
        index={1}
        onSubmit={answer => {
          submitted = answer;
        }}
      />
    );
    await waitFor(() => screen.getByText("Question 1"));
  });

  it("initially renders", () => {});

  let getCheckbox = () =>
    screen.getByRole("radio", {
      name: "DOES compile",
    });

  it("validates input", async () => {
    let submit = screen.getByRole("button");
    await user.click(submit);
    expect(submitted).toBe(null);

    let checkbox = getCheckbox();
    await user.click(checkbox);
    await user.click(submit);
    expect(submitted).toBe(null);
  });

  it("accepts valid input", async () => {
    let submit = screen.getByRole("button");
    let checkbox = getCheckbox();
    await user.click(checkbox);

    let input = screen.getByRole("textbox");
    await user.type(input, "foobar");
    await user.click(submit);

    expect(submitted).toStrictEqual({ doesCompile: true, stdout: "foobar" });
  });
});
