import TodoItem from "../../interfaces/TodoItem";

export async function getTodos(): Promise<TodoItem[]> {
  try {
    if (!process.env.REACT_APP_MOCK_ENDPOINT_URL)
      throw new Error("REACT_APP_MOCK_ENDPOINT_URL env variable not set");

    const response = await fetch(
      `${process.env.REACT_APP_MOCK_ENDPOINT_URL}/get`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.REACT_APP_MOCK_ENDPOINT_API_KEY,
          "Content-Type": "application/json",
        } as HeadersInit,
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Error attempting to call GET endpoint", err);
    return [];
  }
}

export async function patchTodosById(
  id: string,
  isComplete: boolean
): Promise<boolean> {
  try {
    if (!process.env.REACT_APP_MOCK_ENDPOINT_URL)
      throw new Error("REACT_APP_MOCK_ENDPOINT_URL env variable not set");

    const response = await fetch(
      `${process.env.REACT_APP_MOCK_ENDPOINT_URL}/patch/${id}`,
      {
        method: "PATCH",
        headers: {
          "X-Api-Key": process.env.REACT_APP_MOCK_ENDPOINT_API_KEY,
          "Content-Type": "application/json",
        } as HeadersInit,
        body: JSON.stringify({
          isComplete,
        }),
      }
    );

    const data = await response.json();
    const isSuccess = data.status === "success";

    return isSuccess;
  } catch (err) {
    console.error("Error attempting to call PATCH endpoint", err);
    return false;
  }
}
