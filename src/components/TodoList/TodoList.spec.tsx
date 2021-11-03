import { render } from "@testing-library/react";
import TodoList from "./TodoList";
import sampleData from "../../constants/sampleData";

describe("TodoList.tsx", () => {
  beforeEach(() => {
    process.env.REACT_APP_MOCK_ENDPOINT_URL = "testEndpoint";
    process.env.REACT_APP_MOCK_ENDPOINT_API_KEY = "testApiKey";
  });

  it("should have a List", () => {
    const { container } = render(
      <TodoList todos={sampleData} setTodos={() => {}} />
    );
    expect(container.querySelector("ul")?.classList).toContain("MuiList-root");
  });

  it("should have a ListItems", () => {
    const { container } = render(
      <TodoList todos={sampleData} setTodos={() => {}} />
    );
    expect(container.querySelector("li")?.classList).toContain(
      "MuiListItem-root"
    );
  });
});
