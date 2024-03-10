import TodoList from "./components/todoList";
import CSS from "csstype";

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
  return (
    <div style={containeStyle}>
      <TodoList />
    </div>
  );
};

export default App;
