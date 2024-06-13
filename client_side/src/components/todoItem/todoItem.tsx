import { useState } from "react";
import CSS from "csstype";
import { useMutation, gql } from '@apollo/client';
import { TrashIcon } from '../../assets/Icons/Icon'

const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM{
    item(id: $id, input: $input) @rest(type: "item", path: "items/{args.id}/", endpoint: "v1", method: "PUT") {
      id
      description
      checked
    }
  }
`
const DELETE_ITEM = gql`
  mutation UPDATE_ITEM{
    item(id: $id) @rest(type: "item", path: "items/{args.id}/", endpoint: "v1", method: "DELETE") {
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
export interface itemComponent {
  item: item,
  updateItemsList: (item: item) => void
  removeItemFromList: (item: item) => void
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
  marginRight: "8px",
  width: "100%",
  height: "24px",
  padding: "0px",
  border: "0px",
  background: "gray",
  fontSize: "24px",
};

const deleteButtonStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  width: "24px",
  height: "24px",
  border: "1px solid black",
  alignItems: "center",
  justifyContent: "center",
}

const TodoItem = (props: itemComponent) => {
  const {item, updateItemsList, removeItemFromList} = props
  const [description, setDescription] = useState<string>(item.description);
  const [checked, setChecked] = useState<boolean>(item.checked);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);

  const sendUpdatedDescription = async () => {
    await updateItem({
      variables: {
        id: item.id,
        input: {
          description: description
        }
      }
    })
    const newItem = {
      id: item.id,
      description: description,
      checked: checked
    }
    updateItemsList(newItem)
  }

  const sendUpdatedChecked = async (checkedValue: boolean) => {
    await updateItem({
      variables: {
        id: item.id,
        input: {
          checked: checkedValue,
        }
      }
    })
    const newItem = {
      id: item.id,
      description: description,
      checked: checkedValue
    }
    updateItemsList(newItem)
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

  const onDeleteClick = async () => {
    await deleteItem({
      variables: {
        id: item.id,
      }
    })
    removeItemFromList(item)
  }

  return (
    <div style={itemStyle}>
      <div>
        <input
          style={checkboxStyle}
          type="checkbox"
          value="checked"
          checked={checked}
          onChange={handleCheckBoxClick}
        ></input>
      </div>
      <input
        style={descriptionStyle}
        type="text"
        name="description"
        value={description}
        onChange={(e) => handleTextInput(e)}
        onBlurCapture={handleOnBlur}
      ></input>
      <div>
        <button  style={deleteButtonStyle} onClick={onDeleteClick}>
          <TrashIcon></TrashIcon>
        </button>
      </div>

    </div>
  );
};

export default TodoItem;
