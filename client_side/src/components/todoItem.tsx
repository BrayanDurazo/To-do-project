import { useState } from "react";
import CSS from "csstype";

export interface item {
  checked: boolean;
  description: string;
}

const itemStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "16px",
};

const checkboxStyle: CSS.Properties = {
  width: "24px",
  height: "24px",
  margin: "0px",
  border: "0px",
};

const descriptionStyle: CSS.Properties = {
  marginLeft: "8px",
  width: "100%",
  height: "24px",
  padding: "0px",
  border: "0px",
  background: "gray",
  fontSize: "24px",
};

const TodoItem = (props: item) => {
  const [checked, setChecked] = useState<boolean>(props.checked);
  const [description, setDescription] = useState<string>(props.description);

  const handleCheckBoxClick = () => {
    setChecked(!checked);
  };

  const handleTextInput = () => {
    setDescription(description);
  };

  return (
    <div style={itemStyle}>
      <input
        style={checkboxStyle}
        type="checkbox"
        value="checked"
        checked={checked}
        onClick={handleCheckBoxClick}
      ></input>
      <input
        style={descriptionStyle}
        type="text"
        name="description"
        defaultValue={description}
        onChange={handleTextInput}
      ></input>
    </div>
  );
};

export default TodoItem;
