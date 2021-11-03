interface TodoItem {
  id: string;
  description: string;
  isComplete: boolean;
  isLoading: boolean;
  dueDate?: string | null;
}

export default TodoItem;
