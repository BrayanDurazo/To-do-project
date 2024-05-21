import TodoItem from "./todoItem";
import CSS from "csstype";
import { item } from "./todoItem";
import { useState } from "react";
import { useMutation, gql } from '@apollo/client';

const ADD_ITEM = gql`
  mutation ADD_ITEM {
    item(input: $input) @rest(type: "item", path: "items/", endpoint: "v1", method: "POST") {
      id
      description
      checked
    }
  }
`

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
    const [addItem, { loading }] = useMutation(ADD_ITEM, {
      variables: {
        input: {
          description: "",
          checked: false,
        }
      }
    });

    const updateItemsList = (updatedItem: item) => {
      const newItems = items.map((item) => {
        if (item.id === updatedItem.id)
          return updatedItem
        else
          return item
      })
      setItems(newItems)
    }

    if (loading) {
      return <div>Loading...</div>
    }

    const onAddItemClick = async () => {
      const { data } = await addItem()
      const {item: newItem} = data
      setItems([
          ...items,
          {
            id: newItem.id,
            description: newItem.description,
            checked: newItem.checked
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
                  return <TodoItem key={item.id} item={item} updateItemsList={updateItemsList}/>
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
