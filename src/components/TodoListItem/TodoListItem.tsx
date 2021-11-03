import { Checkbox, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { Fragment } from "react";
import TodoItem from "../../interfaces/TodoItem";

interface Props extends TodoItem {
  setTodo: (isComplete: boolean) => void;
}

function TodoListItem({
  id,
  description,
  isComplete,
  dueDate,
  isLoading,
  setTodo,
}: Props) {
  const formattedDueDate = dueDate && moment(dueDate).format("MM/DD/YYYY");

  return (
    <Fragment>
      <Box
        id={`list-item-${id}`}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        {isLoading && (
          <Box sx={{ marginTop: "4px", padding: "5px 10px 4px 10px" }}>
            <CircularProgress size={22} />
          </Box>
        )}
        {!isLoading && (
          <Box>
            <Checkbox
              data-testid={`checkbox-${id}`}
              checked={isComplete}
              onChange={(event) => setTodo(event.target.checked)}
            />
          </Box>
        )}
        <Box component="span" sx={{ flexGrow: 1, textAlign: "left" }}>
          {description}
        </Box>
        {formattedDueDate && (
          <Box component="span" sx={{ textAlign: "right", minWidth: 100 }}>
            {formattedDueDate}
          </Box>
        )}
      </Box>
    </Fragment>
  );
}

export default TodoListItem;
