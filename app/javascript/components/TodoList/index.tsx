import React, { useEffect,useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";
type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  const [filterText, setFilterText] = useState("") 

  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    axios.post("/todo", {
      id: todoItemId,
      checked: e.target.checked,
    }).then(() => location.reload());
  };

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(() => location.reload());
  };

  const filterFunction = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value)
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <input placeholder ="Enter filter text" value={filterText} onChange={filterFunction}></input>
      <ListGroup>
        {todoItems.filter(todo => todo.title.toLowerCase().includes(filterText.toLowerCase())).map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />
          </ListGroup.Item>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
