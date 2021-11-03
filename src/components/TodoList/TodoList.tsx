import { List, ListItem, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TodoListItem from "../TodoListItem";
import TodoItem from "../../interfaces/TodoItem";
import { Dispatch, SetStateAction } from "react";
import { patchTodosById } from "../../services/MockApi/mockApi";

interface Props {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
}

function TodoList({ todos, setTodos }: Props) {
  let sortedTodos: TodoItem[] = todos
    .map((todo) => ({ ...todo }))
    .sort(sortHandler);

  function sortHandler(a: TodoItem, b: TodoItem): number {
    // Incomplete todos always before completed todos
    if (a.isComplete !== b.isComplete) {
      return a.isComplete ? 1 : -1;
    }

    // If either todo doesn't have a due date, it'll appear after the other
    if (!a.dueDate) {
      return 1;
    }

    if (!b.dueDate) {
      return -1;
    }

    // Since the dates are in ISO 8601 format, we can just do a string comparison
    return a.dueDate > b.dueDate ? 1 : -1;
  }

  function setLoading(id: string, isLoading: boolean) {
    setTodos((prevState) =>
      prevState.map((todo: TodoItem) => {
        if (todo.id === id) {
          return { ...todo, isLoading };
        }

        return { ...todo };
      })
    );
  }

  // Update an individual TodoItem
  function setTodo(id: string, isComplete: boolean) {
    setLoading(id, true);

    patchTodosById(id, isComplete)
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          setTodos((prevState) =>
            prevState.map((todo: TodoItem) => {
              if (todo.id === id) {
                return { ...todo, isComplete };
              }

              return { ...todo };
            })
          );
        } else {
          console.error(`Error attempting to PATCH todo with id ${id}`);
        }

        setLoading(id, false);
      })
      .catch(() => {
        setLoading(id, false);
        console.error(`Error attempting to PATCH todo with id ${id}`);
      });
  }

  function getBackgroundStyling(todo: TodoItem) {
    if (todo.isComplete) {
      return { backgroundColor: "rgb(204,255,204)" };
    }

    const today = new Date().toISOString();
    if (todo.dueDate && todo.dueDate <= today) {
      return { backgroundColor: "rgb(255, 204, 204)" };
    }

    return {};
  }

  return (
    <Box sx={{ width: "65%" }}>
      <Paper variant="outlined">
        <List>
          {sortedTodos.map((todo, index) => (
            <ListItem
              sx={getBackgroundStyling(todo)}
              key={index}
              divider={sortedTodos.length - 1 !== index}
            >
              <TodoListItem
                {...todo}
                setTodo={(isComplete: boolean) => setTodo(todo.id, isComplete)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default TodoList;
