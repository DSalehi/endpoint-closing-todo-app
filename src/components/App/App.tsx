import TodoList from "../TodoList";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTodos } from "../../services/MockApi/mockApi";
import TodoItem from "../../interfaces/TodoItem";

function App() {
  const [todos, setTodos] = useState([] as TodoItem[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then((todoData) => {
      setIsLoading(false);
      setTodos(todoData.map((todo) => ({ ...todo, isLoading: false })));
    });
  }, []);

  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" align="center">
            Endpoint Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: {
              xs: "105vh",
              sm: "70vh"
            },
          }}
        >
          <TodoList todos={todos} setTodos={setTodos} />
        </Box>
      )}
    </Container>
  );
}

export default App;
