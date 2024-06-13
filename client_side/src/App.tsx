import TodoList from "./components/todoList/todoList";
import CSS from "csstype";
import { useQuery, gql } from '@apollo/client';

const GET_ITEMS = gql`
    query GET_ITEMS {
        items @rest(type: "item", endpoint: "v1", path: "items/") {
            id
            description
            checked
        }
    }
`;

const containeStyle: CSS.Properties = {
  background: "gray",
  display: "flex",
  flexDirection: "row",
  paddingLeft: "8%",
  paddingRight: "8%",
  paddingBottom: "4%",
  paddingTop: "4%",
  justifyContent: "center",
};

const App = () => {
  const {loading, data} = useQuery(GET_ITEMS);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={containeStyle}>
      <TodoList items={data.items} />
    </div>
  );
};

export default App;
