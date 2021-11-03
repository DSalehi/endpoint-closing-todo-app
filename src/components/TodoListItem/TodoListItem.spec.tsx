import { render, fireEvent } from "@testing-library/react";
import TodoListItem from "./TodoListItem";
import sampleData from "../../constants/sampleData";

describe("TodoList.tsx", () => {
  beforeEach(() => {
    process.env.REACT_APP_MOCK_ENDPOINT_URL = "testEndpoint";
    process.env.REACT_APP_MOCK_ENDPOINT_API_KEY = "testApiKey";
  });

  it("should have a description", async () => {
    const { findByText } = render(
      <TodoListItem {...sampleData[0]} setTodo={() => {}} />
    );
    expect(await findByText("File 2020 Taxes (MOCKED)")).toBeInTheDocument();
  });

  it("should be checked initially", async () => {
    const { getByTestId } = render(
      <TodoListItem {...sampleData[0]} setTodo={() => {}} />
    );
    const checkboxElem = getByTestId("checkbox-1").querySelector(
      'input[type="checkbox"]'
    );
    expect(checkboxElem).toHaveProperty("checked", true);
  });
});
