import { useState } from "react";
import CSS from "csstype";
import { useMutation, gql } from '@apollo/client';

const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM{
    item(id: $id, input: $input) @rest(type: "item", path: "items/:id/", endpoint: "v1", method: "PUT") {
      id
      description
      checked
    }
  }
`

export interface item {
  id: number,
  description: string,
  checked: boolean,
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
  const id = props.id
  const [description, setDescription] = useState<string>(props.description);
  const [checked, setChecked] = useState<boolean>(props.checked);
  const [updateItem] = useMutation(UPDATE_ITEM);

  const sendUpdatedDescription = async () => {
    await updateItem({
      variables: {
        id: id,
        input: {
          description: description
        }
      }
    })
  }

  const sendUpdatedChecked = async (checkedValue: boolean) => {
    await updateItem({
      variables: {
        id: id,
        input: {
          checked: checkedValue,
        }
      }
    })
  }

  const handleCheckBoxClick = () => {
    const newCheckedValue = !checked;
    setChecked(newCheckedValue);
    sendUpdatedChecked(newCheckedValue)
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handleOnBlur = async () => {
    sendUpdatedDescription()
  }

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
        value={description}
        onChange={(e) => handleTextInput(e)}
        onBlurCapture={handleOnBlur}
      ></input>
    </div>
  );
};

export default TodoItem;
