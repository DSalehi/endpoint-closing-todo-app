import { render } from "@testing-library/react";
import App from "./App";

describe("App.tsx", () => {
  beforeEach(() => {
    process.env.REACT_APP_MOCK_ENDPOINT_URL = "testEndpoint";
    process.env.REACT_APP_MOCK_ENDPOINT_API_KEY = "testApiKey";
  });

  it("should have a loading indicator initially", async () => {
    const { getByRole, findByText } = render(<App />);
    expect(getByRole("progressbar")).toBeInTheDocument();
    expect(await findByText("Endpoint Todo List")).toBeInTheDocument();
  });

  it("should have a navbar", async () => {
    const { findByText } = render(<App />);
    expect(await findByText("Endpoint Todo List")).toBeInTheDocument();
  });
});
