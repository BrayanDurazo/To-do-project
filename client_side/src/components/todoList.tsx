import TodoItem from "./todoItem";
import CSS from "csstype";
import { item } from "./todoItem";
import { useState } from "react";

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

export interface todoListProps {
    items: item[]
}

const TodoList = (props: todoListProps) => {
    const [items, setItems] = useState(props.items);

    const onAddItemClick = () => {
        setItems([
            ...items,
            {
                checked: false,
                description: "",
            }
        ])
    }

    return (
        <div style={listStyle}>
        <div style={listHeaderStyle}>
            <h1>To do list</h1>
        </div>
        <div style={listBodyStyle}>
            {
                items.map((item: item) => {
                    return <TodoItem checked={item.checked} description={item.description} />
                })
            }
        </div>
        <div style={listFooterStyle}>
            <button style={addItemStyle} onClick={onAddItemClick}> + add item </button>
        </div>
        </div>
    );
};

export default TodoList;
