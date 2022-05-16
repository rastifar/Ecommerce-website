import MyRoutes from "./routes/MyRoutes";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <MyRoutes />
      </Provider>
    </div>
  );
}

export default App;
