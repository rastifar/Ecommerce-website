import MyRoutes from "./routes/MyRoutes";
import {store} from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
     
        <MyRoutes />
      
    </div>
  );
}

export default App;
