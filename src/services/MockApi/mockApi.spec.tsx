import { getTodos, patchTodosById } from "./mockApi";
import sampleData from "../../constants/sampleData";

describe("getTodos", () => {
  beforeEach(() => {
    process.env.REACT_APP_MOCK_ENDPOINT_URL = "testEndpoint";
    process.env.REACT_APP_MOCK_ENDPOINT_API_KEY = "testApiKey";
  });

  it("should return a list of todos", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(sampleData),
      })
    ) as jest.Mock;

    const mockedTodos = await getTodos();
    expect(mockedTodos.length).toEqual(3);
  });

  it("should catch error and return empty array", async () => {
    global.fetch = jest.fn(() => Promise.resolve({})) as jest.Mock;

    jest.spyOn(global.console, "error");

    const mockedTodos = await getTodos();

    expect(console.error).toBeCalled();
    expect(mockedTodos).toEqual([]);
  });

  it("should catch env variable error and return empty array", async () => {
    delete process.env.REACT_APP_MOCK_ENDPOINT_URL;
    delete process.env.REACT_APP_MOCK_ENDPOINT_API_KEY;

    jest.spyOn(global.console, "error");

    const mockedTodos = await getTodos();

    expect(console.error).toBeCalled();
    expect(mockedTodos).toEqual([]);
  });
});

describe("patchTodosById", () => {
  const sampleData = {
    status: "success",
  };

  beforeEach(() => {
    process.env.REACT_APP_MOCK_ENDPOINT_URL = "testEndpoint";
    process.env.REACT_APP_MOCK_ENDPOINT_API_KEY = "testApiKey";
  });

  it("should return true", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(sampleData),
      })
    ) as jest.Mock;

    const isSuccessful = await patchTodosById("1", true);
    expect(isSuccessful).toEqual(true);
  });

  it("should catch error and return false", async () => {
    global.fetch = jest.fn(() => Promise.resolve({})) as jest.Mock;

    jest.spyOn(global.console, "error");

    const isSuccessful = await patchTodosById("1", true);

    expect(console.error).toBeCalled();
    expect(isSuccessful).toEqual(false);
  });

  it("should catch env variable error and return empty array", async () => {
    delete process.env.REACT_APP_MOCK_ENDPOINT_URL;
    delete process.env.REACT_APP_MOCK_ENDPOINT_API_KEY;

    jest.spyOn(global.console, "error");

    const isSuccessful = await patchTodosById("1", true);

    expect(console.error).toBeCalled();
    expect(isSuccessful).toEqual(false);
  });
});
