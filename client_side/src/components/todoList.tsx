import TodoItem from "./todoItem";
import CSS from "csstype";

const listStyle: CSS.Properties = {
  border: "2px solid black",
  width: "32%",
  height: "%",
  margin: "8%",
};
const listHeaderStyle: CSS.Properties = {
  borderBottom: "2px solid black",
  paddingLeft: "16px",
  paddingRight: "16px",
};
const listBodyStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "16px",
};
const listFooterStyle: CSS.Properties = {
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "16px",
  paddingTop: "16px",
  borderTop: "2px solid black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const addItemStyle: CSS.Properties = {
  width: "50%",
  padding: "6px",
  fontSize: "24px",
  border: "2px solid black",
};

const TodoList = () => {
  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        <h1>To do list</h1>
      </div>
      <div style={listBodyStyle}>
        <TodoItem checked={false} description="First Item" />
        <TodoItem checked={true} description="Second Item" />
        <TodoItem checked={false} description="Third Item" />
      </div>
      <div style={listFooterStyle}>
        <button style={addItemStyle}> + add item </button>
      </div>
    </div>
  );
};

export default TodoList;
