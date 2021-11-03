import TodoItem from "../interfaces/TodoItem";

const sampleData: TodoItem[] = [
  {
    id: "1",
    description: "File 2020 Taxes (MOCKED)",
    isComplete: true,
    isLoading: false,
    dueDate: "2020-03-10T17:50:44.673Z",
  },
  {
    id: "2",
    description: "Fold laundry (MOCKED)",
    isComplete: true,
    isLoading: false,
    dueDate: null,
  },
  {
    id: "3",
    description: "Call Mom (MOCKED)",
    isComplete: false,
    isLoading: false,
    dueDate: "2020-06-26T19:00:00.000Z",
  },
];

export default sampleData;
