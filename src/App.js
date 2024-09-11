import { Provider } from "react-redux";
import Game from "./components/Game";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
};

export default App;
